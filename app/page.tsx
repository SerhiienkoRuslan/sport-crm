'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { status } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to SportOrg</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl">
        SportOrg is your all-in-one platform for managing memberships, classes, trainers, and more. Streamline your sports organization with our modern CRM solution.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {status === 'authenticated' && (
          <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Dashboard</Link>
        )}
        <Link href="/blog" className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition">Blog / News</Link>
        <Link href="/qa" className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition">Q & A</Link>
      </div>
    </div>
  )
}
