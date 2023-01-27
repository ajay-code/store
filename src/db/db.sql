-- paginated stoers with join to tags
select
  stores.id,
  stores.name,
  stores.slug,
  stores.description,
  stores.photo,
  COUNT(reviews.id) as review_count
from
  stores
  left join reviews on reviews.store = stores.id
group by
  stores.id
order by
  stores.created_at desc

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