import sanityClient, { urlFor } from '../../sanity'
import Header from '../../components/Header'
import { Post } from '../../typings'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

interface Props {
  post: Post
}

function Post({ post }: Props) {
  return (
    <main>
      <Header />
      <img
        src={urlFor(post.mainImage).url()!}
        alt=""
        className="mx-auto w-6/12 object-cover"
      />
      <article className="mx-auto max-w-4xl p-5">
        <h1 className="mt-10 mb-3 font-fredoka text-3xl">{post.title}</h1>
        <h2 className="mb-2 font-fredoka text-xl font-light text-gray-600">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2 font-fredoka">
          <img
            src={urlFor(post.author.image).url()!}
            alt=""
            className="h-12 w-12 rounded-full"
          />
          <p className="text-lg font-extralight">
            Blog Post by {post.author.name} - Published at{' '}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10 font-opensans">
          <PortableText
            dataset="production"
            projectId="2n19i9a0"
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className=" my-5 text-2xl font-bold" {...props} />
              ),
            }}
          />
        </div>
      </article>
      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />
      <form className="mx-auto mb-10 flex max-w-2xl flex-col p-10">
        <h3 className="text-3xl font-bold text-yellow-500">
          Enjoyed the article?
        </h3>
        <h3 className="text-3xl font-bold">Make sure to leave a comment!</h3>
        <label htmlFor="" className="bold mb-5">
          <span className="text-gray-700">Name</span>
          <input
            className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
            placeholder="John Doe"
            type="text"
          />
        </label>
        <label htmlFor="" className="bold mb-5">
          <span className="text-gray-700">Email</span>
          <input
            className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
            placeholder="johndoe@email.com"
            type="text"
          />
        </label>
        <label htmlFor="" className="bold mb-5">
          <span className="text-gray-700">Comment</span>
          <textarea
            placeholder="It was a great read! Thanks."
            rows={8}
            className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
          />
        </label>
      </form>
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
    revalidate: 60, // reupdate everything regarding each post every 60 seconds
  }
}
