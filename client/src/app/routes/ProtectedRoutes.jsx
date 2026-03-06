import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import AppLoader from '@/components/common/AppLoader'

const ProtectedRoute = ({ children, role, allowGuest }) => {
  const { role: userRole, authStatus, user } = useAuthStore()

  if (authStatus === 'loading') {
    return <AppLoader />
  }

  if (allowGuest) {
    if (authStatus === 'authenticated' && userRole) {
      return <Navigate to={`/${userRole}/dashboard`} replace />
    }
    return children
  }

  if (authStatus === 'unauthenticated') {
    return <Navigate to='/' replace />
  }

  if (role && role !== userRole) {
    return <Navigate to='/unauthorized' replace />
  }

  if (role === 'farmer' && user?.isActive === false) {
    return <Navigate to='/blocked' replace />
  }

  if (role === 'buyer' && user?.isActive === false) {
    return <Navigate to={'/buyer/blocked'} replace />
  }

  return children
}

export default ProtectedRoute
