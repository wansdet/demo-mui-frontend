const BASE_IRI = '/api/'

const getIRI = (resource: string, value = '') =>
    // console.log('getIRI: resource: ' + resource + ', value: ' + value + '');
    value === '' ? BASE_IRI + resource : `${BASE_IRI + resource}/${value}`


export const getCountryIRI = (value = '') => getIRI('countries', value)

export const getGeoRegionIRI = (value = '') => getIRI('regions', value)

export const getBlogPostIRI = (value = '') => getIRI('blog_posts', value)

export const getBlogCategoryIRI = (value = '') => getIRI('blog_categories', value)

export const getBlogPostCommentIRI = (value = '') => getIRI('blog_post_comments', value)

export const getBlogPostImageIRI = (value = '') => getIRI('blogPost_images', value)

export const getUserIRI = (value = '') => getIRI('users', value)
