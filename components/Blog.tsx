import { urlFor } from '../sanity'
import Link from 'next/link'
import { Post } from '../typings'

function Blog(post: Post) {
  return (
    <Link key={post._id} href={`/posts/${post.slug.current}`}>
      <div className="cursor-pointer overflow-hidden rounded-md font-fredoka transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl">
        <img
          className="h-60 w-full object-cover"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />
        <div className="text-md font-mono flex justify-between bg-white p-5">
          <div>
            <p className="font-semibold text-gray-900">{post.title}</p>
            <p className="text-gray-700">
              {post.description} by {post.author.name}
            </p>
          </div>
          <img
            className="h-14 w-14 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
        </div>
      </div>
    </Link>
  )
}

export default Blog
