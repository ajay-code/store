-- paginated stoers with join to tags
WITH paginated_stores
    AS (SELECT * FROM stores LIMIT 6 OFFSET 6)
SELECT s.id, s.name, tags.tag
FROM paginated_stores as s
LEFT JOIN stores_tags
    ON s.id = stores_tags.store_id
LEFT JOIN tags
    ON tags.id = stores_tags.tag_id;

-- paginated stores with review count and join tags
with stores 
    as (
        select stores.*, COUNT(reviews.id) as review_count  
        from stores 
        left join reviews 
            on reviews.store = stores.id 
        group by stores.id
        limit 6
    ) 
select stores.*, tags.tag as tag, tags.id as tag_id
from stores
left join stores_tags 
    on stores_tags.store_id = stores.id 
left join tags 
    on tags.id = stores_tags.tag_id 
order by stores.created_at desc;

-- knex generated query
with `stores` 
    as (
        select stores.*, COUNT(`reviews`.`id`) as `review_count` 
        from `stores` 
        left join `reviews` 
            on `reviews`.`store` = `stores`.`id` 
        group by `stores`.`id` 
        limit 6
    ) 
select `stores`.*, `tags`.`tag` as `tag`, `tags`.`id` as `tag_id` from `stores` 
left join `stores_tags` 
    on `stores_tags`.`store_id` = `stores`.`id` 
left join `tags` 
    on `tags`.`id` = `stores_tags`.`tag_id` 
order by `created_at` desc