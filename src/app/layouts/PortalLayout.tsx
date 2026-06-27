import { Outlet } from 'react-router-dom'

// Portal layout — reserved for Phase 2 (Client Portal with BIM model access).
export default function PortalLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will be added in Phase 2 */}
      <aside className="w-64 shrink-0 border-r border-charcoal-200 bg-charcoal-50" />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
