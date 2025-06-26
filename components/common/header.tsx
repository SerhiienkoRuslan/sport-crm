'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Bell, Settings, User, Sun, Moon, Menu, Plus, HelpCircle, Globe, Building2, LogOut, Users, Calendar, Shield } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const organizations = [
  { id: 1, name: 'SportOrg' },
  { id: 2, name: 'FitClub' },
]

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

export default function Header() {
  const { status, data } = useSession();
  const [theme, setTheme] = useState('dark')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [org, setOrg] = useState(organizations[0])
  const [lang, setLang] = useState(languages[0])
  const unreadNotifications = 3 // mock

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  // Avatar fallback
  const getInitials = (name?: string | null) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Hamburger (mobile), Logo, Org Switcher */}
        <div className="flex items-center space-x-4">
          <button className="lg:hidden text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(v => !v)}>
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition hidden lg:block">{org.name}</Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center text-gray-300 hover:text-white text-sm px-2 py-1 rounded">
                <Building2 className="h-4 w-4 mr-1" />
                {org.name}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-gray-800 border border-gray-700 rounded shadow-lg p-2 mt-2">
              {organizations.map(o => (
                <DropdownMenu.Item key={o.id} onSelect={() => setOrg(o)} className="px-3 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer">
                  {o.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        {/* Center: Nav links (responsive) */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link href="/blog" className="text-gray-300 hover:text-white transition">Blog / News</Link>
          <Link href="/qa" className="text-gray-300 hover:text-white transition">Q & A</Link>
          {status === 'authenticated' && (
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
          )}
          {status === 'authenticated' && data?.user?.role === 'ADMIN' && (
            <Link href="/admin" className="text-red-400 hover:text-white transition flex items-center"><Shield className="h-4 w-4 mr-1" />Admin</Link>
          )}
        </div>
        {/* Right: Search, Quick Actions, Theme, Notifications, Help, Lang, User */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <input type="text" placeholder="Search..." className="hidden md:block bg-gray-800 border border-gray-700 rounded px-3 py-1 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          {/* Quick Actions */}
          {status === 'authenticated' && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-2 flex items-center">
                  <Plus className="h-4 w-4" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-gray-800 border border-gray-700 rounded shadow-lg p-2 mt-2">
                <DropdownMenu.Item asChild>
                  <Link href="/members/new" className="flex items-center px-3 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer"><Users className="h-4 w-4 mr-2" />Add Member</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link href="/classes/new" className="flex items-center px-3 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer"><Calendar className="h-4 w-4 mr-2" />Add Class</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {/* Theme Switcher */}
          <button onClick={toggleTheme} className="text-gray-300 hover:text-white p-2 rounded">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {/* Notifications */}
          {status === 'authenticated' && (
            <button className="relative border border-gray-600 text-gray-300 hover:bg-gray-700 rounded px-3 py-2 flex items-center text-sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">{unreadNotifications}</span>
              )}
            </button>
          )}
          {/* Help/Support */}
          <Link href="/help" className="border border-gray-600 text-gray-300 hover:bg-gray-700 rounded px-3 py-2 flex items-center text-sm">
            <HelpCircle className="h-4 w-4 mr-2" />Help
          </Link>
          {/* Language Switcher */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center text-gray-300 hover:text-white text-sm px-2 py-1 rounded">
                <Globe className="h-4 w-4 mr-1" />
                {lang.label}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-gray-800 border border-gray-700 rounded shadow-lg p-2 mt-2">
              {languages.map(l => (
                <DropdownMenu.Item key={l.code} onSelect={() => setLang(l)} className="px-3 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer">
                  {l.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          {/* User Avatar/Dropdown */}
          {status === 'authenticated' ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="ml-2 flex items-center justify-center w-9 h-9 rounded-full bg-blue-700 text-white font-bold text-lg">
                  {data?.user?.image ? (
                    <img src={data.user.image} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    getInitials(data?.user?.name)
                  )}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-gray-800 border border-gray-700 rounded shadow-lg p-2 mt-2 min-w-[180px]">
                <DropdownMenu.Item asChild>
                  <Link href="/profile" className="flex items-center px-3 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer"><User className="h-4 w-4 mr-2" />Profile</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link href="/settings" className="flex items-center px-3 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer"><Settings className="h-4 w-4 mr-2" />Settings</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 border-t border-gray-700" />
                <DropdownMenu.Item onSelect={() => signOut({ callbackUrl: '/auth/signin' })} className="flex items-center px-3 py-2 text-red-400 hover:bg-gray-700 rounded cursor-pointer"><LogOut className="h-4 w-4 mr-2" />Sign Out</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : null}
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-2">
          <Link href="/" className="block text-gray-300 hover:text-white transition">Home</Link>
          <Link href="/blog" className="block text-gray-300 hover:text-white transition">Blog / News</Link>
          <Link href="/qa" className="block text-gray-300 hover:text-white transition">Q & A</Link>
          {status === 'authenticated' && <Link href="/dashboard" className="block text-gray-300 hover:text-white transition">Dashboard</Link>}
          {status === 'authenticated' && data?.user?.role === 'ADMIN' && <Link href="/admin" className="block text-red-400 hover:text-white transition flex items-center"><Shield className="h-4 w-4 mr-1" />Admin</Link>}
          <div className="flex space-x-2 mt-4">
            {status === 'authenticated' ? (
              <button onClick={() => signOut({ callbackUrl: '/auth/signin' })} className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition text-sm">Sign Out</button>
            ) : (
              <>
                <Link href="/auth/signin" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm text-center">Sign In</Link>
                <Link href="/auth/signup" className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition text-sm text-center">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 