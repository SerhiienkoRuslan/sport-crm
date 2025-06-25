'use client'

import { 
  Users, 
  Calendar, 
  UserCheck, 
  DollarSign, 
  MessageSquare, 
  Bell,
  BarChart3,
  Settings,
  Plus,
  LogOut,
  User
} from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui'

export default function Home() {
  const { data: session, status } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Welcome to Sport CRM</h1>
          <p className="text-gray-300 mb-8">Please sign in to access your dashboard</p>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Sport CRM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">{session?.user?.name}</span>
                <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                  {session?.user?.role}
                </span>
              </div>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {session?.user?.name}!
          </h2>
          <p className="text-gray-300">
            Manage your fitness business efficiently with our comprehensive CRM system
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Members</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,234</div>
              <p className="text-xs text-gray-400">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Classes</CardTitle>
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">45</div>
              <p className="text-xs text-gray-400">
                +5 new this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Trainers</CardTitle>
              <UserCheck className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-400">
                All active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$45,231</div>
              <p className="text-xs text-gray-400">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Member Management */}
          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Users className="h-5 w-5 mr-2" />
                Member Management
              </CardTitle>
              <CardDescription className="text-gray-400">
                Register new members, manage profiles, and track memberships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Active Members:</span>
                  <span className="font-medium text-white">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">New This Month:</span>
                  <span className="font-medium text-green-400">+89</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/members">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Class Scheduling */}
          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Calendar className="h-5 w-5 mr-2" />
                Class Scheduling
              </CardTitle>
              <CardDescription className="text-gray-400">
                Create and manage class schedules, handle bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Today's Classes:</span>
                  <span className="font-medium text-white">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Bookings:</span>
                  <span className="font-medium text-white">156</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/classes">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Class
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trainer Management */}
          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <UserCheck className="h-5 w-5 mr-2" />
                Trainer Management
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage trainer profiles, schedules, and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Active Trainers:</span>
                  <span className="font-medium text-white">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Available Today:</span>
                  <span className="font-medium text-white">8</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/trainers">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trainer
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CRM & Payments */}
          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <DollarSign className="h-5 w-5 mr-2" />
                CRM & Payments
              </CardTitle>
              <CardDescription className="text-gray-400">
                Track payments, memberships, and customer communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Pending Payments:</span>
                  <span className="font-medium text-orange-400">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">This Month Revenue:</span>
                  <span className="font-medium text-white">$45,231</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/payments">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Reports
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Communications */}
          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <MessageSquare className="h-5 w-5 mr-2" />
                Communications
              </CardTitle>
              <CardDescription className="text-gray-400">
                Send announcements, manage member communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Unread Messages:</span>
                  <span className="font-medium text-blue-400">7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Announcements:</span>
                  <span className="font-medium text-white">3</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/communications">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Admin Dashboard */}
          {session?.user?.role === 'ADMIN' && (
            <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Admin Dashboard
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Advanced analytics, reports, and system management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">System Status:</span>
                    <span className="font-medium text-green-400">Online</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Active Sessions:</span>
                    <span className="font-medium text-white">42</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/admin">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/members/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Member
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/classes/new">
                <Calendar className="h-4 w-4 mr-2" />
                Create Class
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/announcements/new">
                <Bell className="h-4 w-4 mr-2" />
                Send Announcement
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/reports">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
