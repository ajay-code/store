SELECT stores.name, tags.tag
FROM stores
LEFT JOIN stores_tags
    ON stores.id = stores_tags.store_id
LEFT JOIN tags
    ON tags.id = stores_tags.tag_id;