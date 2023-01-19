import db from '#src/lib/knex/db.js'

export interface Tag {
    id: number
    tag: string
}

export default function getTagModel() {
    return db.table<Tag>('tags')
}
