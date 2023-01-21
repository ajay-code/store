export function slugify(name: string) {
    let slug = name.toLowerCase()
    //remove unwanted characters
    slug = slug.replace(/[^a-zA-Z0-9 -]/g, '')
    //replace spaces with hyphens
    slug = slug.replace(/\s+/g, '-')
    return slug
}
