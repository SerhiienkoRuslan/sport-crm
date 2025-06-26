'use client'

import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Calendar,
  UserCheck,
  UserX
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ProtectedPage from '@/components/auth/protected-page'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui'

interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  membershipType: string
  status: string
  joinDate: string
  lastVisit: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members')
      if (response.ok) {
        const data = await response.json()
        setMembers(data)
      }
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMember = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await fetch(`/api/members/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setMembers(members.filter(member => member.id !== id))
        }
      } catch (error) {
        console.error('Error deleting member:', error)
      }
    }
  }

  const filteredMembers = members.filter(member =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-400 bg-green-900/20'
      case 'INACTIVE':
        return 'text-red-400 bg-red-900/20'
      case 'PENDING':
        return 'text-yellow-400 bg-yellow-900/20'
      default:
        return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'PREMIUM':
        return 'text-purple-400 bg-purple-900/20'
      case 'STANDARD':
        return 'text-blue-400 bg-blue-900/20'
      case 'BASIC':
        return 'text-gray-400 bg-gray-900/20'
      default:
        return 'text-gray-400 bg-gray-900/20'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading members...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Header */}
        <div className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">Members</h1>
                <p className="mt-2 text-gray-300">Manage your gym members and their memberships</p>
              </div>
              <Button asChild>
                <Link href="/members/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
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
                <CardTitle className="text-sm font-medium text-gray-300">Total Members</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{members.length}</div>
                <p className="text-xs text-gray-400">
                  All time members
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Members</CardTitle>
                <UserCheck className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {members.filter(m => m.status === 'ACTIVE').length}
                </div>
                <p className="text-xs text-gray-400">
                  Currently active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Inactive Members</CardTitle>
                <UserX className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {members.filter(m => m.status === 'INACTIVE').length}
                </div>
                <p className="text-xs text-gray-400">
                  Suspended/expired
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">New This Month</CardTitle>
                <Calendar className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {members.filter(m => {
                    const joinDate = new Date(m.joinDate)
                    const now = new Date()
                    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
                  }).length}
                </div>
                <p className="text-xs text-gray-400">
                  Joined this month
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
                      placeholder="Search members by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Members List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">
                        {member.firstName} {member.lastName}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Member since {new Date(member.joinDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">
                      {new Date(member.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getMembershipColor(member.membershipType)}`}>
                      {member.membershipType}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 pt-2">
                    Last visit: {member.lastVisit ? new Date(member.lastVisit).toLocaleDateString() : 'Never'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No members found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first member.'}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/members/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Member
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedPage>
  )
} 