import { Store } from '#src/models/store.model.js'
import { Tag } from '#src/models/tag.model.js'

interface StoreWithTags extends Store {
    tags: Tag[]
}
export function hydrateStoresWithTags(input: any) {
    const hydrated: StoreWithTags[] = [],
        lookup: any = {}

    for (let store of input) {
        if (!lookup[store.id]) {
            lookup[store.id] = store
            lookup[store.id].tags = []
            hydrated.push(lookup[store.id])
        }
        if (store.tag_id && store.tag) {
            lookup[store.id].tags.push({ id: store.tag_id, tag: store.tag })
        }
        delete lookup[store.id].tag_id
        delete lookup[store.id].tag
    }

    return hydrated
}
