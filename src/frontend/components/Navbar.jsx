import { useEffect, useState } from 'react'
import './Layout.css'

export default function Navbar() {
  const [nightMode, setNightMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('night-mode', nightMode)
    return () => document.documentElement.classList.remove('night-mode')
  }, [nightMode])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#inicio" aria-label="Portfolio - inicio">
          <span className="brand__icon" aria-hidden="true">
            &lt;/&gt;
          </span>
          <span className="brand__name">
            portfolio<span className="brand__ext">.exe</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Navegación principal">
          <a className="site-nav__link" href="#inicio">
            /home
          </a>
          <button
            className="site-nav__toggle"
            type="button"
            aria-pressed={nightMode}
            onClick={() => setNightMode((value) => !value)}
          >
            {nightMode ? 'MODO NOCTURNO' : 'MODO DIURNO'}
          </button>
        </nav>
      </div>
    </header>
  )
}
