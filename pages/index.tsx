import Link from 'next/link'
import Head from 'next/head'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

function PostCard(post) {
  return (
    <div className="mb-6 bg-gray-100 p-4 shadow hover:shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-2">
        <Link href={post.slug}>
          <a className="text-blue-700 hover:text-blue-900">{post.title}</a>
        </Link>
      </h2>
      <time dateTime={post.date} className="block text-sm text-slate-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <p className="text-base text-gray-700">{post.summary}</p>
    </div>
  )
}

export default function Home({posts}) {
  return (
    <div className="mx-auto max-w-2xl py-16">
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1 className="mb-8 text-3xl font-bold">Contentlayer Blog Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
