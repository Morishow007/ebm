import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '@/app/layouts/RootLayout'
import PortalLayout from '@/app/layouts/PortalLayout'
import { PrivateRoute } from './guards/PrivateRoute'

// Page-level skeleton fallback
function PageSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-charcoal-200 border-t-orange-400" />
    </div>
  )
}

// Lazy-loaded pages
const HomePage = React.lazy(() => import('@/pages/HomePage'))
const ProjectsPage = React.lazy(() => import('@/pages/ProjectsPage'))
const ModelShowcasePage = React.lazy(() => import('@/pages/ModelShowcasePage'))
const ServicesPage = React.lazy(() => import('@/pages/ServicesPage'))
const ContactPage = React.lazy(() => import('@/pages/ContactPage'))
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'))

function lazy(Page: React.LazyExoticComponent<() => React.JSX.Element>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Page />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: lazy(HomePage) },
      { path: 'projetos', element: lazy(ProjectsPage) },
      { path: 'projetos/3d/:slug', element: lazy(ModelShowcasePage) },
      { path: 'projetos/3d', element: lazy(ModelShowcasePage) },
      { path: 'servicos', element: lazy(ServicesPage) },
      { path: 'contato', element: lazy(ContactPage) },
      {
        path: 'portal',
        element: <PrivateRoute />,
        children: [
          {
            element: <PortalLayout />,
            children: [
              // Portal routes will be added here in Phase 2
            ],
          },
        ],
      },
      { path: '*', element: lazy(NotFoundPage) },
    ],
  },
])
