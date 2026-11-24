import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../routes.jsx'

function PixelMoon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5" shapeRendering="crispEdges">
      <path
        fill="currentColor"
        d="M7 1h5v2h-3v2H7v6h2v2h4v2H7v-2H5v-2H3V7h2V4h2V2h2V1Z"
      />
    </svg>
  )
}

function PixelSun() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5" shapeRendering="crispEdges">
      <path
        fill="currentColor"
        d="M6 0h4v3H6V0ZM6 13h4v3H6v-3ZM0 6h3v4H0V6Zm13 0h3v4h-3V6ZM4 4h2v2H4V4Zm6 0h2v2h-2V4ZM4 10h2v2H4v-2Zm6 0h2v2h-2v-2ZM5 5h6v6H5V5Z"
      />
    </svg>
  )
}

function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [nightMode, setNightMode] = useState(() => localStorage.getItem('portfolio-theme') !== 'day')

  useEffect(() => {
    document.documentElement.classList.toggle('night-mode', nightMode)
    document.documentElement.classList.toggle('day-mode', !nightMode)
    localStorage.setItem('portfolio-theme', nightMode ? 'night' : 'day')
  }, [nightMode])

  return (
    <header className="theme-navbar relative z-10 block w-full min-w-0 bg-arcade-bar px-4 py-3 sm:px-10 md:py-5">
      <nav
        aria-label="Navegación principal"
        className="flex w-full min-w-0 flex-wrap items-center justify-between gap-y-3 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <button type="button" onClick={() => navigate('/home')} className="flex cursor-pointer items-center gap-2 text-left md:gap-4 lg:justify-self-start" aria-label="Portfolio.exe, inicio">
          <svg aria-hidden="true" viewBox="0 0 20 16" className="theme-navbar-mark h-6 w-[30px] shrink-0 text-[#53bfff]" fill="currentColor" shapeRendering="crispEdges">
            <path fillRule="evenodd" d="M0 0h20v16H0z M2 4v10h16V4z" />
            <path d="M7 5h2v1h2v1h2v1h2v2h-2v1h-2v1H9v1H7z" />
          </svg>
          <span className="theme-navbar-logo font-mono text-sm font-bold tracking-wide text-[#e8efff]">
            portfolio.exe
          </span>
        </button>

        <div id="navbar-links" className="order-last grid w-full min-w-0 grid-cols-3 gap-1 pt-2 font-mono text-[9px] sm:text-[10px] md:order-none md:ml-auto md:mr-7 md:flex md:w-auto md:justify-center md:gap-1.5 md:pt-0 md:text-[11px] lg:mx-0">
          {routes.map(({ path }) => (
            <button key={path} type="button" onClick={() => navigate(path)} aria-current={pathname === path ? 'page' : undefined} className={`min-w-0 cursor-pointer whitespace-nowrap border px-1 py-2 text-center text-[8px] hover:bg-[#0b2a4d] sm:px-2 sm:text-[9px] md:flex-none md:px-3 md:text-[11px] ${pathname === path ? 'border-[#65c5ff] bg-[#0b2a4d] text-[#9be0ff]' : 'border-[#287ec0] text-[#65c5ff]'}`}>
              {path}
            </button>
          ))}
        </div>
          <div className="flex items-center gap-2 font-mono text-[11px] sm:gap-3 lg:justify-self-end">
            <button
              type="button"
              role="switch"
              aria-checked={!nightMode}
              aria-label={nightMode ? 'Activar modo diurno' : 'Activar modo nocturno'}
              onClick={() => setNightMode((enabled) => !enabled)}
              className={`flex h-9 w-[76px] cursor-pointer items-center justify-between border-2 p-1 shadow-[3px_3px_0_#020611] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#53bfff] ${nightMode ? 'border-[#28629b] bg-[#07152e] text-[#78cfff]' : 'border-[#d9a83f] bg-[#fff2c6] text-[#8a5a00]'}`}
            >
              <span
                className={`flex h-6 w-7 items-center justify-center transition-colors ${
                  nightMode
                    ? 'border border-[#3d82bd] bg-[#0b2a4d] text-[#9be0ff]'
                    : 'text-[#61758d]'
                }`}
              >
                <PixelMoon />
              </span>
              <span
                className={`flex h-6 w-7 items-center justify-center transition-colors ${
                  nightMode
                    ? 'text-[#61758d]'
                    : 'border border-[#d9a83f] bg-[#67430e] text-[#ffe07a]'
                }`}
              >
                <PixelSun />
              </span>
            </button>
            <span className="theme-navbar-mode hidden w-32 text-right text-[#aeb8ca] sm:inline-block">
              MODO {nightMode ? 'NOCTURNO' : 'DIURNO'}
            </span>
          </div>
      </nav>
    </header>
  )
}

export default Navbar
