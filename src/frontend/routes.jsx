import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'

const routes = [
  { path: '/home', element: <Home /> },
  { path: '/proyectos', element: <Projects /> },
  {
    path: '/contacto',
    element: <Contact />,
  },
]

export default routes
