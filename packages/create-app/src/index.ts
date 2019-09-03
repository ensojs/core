import {Command, flags} from '@oclif/command'
import { execSync, spawnSync } from 'child_process'
import * as fs from 'fs-extra'

const pkg = require('../package.json')

class EnsoJSCreateApp extends Command {

  static description = 'Create a greenfield Ensō project'

  static args = [
    {
      name: 'app',
      description: 'The name of your application'
    }
  ]

  static flags = {
    type: flags.string({
      required: true,
      char: 't',
      default: 'standalone',
      description: 'Type of Enso installation',
      options: ['standalone', 'monorepo']
    }),
    branch: flags.string({
      required: true,
      default: 'master',
      char: 'b',
      description: 'Default branch to download'
    }),
    force: flags.boolean({char: 'f'}),
    version: flags.version({char: 'v'})
  }

  /**
   * Download a tarball from GitHub
   * - Sadly they do not support the "git archive" protocol
   *
   * TODO: Support monorepo downloads
   */
  private downloadTarball (type: string, branch: string) {
    const tarball = `https://github.com/ensojs/skeleton-install/tarball/${branch}`
    const archive = `enso.${type}.${branch}.tar`
    const cmd = `curl -sL ${tarball} > ${archive}`

    this.log(`=> Downloading [${tarball}]`)
    execSync(cmd)

    return archive
  }

  private createDirectory (path: string) {
    if (!fs.pathExistsSync(path)) {
      fs.ensureDirSync(path)
    } else {
      throw new Error(`Aborting. Existing DIR at [${path}]`)
    }
  }

  /**
   * Extract tarball to app dir
   */
  private async extractArchive (type: string, branch: string, path: string) {
    const cmd = `tar xf enso.${type}.${branch}.tar -C ${path} --strip-components=1`
    this.log(`=> Installing [${path}]`)
    return execSync(cmd)
  }

  private cleanup (archive: string) {
    fs.unlink(archive)
  }

  private async setupEnvironment (path: string) {
    this.log(`=> Setting up environment`)
    await fs.copyFile(`${path}/.env.example`, `${path}/.env`)
  }

  private async installDependencies (path: string) {
    spawnSync('yarn', {
      cwd: path,
      stdio: 'inherit'
    })
  }

  async run () {
    const {args, flags} = this.parse(EnsoJSCreateApp)

    this.log(`Ensō installer (${pkg.version}) \n`)

    // download + install
    const path  = `${process.cwd()}/${args.app}`
    const archive = this.downloadTarball(flags.type, flags.branch)

    this.createDirectory(path)
    this.extractArchive(flags.type, flags.branch, path)

    // setup framework
    await this.setupEnvironment(path)
    await this.installDependencies(path)

    this.cleanup(archive)

    this.log(`=> Done`)
  }
}

export = EnsoJSCreateApp
