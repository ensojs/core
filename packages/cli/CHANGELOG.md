# @ensojs/cli

## 0.8.0

### Minor Changes

- 9454604: - Strip down `AbstractKoaServer`
  - Strip down `TestHarness`
  - Use latest version of `ts-jest`
  - Add some basic tests for @enso/api

## 0.7.5

### Patch Changes

- 22e2b8c: - Added Github release action

  - Added utility commands

  ```bash
  yarn changes
  # => yarn changeset

  yarn release
  # => yarn changeset release
  ```

## 0.7.4

### Patch Changes

- Use changsets to manage CHANGELOG and release pipeline
