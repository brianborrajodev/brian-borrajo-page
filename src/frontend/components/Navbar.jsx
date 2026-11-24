import { useEffect, useState } from 'react'

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
  const [nightMode, setNightMode] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('night-mode', nightMode)
  }, [nightMode])

  return (
    <header className="relative z-10 block w-full bg-arcade-bar px-4 py-3 sm:px-10 md:py-5">
      <nav
        aria-label="Navegación principal"
        className="flex w-full flex-wrap items-center justify-between gap-y-3 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <a href="#home" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 md:gap-4 lg:justify-self-start" aria-label="Portfolio.exe, inicio">
          <svg aria-hidden="true" viewBox="0 0 20 16" className="h-6 w-[30px] shrink-0 text-[#53bfff]" fill="currentColor" shapeRendering="crispEdges">
            <path fillRule="evenodd" d="M0 0h20v16H0z M2 4v10h16V4z" />
            <path d="M7 5h2v1h2v1h2v1h2v2h-2v1h-2v1H9v1H7z" />
          </svg>
          <span className="font-mono text-sm font-bold tracking-wide text-[#e8efff]">
            portfolio.exe
          </span>
        </a>

        <div id="navbar-links" className={`${menuOpen ? 'grid' : 'hidden'} order-last w-full grid-cols-2 gap-1 font-mono text-xs md:order-none md:ml-auto md:mr-7 md:flex md:w-auto md:text-[11px] lg:mx-0`}>
          {['home', 'proyectos', 'redes', 'contacto'].map((section) => (
            <a key={section} href={`#${section}`} onClick={() => setMenuOpen(false)} className="border border-[#287ec0] px-3 py-3 text-[#65c5ff] hover:bg-[#0b2a4d] md:py-2">
              /{section}
            </a>
          ))}
        </div>
          <div className="flex items-center gap-2 font-mono text-[11px] sm:gap-3 lg:justify-self-end">
            <button
              type="button"
              role="switch"
              aria-checked={!nightMode}
              aria-label={nightMode ? 'Activar modo diurno' : 'Activar modo nocturno'}
              onClick={() => setNightMode((enabled) => !enabled)}
              className="flex h-9 w-[76px] cursor-pointer items-center justify-between border-2 border-[#28629b] bg-[#07152e] p-1 text-[#78cfff] shadow-[3px_3px_0_#020611] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#53bfff]"
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
            <span className="hidden w-32 text-right text-[#aeb8ca] sm:inline-block">
              MODO {nightMode ? 'NOCTURNO' : 'DIURNO'}
            </span>
            <button type="button" aria-controls="navbar-links" aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)} className="grid size-11 place-items-center border border-[#28629b] bg-[#07152e] text-[#78cfff] md:hidden">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges">
                <path d={menuOpen ? 'M3 3l10 10M13 3L3 13' : 'M1 3h14M1 8h14M1 13h14'} />
              </svg>
            </button>
          </div>
      </nav>
    </header>
  )
}

export default Navbar
