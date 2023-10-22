const BASE_IRI = '/api/'

const getIRI = (resource: string, value: string = ''): string => {
    // console.log('getIRI: resource: ' + resource + ', value: ' + value + '');
    return value === ''
        ? BASE_IRI + resource
        : BASE_IRI + resource + '/' + value
}

export const getCountryIRI = (value: string = ''): string => {
    return getIRI('countries', value)
}

export const getGeoRegionIRI = (value: string = ''): string => {
    return getIRI('regions', value)
}

export const getBlogPostIRI = (value: string = ''): string => {
    return getIRI('blog_posts', value)
}

export const getBlogCategoryIRI = (value: string = ''): string => {
    return getIRI('blog_categories', value)
}

export const getBlogPostCommentIRI = (value: string = ''): string => {
    return getIRI('blog_post_comments', value)
}

export const getBlogPostImageIRI = (value: string = ''): string => {
    return getIRI('blogPost_images', value)
}

export const getUserIRI = (value: string = ''): string => {
    return getIRI('users', value)
}
