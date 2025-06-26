'use client'

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'Grand Opening of New Fitness Center',
      date: '2024-06-01',
      summary: 'We are excited to announce the grand opening of our new state-of-the-art fitness center. Join us for special classes and offers!'
    },
    {
      id: 2,
      title: 'Summer Bootcamp Registration',
      date: '2024-05-20',
      summary: 'Sign up for our intensive summer bootcamp and get in the best shape of your life. Limited spots available!'
    },
    {
      id: 3,
      title: 'Trainer Spotlight: Meet Coach Alex',
      date: '2024-05-10',
      summary: 'This month, we feature Coach Alex, our expert in strength and conditioning. Read about his journey and tips for success.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Blog & News</h1>
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p>
              <p className="text-gray-300 mb-4">{post.summary}</p>
              <button className="text-blue-400 hover:underline">Read more</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 