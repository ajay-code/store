import { Store } from '#src/models/store.model.js'
import { Tag } from '#src/models/tag.model.js'
import { isEqual } from 'lodash-es'

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

function isUniqueIn(object: object, others: object[]) {
    let isUnique = true
    for (let to of others) {
        if (isEqual(object, to)) {
            isUnique = false
        }
    }

    return isUnique
}

export function hydrateStoresTagsReviews(input: any) {
    const hydrated: StoreWithTags[] = [],
        lookup: any = {}

    for (let store of input) {
        if (!lookup[store.id]) {
            lookup[store.id] = store
            lookup[store.id].tags = []
            lookup[store.id].reviews = []
            hydrated.push(lookup[store.id])
        }
        if (store.tag_id && store.tag) {
            lookup[store.id].tags.push({ id: store.tag_id, tag: store.tag })
        }
        if (store.review_id && store.review_text && store.review_rating) {
            const review = {
                id: store.review_id,
                text: store.review_text,
                rating: store.review_rating,
            }
            if (isUniqueIn(review, lookup[store.id].reviews)) {
                lookup[store.id].reviews.push(review)
            }
        }
        delete lookup[store.id].tag_id
        delete lookup[store.id].tag
        delete lookup[store.id].review_id
        delete lookup[store.id].review_text
        delete lookup[store.id].review_rating
    }

    return hydrated
}
