SELECT stores.name, tags.* as tag_* 
FROM stores
LEFT JOIN stores_tags
    ON stores.id = stores_tags.store_id
LEFT JOIN tags
    ON tags.id = stores_tags.tag_id;