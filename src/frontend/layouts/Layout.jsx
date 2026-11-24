import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

function Layout({ children }) {
  return (
    <div id="app-scroll-container" className="fixed inset-0 overflow-x-hidden overflow-y-auto">
      <div className="theme-layout grid min-h-dvh w-full min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] bg-[#070b18] text-[#e8efff]">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
