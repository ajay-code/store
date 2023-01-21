import dotenv from 'dotenv'
import path from 'path'
import { getDirname } from '#src/utils/fs.utils.js'

// import .env file from the project root directory
const ___dirname = getDirname(import.meta.url)
dotenv.config({ path: path.resolve(___dirname, '../../.env') })
