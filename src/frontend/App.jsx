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

const pageMetadata = {
  '/': {
    title: 'Brian Borrajo Otalvaro | Desarrollador Full Stack',
    description: 'Portfolio de Brian Borrajo Otalvaro, desarrollador Full Stack. Conoce su perfil, explora proyectos web y encuentra sus métodos de contacto.',
  },
  '/proyectos': {
    title: 'Proyectos | Brian Borrajo Otalvaro – Desarrollador Full Stack',
    description: 'Explora los proyectos de Brian Borrajo Otalvaro: plataformas web, aplicaciones con React y Flask, y sus tecnologías.',
  },
  '/contacto': {
    title: 'Contacto | Brian Borrajo Otalvaro – Desarrollador Full Stack',
    description: 'Contacta con Brian Borrajo Otalvaro por correo, WhatsApp o teléfono. Consulta también sus perfiles de GitHub y LinkedIn.',
  },
}

function PageMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? pageMetadata['/']
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', new URL(pathname, window.location.origin).href)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', new URL(pathname, window.location.origin).href)
  }, [pathname])

  return null
}

function App() {
  const route = useRoutes([
    { path: '/home', element: <Navigate to="/" replace /> },
    ...routes,
  ])
  return (
    <Layout>
      <ScrollToTop />
      <PageMetadata />
      {route ?? <main className="p-8">Página no encontrada. <Link to="/" className="underline">Ir al inicio</Link></main>}
    </Layout>
  )
}

export default App
