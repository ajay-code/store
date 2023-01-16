#! /usr/bin/env node
import { randomBytes } from 'node:crypto'
import updateEnvFile from './updateEnvFile.js'

function genKey(): string {
    return randomBytes(32).toString('hex')
}

const key = genKey()

updateEnvFile('APP_KEY', key)
