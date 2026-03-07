import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoutes'
import { Suspense, lazy } from 'react'
import PageLoader from '@/components/common/PageLoader'

const BuyerRegister = lazy(() => import('@/pages/buyerRegister/BuyerRegister'))
const BuyerForgotPassword = lazy(() =>
  import('@/pages/buyerPasswordChange/BuyerForgotPassword')
)
const ReturnPolicy = lazy(() => import('@/pages/legal/ReturnPolicy'))
const ResolutionCenter = lazy(() =>
  import('@/pages/buyerResolution/ResolutionCenter')
)
const ProductBrowsePage = lazy(() =>
  import('@/pages/ProductBrowse/ProductBrowsePage')
)
const SingleProductPage = lazy(() =>
  import('@/pages/ProductBrowse/SingleProductPage')
)
const BuyerProfilePage = lazy(() =>
  import('@/pages/BuyerProfile/BuyerProfilePage')
)
const BrowsePreharvestProductPage = lazy(() =>
  import('@/pages/browsePreharvestProduct/BrowsePreharvestProductPage')
)
const PreHarvestProductPage = lazy(() =>
  import('@/pages/browsePreharvestProduct/components/SingleProductPage')
)
const Dashboard = lazy(() => import('@/pages/buyerDashboard/Dashboard'))
const LoginPage = lazy(() => import('@/admin/pages/LoginPage'))
const SuperAdminLayout = lazy(() =>
  import('@/admin/layouts/SuperAdminDashboardLayout')
)
const SuperAdminOverview = lazy(() =>
  import('@/admin/pages/SuperAdminOverview')
)
const AdminSignupPage = lazy(() => import('@/admin/pages/AdminSignupPage'))
const Invites = lazy(() => import('@/admin/pages/AdminInvites'))
const ManageAdmins = lazy(() => import('@/admin/pages/ManageAdmins'))
const AllBuyerPage = lazy(() => import('@/admin/pages/AllBuyerPage'))
const AllFarmerPages = lazy(() => import('@/admin/pages/AllFarmerPages'))
const SingleFarmerPage = lazy(() => import('@/admin/pages/SingleFarmerPage'))
const SingleAdminPage = lazy(() => import('@/admin/pages/SingleAdminPage'))
const SingleBuyerPage = lazy(() => import('@/admin/pages/SingleBuyerPage'))
const AdminOverviewPage = lazy(() => import('@/admin/pages/AdminOverviewPage'))
const HarvestedListingsPage = lazy(() =>
  import('@/admin/pages/harvestedListings/HarvestedListingsPage')
)
const SingleHarvestedListing = lazy(() =>
  import('@/admin/pages/harvestedListings/SingleHarvestedListing')
)
const PreHarvestListings = lazy(() =>
  import('@/admin/pages/preHarvestListings/PreHarvestListings')
)
const SinglePreHarvestListingPage = lazy(() =>
  import('@/admin/pages/preHarvestListings/SinglePreHarvestListingPage')
)
const GovSchemes = lazy(() => import('@/admin/pages/Scheme/GovSchemes'))
const SingleSchemePage = lazy(() =>
  import('@/admin/pages/Scheme/SingleSchemePage')
)
const AddScheme = lazy(() => import('@/admin/pages/Scheme/AddScheme'))
const FarmerQueries = lazy(() => import('@/admin/pages/reports/FarmerQueries'))
const SingleQuery = lazy(() => import('@/admin/pages/reports/SingleQuery'))
const BuyerReports = lazy(() =>
  import('@/admin/pages/buyerReports/BuyerReports')
)
const SingleReport = lazy(() =>
  import('@/admin/pages/buyerReports/SingleReport')
)
const AdminProfile = lazy(() => import('@/admin/pages/profile/Profile'))
const Logs = lazy(() => import('@/admin/pages/Logs/Logs'))
const Unsubscribe = lazy(() => import('@/pages/Unsubscribe'))
const Subscribers = lazy(() => import('@/admin/pages/subscribers/Subscribers'))
const PublicQueries = lazy(() =>
  import('@/admin/pages/publicQueries/PublicQueries')
)
const BuyerBlockedPage = lazy(() => import('@/pages/BuyerBlockedPage'))

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
const WishlistPage = lazy(() => import('@/pages/Wishlist/WishlistPage'))

const router = createBrowserRouter([
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

  {
    path: '/privacy-policy',
    element: (
      <Suspense fallback={<PageLoader />}>
        <PrivacyPolicy />
      </Suspense>
    )
  },
  {
    path: '/terms-of-service',
    element: (
      <Suspense fallback={<PageLoader />}>
        <TermsOfService />
      </Suspense>
    )
  },
  {
    path: '/data-usage',
    element: (
      <Suspense fallback={<PageLoader />}>
        <DataUsage />
      </Suspense>
    )
  },
  {
    path: '/disclaimer',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Disclaimer />
      </Suspense>
    )
  },
  {
    path: '/blogs',
    element: (
      <Suspense fallback={<PageLoader />}>
        <ComingSoon />
      </Suspense>
    )
  },
  {
    path: '/refund-policy',
    element: (
      <Suspense fallback={<PageLoader />}>
        <ReturnPolicy />
      </Suspense>
    )
  },

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

  {
    path: '/buyer/blocked',
    element: (
      <Suspense fallback={<PageLoader />}>
        <BlockedUserLayout />
      </Suspense>
    ),
    children: [
      {
        element: <BuyerBlockedPage />,
        index: true
      }
    ]
  },

  {
    element: (
      <ProtectedRoute role='buyer' allowGuest>
        <Suspense fallback={<PageLoader />}>
          <AuthLayout />
        </Suspense>
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
      { path: 'admin/forgot-password', element: <div>Forgot password</div> }
    ]
  },

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
      { path: 'product/harvested', element: <HarvestedListingsPage /> },
      {
        path: 'product/harvested/:productId',
        element: <SingleHarvestedListing />
      },
      {
        path: 'product/pre-harvest',
        element: <PreHarvestListings />
      },
      {
        path: 'product/pre-harvest/:productId',
        element: <SinglePreHarvestListingPage />
      },
      {
        path: 'schemes',
        element: <GovSchemes />
      },
      {
        path: 'schemes/add',
        element: <AddScheme />
      },
      {
        path: 'schemes/:schemeId/edit',
        element: <AddScheme mode='edit' />
      },
      {
        path: 'schemes/:schemeId',
        element: <SingleSchemePage />
      },
      {
        path: 'queries',
        element: <FarmerQueries />
      },
      {
        path: 'queries/:id',
        element: <SingleQuery />
      },
      {
        path: 'reports',
        element: <BuyerReports />
      },
      {
        path: 'reports/:id',
        element: <SingleReport />
      },
      {
        path: 'profile',
        element: <AdminProfile />
      },
      {
        path: 'subscribers',
        element: <Subscribers />
      },
      {
        path: 'contacts',
        element: <PublicQueries />
      }
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
      },
      {
        path: 'logs',
        element: <Logs />
      }
    ]
  },

  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/public/unsubscribe/:token', element: <Unsubscribe /> }
    ]
  }
])

export default router
