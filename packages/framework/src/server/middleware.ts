import morgan from 'koa-morgan'
import helmet from 'koa-helmet'
import jwt from 'koa-jwt'
import cors from '@koa/cors'
/**
 * Request parsing
 *
 * https://www.npmtrends.com/koa-bodyparser-vs-koa-body-vs-koa-multer-vs-co-busboy
 *
 * koa-bodyparser [json], [form] and [text]
 *  => ctx.req.body
 *
 * koa-multer [multipart]
 *  => ctx.req.files | ctx.req.file
 */
import multer from 'koa-multer'
import bodyparser from 'koa-bodyparser'


export {
  morgan,
  helmet,
  jwt,
  cors,
  bodyparser,
  multer
}
