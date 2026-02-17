import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoutes'
import { Suspense, lazy } from 'react'
import PageLoader from '@/components/common/PageLoader'
import BuyerRegister from '@/pages/buyerRegister/BuyerRegister'
import BuyerForgotPassword from '@/pages/buyerPasswordChange/BuyerForgotPassword'
import ReturnPolicy from '@/pages/legal/ReturnPolicy'
import ResolutionCenter from '@/pages/buyerResolution/ResolutionCenter'
import ProductBrowsePage from '@/pages/ProductBrowse/ProductBrowsePage'
import SingleProductPage from '@/pages/ProductBrowse/SingleProductPage'
import BuyerProfilePage from '@/pages/BuyerProfile/BuyerProfilePage'
import BrowsePreharvestProductPage from '@/pages/browsePreharvestProduct/BrowsePreharvestProductPage'
import PreHarvestProductPage from '@/pages/browsePreharvestProduct/components/SingleProductPage'
import Dashboard from '@/pages/buyerDashboard.jsx/Dashboard'
import LoginPage from '@/admin/pages/LoginPage'
import SuperAdminLayout from '@/admin/layouts/SuperAdminDashboardLayout'
import SuperAdminOverview from '@/admin/pages/SuperAdminOverview'
import AdminSignupPage from '@/admin/pages/AdminSignupPage'
import Invites from '@/admin/pages/AdminInvites'
import ManageAdmins from '@/admin/pages/ManageAdmins'
import AllBuyerPage from '@/admin/pages/AllBuyerPage'
import AllFarmerPages from '@/admin/pages/AllFarmerPages'
import SingleFarmerPage from '@/admin/pages/SingleFarmerPage'
import SingleAdminPage from '@/admin/pages/SingleAdminPage'
import SingleBuyerPage from '@/admin/pages/SingleBuyerPage'
import AdminOverviewPage from '@/admin/pages/AdminOverviewPage'
import HarvestedListingsPage from '@/admin/pages/harvestedListings/HarvestedListingsPage'

const MainLayout = lazy(() => import('@/layouts/MainLayout'))
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'))
const DashboardLayout = lazy(() => import('@/layouts/DashBoardLayout'))
const BlockedUserLayout = lazy(() => import('@/layouts/BlockedUserLayout'))

const Home = lazy(() => import('@/pages/home/Home'))
const Services = lazy(() => import('@/pages/services/Services'))

const DataUsage = lazy(() => import('@/pages/legal/DataUsage'))
const TermsOfService = lazy(() => import('@/pages/legal/TermsOfService'))
const PrivacyPolicy = lazy(() => import('@/pages/legal/PrivacyPolicy'))
const Disclaimer = lazy(() => import('@/pages/legal/Disclaimer'))

const ContactPage = lazy(() => import('@/pages/contact/Contact'))
const AboutPage = lazy(() => import('@/pages/about/About'))

const UnauthorizedPage = lazy(() => import('@/pages/unauthorize/UnAuthorize'))
const NotFoundPage = lazy(() => import('@/pages/404/404Page'))

const FarmerSignup = lazy(() => import('@/pages/signup/Signup'))
const FarmerLogin = lazy(() => import('@/pages/Login/Login'))
const ForgotPassword = lazy(() =>
  import('@/pages/forgot-password/ForgotPassword')
)

const Profile = lazy(() => import('@/pages/profile/Profile'))

const Farmlands = lazy(() => import('@/pages/farmland/Farmlands'))
const SingleFarmland = lazy(() => import('@/pages/farmland/SingleFarmland'))
const AddFarmlandPage = lazy(() => import('@/pages/farmland/AddFarmland'))

const SupportPage = lazy(() => import('@/pages/support/SupportPage'))

const CropSuggestionPage = lazy(() =>
  import('@/pages/crop-suggestion/CropSuggestionPage')
)
const ShowSuggestionPage = lazy(() =>
  import('@/pages/crop-suggestion/ShowSuggestionPage')
)

const GovernmentSchemesPage = lazy(() => import('@/pages/scheme/SchemePage'))
const SchemeDetailPage = lazy(() =>
  import('@/pages/scheme/components/SchemeDetailPage')
)

const ListingPage = lazy(() => import('@/pages/listing/ListingPage'))
const SinglePreHarvestProductPage = lazy(() =>
  import('@/pages/listing/SinglePreHarvestProductPage')
)
const ProductViewPage = lazy(() => import('@/pages/listing/SingleLProductPage'))

const FarmerDashboardPage = lazy(() =>
  import('@/pages/FarmerDashboard/FarmerDashboardPage')
)

const AdminDashboardLayout = lazy(() =>
  import('@/admin/layouts/DashboardLayout')
)

const BuyerLogin = lazy(() => import('@/pages/buyerLogin/BuyerLogin'))

const ComingSoon = lazy(() => import('@/pages/CommingSoon'))
const BlockedUser = lazy(() => import('@/pages/BlockedUser'))
const WishlistPage = lazy(() => import('@/pages/wishlist/WishlistPage'))

const router = createBrowserRouter([
  //Public Routes

  {
    element: (
      <ProtectedRoute allowGuest={true}>
        <Suspense fallback={<PageLoader />}>
          <MainLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> }
    ]
  },

  //legal routes

  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />
  },
  {
    path: '/terms-of-service',
    element: <TermsOfService />
  },
  {
    path: '/data-usage',
    element: <DataUsage />
  },
  {
    path: '/disclaimer',
    element: <Disclaimer />
  },
  {
    path: '/blogs',
    element: <ComingSoon />
  },
  { path: '/refund-policy', element: <ReturnPolicy /> },

  {
    path: '/blocked',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <BlockedUserLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        element: <BlockedUser />,
        index: true
      },
      {
        path: 'support',
        element: <SupportPage />
      }
    ]
  },

  //Auth Routes

  {
    element: (
      <ProtectedRoute role='buyer' allowGuest>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'buyer/login', element: <BuyerLogin /> },
      { path: 'buyer/signup', element: <BuyerRegister /> },
      { path: 'buyer/forgot-password', element: <BuyerForgotPassword /> }
    ]
  },

  {
    element: (
      <ProtectedRoute allowGuest>
        <Suspense fallback={<PageLoader />}>
          <AuthLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { path: 'farmer/login', element: <FarmerLogin /> },
      { path: 'farmer/signup', element: <FarmerSignup /> },
      { path: 'farmer/forgot-password', element: <ForgotPassword /> }
    ]
  },

  {
    element: (
      <ProtectedRoute allowGuest>
        <Suspense fallback={<PageLoader />}>
          <AuthLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { path: 'admin/login', element: <LoginPage /> },
      { path: 'admin/signup', element: <AdminSignupPage /> },
      { path: 'admin/forgot-password', element: 'Forgot password' }
    ]
  },

  // Main Routes

  //Farmere's routes
  {
    path: '/farmer',
    element: (
      <ProtectedRoute role='farmer'>
        <Suspense fallback={<PageLoader />}>
          <MainLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Profile /> },
      { path: 'get-suggestion', element: <CropSuggestionPage /> },
      { path: 'get-suggestion/:id', element: <ShowSuggestionPage /> },
      { path: 'mandi', element: <ListingPage /> },
      { path: 'mandi/harvested-product/:id', element: <ProductViewPage /> },
      {
        path: 'mandi/pre-harvested-product/:id',
        element: <SinglePreHarvestProductPage />
      },
      { path: 'schemes', element: <GovernmentSchemesPage /> },
      { path: 'schemes/:id', element: <SchemeDetailPage /> },
      { path: 'support', element: <SupportPage /> },
      { path: 'farmland', element: <Farmlands /> },
      { path: 'farmland/:farmlandId', element: <SingleFarmland /> },
      { path: 'farmland/add', element: <AddFarmlandPage /> },
      { path: 'community', element: <ComingSoon /> }
    ]
  },

  //Buyer's Routes

  {
    path: '/buyer',
    element: (
      <ProtectedRoute role='buyer'>
        <Suspense fallback={<PageLoader />}>
          <MainLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <BuyerProfilePage /> },
      { path: 'product/harvested', element: <ProductBrowsePage /> },
      { path: 'product/harvested/:productId', element: <SingleProductPage /> },
      {
        path: 'product/pre-harvested',
        element: <BrowsePreharvestProductPage />
      },
      {
        path: 'product/pre-harvested/:productId',
        element: <PreHarvestProductPage />
      },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'disputes', element: <ResolutionCenter /> }
    ]
  },

  //Dashboard
  {
    path: 'farmer/dashboard',
    element: (
      <ProtectedRoute role='farmer'>
        <Suspense fallback={<PageLoader />}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <FarmerDashboardPage /> }]
  },

  {
    path: 'buyer/dashboard',
    element: (
      <ProtectedRoute role='buyer'>
        <Suspense fallback={<PageLoader />}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Dashboard /> }]
  },

  {
    path: 'admin/dashboard',
    element: (
      <ProtectedRoute role='admin'>
        <Suspense fallback={<PageLoader />}>
          <AdminDashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminOverviewPage /> },
      { path: 'buyers', element: <AllBuyerPage /> },
      { path: 'buyers/:buyerId', element: <SingleBuyerPage /> },
      { path: 'farmers', element: <AllFarmerPages /> },
      { path: 'farmers/:farmerId', element: <SingleFarmerPage /> },
      { path: 'product/harvested', element: <HarvestedListingsPage /> }
    ]
  },

  {
    path: 'super_admin/dashboard',
    element: (
      <ProtectedRoute role='super_admin'>
        <Suspense fallback={<PageLoader />}>
          <SuperAdminLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <SuperAdminOverview /> },
      { path: 'farmers', element: <AllFarmerPages /> },
      {
        path: 'buyers',
        element: <AllBuyerPage />
      },
      {
        path: 'invites',
        element: <Invites />
      },
      {
        path: 'admins',
        element: <ManageAdmins />
      },
      {
        path: 'admins/:adminId',
        element: <SingleAdminPage />
      },
      {
        path: 'farmers/:farmerId',
        element: <SingleFarmerPage />
      },
      {
        path: 'buyers/:buyerId',
        element: <SingleBuyerPage />
      }
    ]
  },

  //unauthorized

  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
])

export default router
