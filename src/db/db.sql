-- paginated stoers with join to tags
WITH paginated_stores
    AS (SELECT * FROM stores LIMIT 1 OFFSET 1)
SELECT s.id, s.name, tags.tag
FROM paginated_stores as s
LEFT JOIN stores_tags
    ON s.id = stores_tags.store_id
LEFT JOIN tags
    ON tags.id = stores_tags.tag_id;