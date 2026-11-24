import { useEffect } from 'react'
import { Link, Navigate, useLocation, useRoutes } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import routes from './routes.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.getElementById('app-scroll-container')?.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

function App() {
  const route = useRoutes([
    { path: '/', element: <Navigate to="/home" replace /> },
    ...routes,
  ])
  return (
    <Layout>
      <ScrollToTop />
      {route ?? <main className="p-8">Página no encontrada. <Link to="/home" className="underline">Ir al inicio</Link></main>}
    </Layout>
  )
}

export default App
