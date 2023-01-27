with `stores` as (
    select
        `stores`.*,
        GROUP_CONCAT(tags.tag) as tags
    from
        `stores`
        left join `stores_tags` on `stores_tags`.`store_id` = `stores`.`id`
        left join `tags` on `tags`.`id` = `stores_tags`.`tag_id`
    where
        `slug` = 'olive-oil'
    group by
        `stores`.`id`
)
select
    `stores`.*,
    `reviews`.`id` as `review_id`,
    `reviews`.`text` as `review_text`,
    `reviews`.`rating` as `review_rating`
    left join `reviews` on `reviews`.`store` = `stores`.`id`