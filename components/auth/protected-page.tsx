'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type Props = {
  children: ReactNode
  requiredRole?: string
}

export default function ProtectedPage({ children, requiredRole }: Props) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin')
    } else if (requiredRole && session && session.user?.role !== requiredRole) {
      router.replace('/auth/signin')
    }
  }, [status, session, requiredRole, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated' || (requiredRole && session && session.user?.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
} 