import dotenv from 'dotenv'
import path from 'path'
import { fsUtils } from '#src/utils/index.js'

// import .env file from the project root directory
const ___dirname = fsUtils.getDirname(import.meta.url)
dotenv.config({ path: path.resolve(___dirname, '../../.env') })
