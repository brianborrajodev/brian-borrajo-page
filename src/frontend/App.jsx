import Layout from './layouts/Layout.jsx'
import routes from './routes.jsx'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/home'
  const route = routes.find((entry) => entry.path === path)
  return (
    <Layout>
      {route?.element ?? <main className="p-8">Página no encontrada. <a href="/home" className="underline">Ir al inicio</a></main>}
    </Layout>
  )
}

export default App
