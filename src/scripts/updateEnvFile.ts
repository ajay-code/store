import * as fs from 'node:fs'

function updateEnvFile(key: string, value: string) {
    const data = fs.readFileSync('.env', 'utf-8')
    const lines = data.split('\n')
    let found = false

    const newLines = lines.map((line) => {
        if (line.startsWith(`${key}=`)) {
            found = true
            return `${key}=${value}`
        } else {
            return line
        }
    })

    if (!found) {
        newLines.push(`${key}=${value}`)
    }

    const newData = newLines.join('\n')
    fs.writeFileSync('.env', newData)
}

export default updateEnvFile
