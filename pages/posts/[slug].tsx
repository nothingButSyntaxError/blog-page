import sanityClient, { urlFor } from '../../sanity'
import Header from '../../components/Header'
import { Post } from '../../typings'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

interface Props {
  post: Post
}

function Post({ post }: Props) {
  console.log(post)
  return (
    <main>
      <Header />
      <img
        src={urlFor(post.mainImage).url()!}
        alt=""
        className="mx-auto w-6/12 object-cover"
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-600">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            src={urlFor(post.author.image).url()!}
            alt=""
            className="h-12 w-12 rounded-full"
          />
          <p className="text-sm font-extralight">
            Blog Post by {post.author.name} - Published at{' '}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <PortableText
            dataset="production"
            projectId="2n19i9a0"
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="my-5 text-xl font-bold" {...props} />
              ),
              li: (props: any) => <li className="ml-5 list-disc" {...props} />,
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
    _id, slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  author -> {
  name,
  image
},
description,
mainImage, slug, body
}`
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // reupdate everything regarding each post every 30mins
  }
}
