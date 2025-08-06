import { useAuth } from '@/hooks/useAuth'
import React, { useEffect } from 'react'
import LoginPage from './LoginPage'

interface LocalUser {
  email: string
  name: string
  avatar_url: string
  id: string
}

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user, loading }: { user: LocalUser | null, loading: boolean } = useAuth()

  // Force re-authentication on page reload if no valid session
  useEffect(() => {
    // No need for reload check since we're using localStorage
    console.log('AuthWrapper: User state:', user ? `${user.name} (${user.email})` : 'Not logged in');
  }, [user, loading]);

  // Show loading spinner with timeout
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-white text-lg">Loading your music...</p>
          <p className="text-gray-400 text-sm mt-2">This should only take a moment</p>
        </div>
      </div>
    )
  }

  // Show login page if no user
  if (!user) {
    return <LoginPage />
  }

  // Show main app if user is authenticated
  return <>{children}</>
}

export default AuthWrapper
