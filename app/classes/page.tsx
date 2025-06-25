'use client'

import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Plus, 
  Search, 
  Filter,
  Play,
  Pause,
  Edit,
  Trash2,
  UserCheck,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui'

// Mock data - in real app this would come from database
const mockClasses = [
  {
    id: '1',
    name: 'Yoga Flow',
    instructor: 'Sarah Johnson',
    time: '09:00 AM',
    duration: '60 min',
    capacity: 20,
    enrolled: 15,
    location: 'Studio A',
    type: 'Yoga',
    status: 'ACTIVE',
    days: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: '2',
    name: 'HIIT Training',
    instructor: 'Mike Chen',
    time: '06:00 PM',
    duration: '45 min',
    capacity: 15,
    enrolled: 12,
    location: 'Gym Floor',
    type: 'Cardio',
    status: 'ACTIVE',
    days: ['Tuesday', 'Thursday']
  },
  {
    id: '3',
    name: 'Strength Training',
    instructor: 'David Wilson',
    time: '07:00 AM',
    duration: '90 min',
    capacity: 12,
    enrolled: 8,
    location: 'Weight Room',
    type: 'Strength',
    status: 'ACTIVE',
    days: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: '4',
    name: 'Pilates',
    instructor: 'Emma Davis',
    time: '10:30 AM',
    duration: '50 min',
    capacity: 18,
    enrolled: 18,
    location: 'Studio B',
    type: 'Pilates',
    status: 'FULL',
    days: ['Tuesday', 'Thursday', 'Saturday']
  },
  {
    id: '5',
    name: 'Spinning',
    instructor: 'Alex Rodriguez',
    time: '05:30 PM',
    duration: '45 min',
    capacity: 25,
    enrolled: 20,
    location: 'Spinning Studio',
    type: 'Cardio',
    status: 'ACTIVE',
    days: ['Monday', 'Wednesday', 'Friday']
  }
]

export default function ClassesPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-400 bg-green-900/20'
      case 'FULL':
        return 'text-orange-400 bg-orange-900/20'
      case 'CANCELLED':
        return 'text-red-400 bg-red-900/20'
      default:
        return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Yoga':
        return 'text-purple-400 bg-purple-900/20'
      case 'Cardio':
        return 'text-red-400 bg-red-900/20'
      case 'Strength':
        return 'text-blue-400 bg-blue-900/20'
      case 'Pilates':
        return 'text-pink-400 bg-pink-900/20'
      default:
        return 'text-gray-400 bg-gray-900/20'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Classes</h1>
              <p className="mt-2 text-gray-300">Manage your fitness classes and schedules</p>
            </div>
            <Button asChild>
              <Link href="/classes/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Classes</CardTitle>
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockClasses.length}</div>
              <p className="text-xs text-gray-400">
                Active classes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Enrollments</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockClasses.reduce((sum, cls) => sum + cls.enrolled, 0)}
              </div>
              <p className="text-xs text-gray-400">
                Active enrollments
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Available Spots</CardTitle>
              <UserCheck className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockClasses.reduce((sum, cls) => sum + (cls.capacity - cls.enrolled), 0)}
              </div>
              <p className="text-xs text-gray-400">
                Open spots
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Today's Classes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-gray-400">
                Scheduled today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search classes by name, instructor, or type..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((cls) => (
            <Card key={cls.id} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-white">{cls.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {cls.instructor}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{cls.time}</span>
                  </div>
                  <span className="text-sm text-gray-400">{cls.duration}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{cls.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{cls.enrolled}/{cls.capacity}</span>
                  </div>
                  <div className="w-16 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(cls.type)}`}>
                    {cls.type}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(cls.status)}`}>
                    {cls.status}
                  </span>
                </div>
                
                <div className="text-xs text-gray-400 pt-2">
                  {cls.days.join(', ')}
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Pause className="h-3 w-3 mr-1" />
                    Pause
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/classes/new">
                <Plus className="h-4 w-4 mr-2" />
                Create New Class
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/schedule">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/bookings">
                <Users className="h-4 w-4 mr-2" />
                Manage Bookings
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/reports">
                <BarChart3 className="h-4 w-4 mr-2" />
                Class Reports
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 