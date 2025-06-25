'use client'

import { 
  BarChart3, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Activity,
  Settings,
  FileText,
  Shield,
  Database,
  Bell,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Server,
  Cpu,
  HardDrive
} from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui'


// Mock data for charts and analytics
const monthlyRevenue = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 45000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 52000 },
  { month: 'May', revenue: 49000 },
  { month: 'Jun', revenue: 55000 },
]

const membershipGrowth = [
  { month: 'Jan', members: 1150 },
  { month: 'Feb', members: 1180 },
  { month: 'Mar', members: 1220 },
  { month: 'Apr', members: 1250 },
  { month: 'May', members: 1280 },
  { month: 'Jun', members: 1320 },
]

const recentActivities = [
  { id: 1, action: 'New member registered', user: 'John Doe', time: '2 minutes ago', type: 'member' },
  { id: 2, action: 'Class booking completed', user: 'Sarah Wilson', time: '5 minutes ago', type: 'booking' },
  { id: 3, action: 'Payment received', user: 'Mike Johnson', time: '10 minutes ago', type: 'payment' },
  { id: 4, action: 'Trainer schedule updated', user: 'Emma Davis', time: '15 minutes ago', type: 'schedule' },
  { id: 5, action: 'Announcement sent', user: 'Admin', time: '1 hour ago', type: 'announcement' },
]

export default function AdminPage() {
  const { data: session } = useSession()

  // Mock data - in real app this would come from database
  const systemStats = {
    totalUsers: 1247,
    activeUsers: 1189,
    totalRevenue: 45678,
    monthlyGrowth: 12.5,
    systemUptime: 99.9,
    activeSessions: 42,
    pendingApprovals: 8,
    systemAlerts: 2
  }

  const recentActivity = [
    { id: 1, action: 'New member registered', user: 'John Doe', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Payment processed', user: 'Jane Smith', time: '5 minutes ago', type: 'success' },
    { id: 3, action: 'Class booking cancelled', user: 'Mike Johnson', time: '12 minutes ago', type: 'warning' },
    { id: 4, action: 'Trainer schedule updated', user: 'Sarah Wilson', time: '15 minutes ago', type: 'info' },
    { id: 5, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'success' }
  ]

  const systemHealth = {
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 23
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-300">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="mt-2 text-gray-300">System administration and monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-900/20 text-green-400 text-sm rounded-full">
                System Online
              </span>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                +{systemStats.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                {((systemStats.activeUsers / systemStats.totalUsers) * 100).toFixed(1)}% active rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${systemStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.systemUptime}%</div>
              <p className="text-xs text-gray-400">
                Last 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Health */}
          <Card className="bg-gray-800 border-gray-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">System Health</CardTitle>
              <CardDescription className="text-gray-400">
                Real-time system resource usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">CPU Usage</span>
                  <span className="text-white">{systemHealth.cpu}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${systemHealth.cpu}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Memory Usage</span>
                  <span className="text-white">{systemHealth.memory}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${systemHealth.memory}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Disk Usage</span>
                  <span className="text-white">{systemHealth.disk}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${systemHealth.disk}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Network</span>
                  <span className="text-white">{systemHealth.network}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${systemHealth.network}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">
                Latest system events and user actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-900/20 text-green-400' :
                      activity.type === 'warning' ? 'bg-yellow-900/20 text-yellow-400' :
                      activity.type === 'error' ? 'bg-red-900/20 text-red-400' :
                      'bg-blue-900/20 text-blue-400'
                    }`}>
                      {activity.type === 'success' && <CheckCircle className="h-4 w-4" />}
                      {activity.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                      {activity.type === 'info' && <Clock className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.action}</p>
                      <p className="text-xs text-gray-400">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 h-auto p-4 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span>User Management</span>
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 h-auto p-4 flex-col">
                  <Database className="h-6 w-6 mb-2" />
                  <span>Database</span>
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 h-auto p-4 flex-col">
                  <Server className="h-6 w-6 mb-2" />
                  <span>Server Status</span>
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 h-auto p-4 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span>Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">System Alerts</CardTitle>
              <CardDescription className="text-gray-400">
                Current system notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-white">Disk space running low</p>
                    <p className="text-xs text-gray-400">78% of disk space used</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-white">Scheduled maintenance</p>
                    <p className="text-xs text-gray-400">Tonight at 2:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-white">Backup completed</p>
                    <p className="text-xs text-gray-400">All systems operational</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Metrics</CardTitle>
              <CardDescription className="text-gray-400">
                Key performance indicators over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    <TrendingUp className="h-8 w-8 mx-auto text-green-400" />
                  </div>
                  <div className="text-sm text-gray-300">User Growth</div>
                  <div className="text-lg font-semibold text-green-400">+12.5%</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    <Activity className="h-8 w-8 mx-auto text-blue-400" />
                  </div>
                  <div className="text-sm text-gray-300">Active Sessions</div>
                  <div className="text-lg font-semibold text-white">{systemStats.activeSessions}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    <Clock className="h-8 w-8 mx-auto text-yellow-400" />
                  </div>
                  <div className="text-sm text-gray-300">Pending Approvals</div>
                  <div className="text-lg font-semibold text-yellow-400">{systemStats.pendingApprovals}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    <AlertTriangle className="h-8 w-8 mx-auto text-red-400" />
                  </div>
                  <div className="text-sm text-gray-300">System Alerts</div>
                  <div className="text-lg font-semibold text-red-400">{systemStats.systemAlerts}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 