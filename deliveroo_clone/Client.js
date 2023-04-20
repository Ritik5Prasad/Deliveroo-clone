import {createClient} from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

const client= createClient({
    projectId:'2gzh4ab8',
    dataset: 'production',
    useCdn:'true',
    apiVersion:'2023-03-31'
})

const builder = imageUrlBuilder(client)

export const urlFor= (source)=>builder.image(source)

export default client