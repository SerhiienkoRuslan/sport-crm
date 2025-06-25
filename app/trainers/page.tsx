'use client'

import { 
  UserCheck, 
  Star, 
  Calendar, 
  MapPin, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Award,
  Clock,
  Users,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui'

// Mock data - in real app this would come from database
const mockTrainers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@fitness.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Yoga & Pilates',
    experience: '8 years',
    rating: 4.9,
    totalClasses: 156,
    activeMembers: 45,
    status: 'ACTIVE',
    location: 'Studio A',
    bio: 'Certified yoga instructor with expertise in Vinyasa and Hatha yoga. Passionate about helping clients achieve mind-body wellness.',
    certifications: ['RYT-500', 'Pilates Mat', 'Meditation Teacher'],
    availability: 'Mon-Fri, 6AM-8PM'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@fitness.com',
    phone: '+1 (555) 234-5678',
    specialization: 'HIIT & Cardio',
    experience: '5 years',
    rating: 4.8,
    totalClasses: 89,
    activeMembers: 32,
    status: 'ACTIVE',
    location: 'Gym Floor',
    bio: 'Former competitive athlete turned fitness trainer. Specializes in high-intensity interval training and functional fitness.',
    certifications: ['NASM-CPT', 'CrossFit L2', 'Nutrition Coach'],
    availability: 'Mon-Sat, 5AM-9PM'
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david.wilson@fitness.com',
    phone: '+1 (555) 345-6789',
    specialization: 'Strength Training',
    experience: '12 years',
    rating: 4.9,
    totalClasses: 234,
    activeMembers: 67,
    status: 'ACTIVE',
    location: 'Weight Room',
    bio: 'Strength and conditioning specialist with a background in powerlifting. Helps clients build functional strength and muscle.',
    certifications: ['CSCS', 'USAW', 'FMS Level 2'],
    availability: 'Mon-Fri, 6AM-7PM'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@fitness.com',
    phone: '+1 (555) 456-7890',
    specialization: 'Pilates & Barre',
    experience: '6 years',
    rating: 4.7,
    totalClasses: 123,
    activeMembers: 38,
    status: 'ACTIVE',
    location: 'Studio B',
    bio: 'Dance background with specialized training in Pilates and Barre. Focuses on core strength and flexibility.',
    certifications: ['Pilates Mat', 'Barre Above', 'Dance Instructor'],
    availability: 'Mon-Sat, 8AM-6PM'
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@fitness.com',
    phone: '+1 (555) 567-8901',
    specialization: 'Spinning & Cycling',
    experience: '4 years',
    rating: 4.6,
    totalClasses: 78,
    activeMembers: 28,
    status: 'ACTIVE',
    location: 'Spinning Studio',
    bio: 'Former professional cyclist with a passion for indoor cycling. Creates energetic and motivating spin classes.',
    certifications: ['Spinning Instructor', 'Cycling Coach', 'First Aid'],
    availability: 'Mon-Fri, 5AM-8PM'
  }
]

export default function TrainersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-400 bg-green-900/20'
      case 'INACTIVE':
        return 'text-red-400 bg-red-900/20'
      case 'ON_LEAVE':
        return 'text-yellow-400 bg-yellow-900/20'
      default:
        return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getSpecializationColor = (spec: string) => {
    if (spec.includes('Yoga')) return 'text-purple-400 bg-purple-900/20'
    if (spec.includes('HIIT') || spec.includes('Cardio')) return 'text-red-400 bg-red-900/20'
    if (spec.includes('Strength')) return 'text-blue-400 bg-blue-900/20'
    if (spec.includes('Pilates')) return 'text-pink-400 bg-pink-900/20'
    if (spec.includes('Spinning') || spec.includes('Cycling')) return 'text-orange-400 bg-orange-900/20'
    return 'text-gray-400 bg-gray-900/20'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Trainers</h1>
              <p className="mt-2 text-gray-300">Manage your fitness trainers and their schedules</p>
            </div>
            <Button asChild>
              <Link href="/trainers/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Trainer
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
              <CardTitle className="text-sm font-medium text-gray-300">Total Trainers</CardTitle>
              <UserCheck className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockTrainers.length}</div>
              <p className="text-xs text-gray-400">
                Active trainers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Classes</CardTitle>
              <Calendar className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockTrainers.reduce((sum, trainer) => sum + trainer.totalClasses, 0)}
              </div>
              <p className="text-xs text-gray-400">
                Classes conducted
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Members</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockTrainers.reduce((sum, trainer) => sum + trainer.activeMembers, 0)}
              </div>
              <p className="text-xs text-gray-400">
                Members trained
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {(mockTrainers.reduce((sum, trainer) => sum + trainer.rating, 0) / mockTrainers.length).toFixed(1)}
              </div>
              <p className="text-xs text-gray-400">
                Out of 5 stars
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
                    placeholder="Search trainers by name, specialization, or location..."
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

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrainers.map((trainer) => (
            <Card key={trainer.id} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-white">{trainer.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {trainer.specialization}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{trainer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{trainer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{trainer.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{trainer.availability}</span>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-white">{trainer.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">{trainer.experience}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${getSpecializationColor(trainer.specialization)}`}>
                    {trainer.specialization}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(trainer.status)}`}>
                    {trainer.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                  <div className="text-center">
                    <div className="text-white font-medium">{trainer.totalClasses}</div>
                    <div className="text-gray-400 text-xs">Classes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium">{trainer.activeMembers}</div>
                    <div className="text-gray-400 text-xs">Members</div>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Stats
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
              <Link href="/trainers/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Trainer
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/schedule">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedules
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/certifications">
                <Award className="h-4 w-4 mr-2" />
                Manage Certifications
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Link href="/reports">
                <BarChart3 className="h-4 w-4 mr-2" />
                Trainer Reports
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 