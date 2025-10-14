import { Outlet, createRootRoute } from '@tanstack/react-router'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Sidebar />
      <main className="lg:pl-64 pt-20">
        <Outlet />
      </main>
    </>
  ),
})
