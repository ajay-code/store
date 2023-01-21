export function hydrateStoresWithTags(input: any) {
    const hydrated: any[] = [],
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
