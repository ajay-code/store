import { Store } from '#src/models/store.model.js'
import { Tag } from '#src/models/tag.model.js'
import { isEqual } from 'lodash-es'

interface StoreWithTags extends Store {
    tags: Tag[]
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

export function hydrateStoresReviews(input: any) {
    const hydrated: StoreWithTags[] = [],
        lookup: any = {}

    for (let store of input) {
        if (!lookup[store.id]) {
            lookup[store.id] = store
            lookup[store.id].reviews = []
            hydrated.push(lookup[store.id])
        }
        if (store.review_id && store.review_text && store.review_rating) {
            const review = {
                id: store.review_id,
                text: store.review_text,
                rating: store.review_rating,
                created_at: store.review_created_at,
                author: {
                    id: store.review_author_id,
                    name: store.review_author_name,
                    email: store.review_author_email,
                },
            }
            if (isUniqueIn(review, lookup[store.id].reviews)) {
                lookup[store.id].reviews.push(review)
            }
        }

        delete lookup[store.id].review_id
        delete lookup[store.id].review_text
        delete lookup[store.id].review_rating
        delete lookup[store.id].review_author_id
        delete lookup[store.id].review_author_name
        delete lookup[store.id].review_author_email
    }

    return hydrated
}
