import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import SectionPage from './pages/SectionPage.jsx'

const routes = [
  { path: '/home', element: <Home /> },
  { path: '/proyectos', element: <Projects /> },
  { path: '/redes', element: <SectionPage title="Mis redes" /> },
  {
    path: '/contacto',
    element: (
      <SectionPage title="Contacto">
        <a className="text-cyan-300 underline" href="mailto:hola@brianborrajo.com">Escríbeme por correo</a>
      </SectionPage>
    ),
  },
]

export default routes
