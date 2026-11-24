import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

function Layout({ children }) {
  return (
    <div className="fixed inset-0 overflow-x-hidden overflow-y-auto">
      <div className="grid min-h-dvh w-full grid-rows-[auto_1fr_auto] bg-[#070b18] text-[#e8efff]">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
