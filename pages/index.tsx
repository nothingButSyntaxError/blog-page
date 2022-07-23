import Head from 'next/head'
import sanityClient, { urlFor } from '../sanity'
import Header from '../components/Header'
import { Post } from '../typings'
import Blog from '../components/Blog'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Spaceman's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-between border-y border-black bg-[#457b9d] py-10 lg:py-0">
        <div className="space-y-5 px-10">
          <h1 className="font-serif max-w-xl text-6xl">
            <span className="text-yellow-400">Spacemans Blog</span> is a place
            to connect.
          </h1>
          <h2 className="font-mono text-xl">
            It's always a good read with a hot coffee and a good{' '}
            <span className="line-through">book</span> blog. At spaceman's blog
            you will love the atmosphere if you love technology, computers,
            science, coding, cryptocurrency, and the internet.
          </h2>
        </div>
        <img
          // src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          src="/SBM.png"
          alt="Logo"
          className="mr-10 hidden h-32 md:inline-flex lg:h-full"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Blog {...post} />
        ))}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author -> {
    name, image
  },
  mainImage,
  description,
  slug
  }`
  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
