import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export default sanityClient({
  projectId: '2n19i9a0', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: 'v1', // or leave blank for latest',
})

const config = {
  projectId: '2n19i9a0', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
}

const builder = imageUrlBuilder(config)

export function urlFor(source) {
  return builder.image(source)
}
// export const currentUser = createCurrentUserHook(config)
