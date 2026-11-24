import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import landscape from '../assets/home-volcan-background.jpg'
import avatar from '../assets/avatar-img.png'

const fullNameQuery = '(min-width: 40rem)'

function TerminalName() {
  const [showFullName, setShowFullName] = useState(() => window.matchMedia(fullNameQuery).matches)
  const name = showFullName ? '"BRIAN BORRAJO OTALVARO"' : '"BRIAN"'
  const [length, setLength] = useState(0)

  useEffect(() => {
    const query = window.matchMedia(fullNameQuery)
    function updateName(event) {
      setShowFullName(event.matches)
      setLength(0)
    }
    query.addEventListener('change', updateName)
    return () => query.removeEventListener('change', updateName)
  }, [])

  useEffect(() => {
    let count = 0
    let direction = 1
    let timer = setTimeout(tick, 95)
    function tick() {
      count += direction
      setLength(count)
      if (count === name.length) direction = -1
      if (count === 0) direction = 1
      const pause = count === name.length ? 2200 : count === 0 ? 450 : null
      timer = setTimeout(tick, pause ?? (direction === 1 ? 95 : 65))
    }
    return () => clearTimeout(timer)
  }, [name])

  return (
    <>
      <span className="sr-only">{name}</span>
      <span aria-hidden="true">
        <span className="theme-name-variable text-cyan-300">name</span><span className="text-cyan-300">{' = '}</span>
        {name.slice(0, length)}<span className="border-l-2 border-cyan-300" /><span className="invisible">{name.slice(length)}</span>
      </span>
    </>
  )
}

const destinations = [
  {
    id: 'proyectos',
    number: '01 / EXPLORAR',
    title: 'Mis proyectos',
    description: 'Ideas que se convierten en software.',
    href: '/proyectos',
  },
  {
    id: 'contacto',
    number: '02 / CONVERSAR',
    title: 'Contacto',
    description: '¿Construimos algo juntos?',
    href: '/contacto',
  },
]

function Home() {
  const navigate = useNavigate()
  const roleTitleRef = useRef(null)

  useLayoutEffect(() => {
    const title = roleTitleRef.current
    if (!title) return undefined

    let active = true
    const fitTitle = () => {
      if (!active) return
      const text = title.firstElementChild
      if (!text) return

      const baseSize = window.matchMedia('(min-width: 640px)').matches ? 24 : 17
      title.style.fontSize = `${baseSize}px`
      const styles = window.getComputedStyle(title)
      const availableWidth = title.clientWidth - Number.parseFloat(styles.paddingLeft) - Number.parseFloat(styles.paddingRight)
      const textWidth = text.scrollWidth
      if (textWidth > availableWidth) {
        title.style.fontSize = `${baseSize * (availableWidth / textWidth)}px`
      }
    }

    const observer = new ResizeObserver(fitTitle)
    observer.observe(title.parentElement)
    window.addEventListener('resize', fitTitle)
    fitTitle()
    document.fonts.ready.then(fitTitle)

    return () => {
      active = false
      observer.disconnect()
      window.removeEventListener('resize', fitTitle)
    }
  }, [])

  return (
    <main
      style={{ backgroundImage: `url(${landscape})` }}
      id="home"
      className="theme-home relative flex min-h-[calc(100dvh-9rem)] w-full min-w-0 flex-col bg-cover bg-center bg-no-repeat px-0 pt-0 pb-8 font-arcade text-[#e8efff] sm:pb-10"
    >
      <div aria-hidden="true" className="theme-home-overlay pointer-events-none absolute inset-0 z-0" />
      <section className="relative z-10 mx-auto flex w-full min-w-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-start pb-8 pt-12 text-center sm:pb-14">
          <div className="flex w-full flex-col items-center px-5 py-4 sm:px-12 sm:py-6">
            <p className="mb-5 text-xs leading-6 tracking-wide text-[#53bfff] day:text-sky-800 sm:text-sm">
              <span className="text-yellow-200 day:text-amber-700">print</span> ("HELLO, WORLD!")
            </p>
            <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 2.75rem)', whiteSpace: 'nowrap' }} className="theme-home-name mx-auto w-fit max-w-full bg-neutral-700/75 px-3 py-1 font-arcade font-normal leading-relaxed text-[#e8efff] [text-shadow:2px_2px_0_#146694,0_0_6px_#ffffffcc,0_0_16px_#ffffff80]">
              <TerminalName />
            </h1>
            <p ref={roleTitleRef} className="my-6 w-fit max-w-full whitespace-nowrap bg-neutral-700/75 px-3 py-1 text-center text-[17px] leading-8 text-orange-700 [-webkit-text-stroke:6px_black] [paint-order:stroke_fill] day:bg-white/90 sm:my-8 sm:text-2xl">
              <span className="inline-block whitespace-nowrap"><span aria-hidden="true" className="text-blue-800">{'<h1>'}</span>Desarrollador de software<span aria-hidden="true" className="text-blue-800">{'</h1>'}</span></span>
            </p>
            <code className="mt-4 flex w-fit max-w-full flex-col items-stretch gap-1 self-center text-left font-arcade text-[9px] leading-6 text-slate-200 day:text-slate-800 sm:text-sm sm:leading-7">
              <span className="theme-code-line flex max-w-full gap-3 bg-neutral-700/75 px-3 py-1">
                <span aria-hidden="true" className="select-none text-slate-300 day:text-slate-500">4</span>
                <span className="min-w-0 break-words"><span className="text-purple-300 day:text-purple-800">def</span> <span className="text-yellow-200 day:text-amber-800">start_job</span>(<span className="text-sky-300 day:text-sky-800">idea</span>, <span className="text-sky-300 day:text-sky-800">coffee</span>):</span>
              </span>
              <span className="theme-code-line flex max-w-full gap-3 bg-neutral-700/75 px-3 py-1">
                <span aria-hidden="true" className="select-none text-slate-300 day:text-slate-500">5</span>
                <span className="min-w-0 break-words pl-[4ch]"><span className="text-purple-300 day:text-purple-800">if</span> <span className="text-purple-300 day:text-purple-800">not</span> <span className="text-sky-300 day:text-sky-800">coffee</span>:</span>
              </span>
              <span className="theme-code-line flex max-w-full gap-3 bg-neutral-700/75 px-3 py-1">
                <span aria-hidden="true" className="select-none text-slate-300 day:text-slate-500">6</span>
                <span className="min-w-0 break-words pl-[8ch] sm:hidden"><span className="text-purple-300 day:text-purple-800">return</span> <span className="text-emerald-300 day:text-emerald-800">&quot;Error 404: café</span></span>
                <span className="hidden min-w-0 break-words pl-[8ch] sm:inline"><span className="text-purple-300 day:text-purple-800">return</span> <span className="text-emerald-300 day:text-emerald-800">&quot;Error 404: café no encontrado&quot;</span></span>
              </span>
              <span className="theme-code-line flex max-w-full gap-3 bg-neutral-700/75 px-3 py-1">
                <span aria-hidden="true" className="select-none text-slate-300 day:text-slate-500 sm:hidden">7</span>
                <span className="min-w-0 whitespace-nowrap pl-[8ch] text-emerald-300 day:text-emerald-800 sm:hidden">no encontrado&quot;</span>
                <span aria-hidden="true" className="hidden select-none text-slate-300 day:text-slate-500 sm:inline">7</span>
                <span className="hidden min-w-0 whitespace-nowrap pl-[4ch] text-sm sm:inline"><span className="text-purple-300 day:text-purple-800">return</span> <span className="text-sky-300 day:text-sky-800">idea</span>.<span className="text-yellow-200 day:text-amber-800">build</span>()</span>
              </span>
              <span className="theme-code-line flex max-w-full gap-3 bg-neutral-700/75 px-3 py-1 sm:hidden">
                <span aria-hidden="true" className="select-none text-slate-300 day:text-slate-500">8</span>
                <span className="min-w-0 whitespace-nowrap pl-[4ch] text-[8px] sm:text-sm"><span className="text-purple-300 day:text-purple-800">return</span> <span className="text-sky-300 day:text-sky-800">idea</span>.<span className="text-yellow-200 day:text-amber-800">build</span>()</span>
              </span>
            </code>
          </div>
        </div>

        <section aria-label="Biografía" className="mx-4 mb-0 flex flex-col items-center gap-0 sm:mx-10 sm:mb-8 sm:flex-row sm:items-end sm:justify-center sm:gap-6">
          <div className="relative z-20 mb-[-2rem] w-full max-w-sm rounded-[1.5rem] border-2 border-white bg-white px-4 py-3 text-left text-xs leading-6 text-slate-900 shadow-[4px_4px_0_#07152e] sm:mb-32 sm:max-w-none sm:flex-1 sm:px-6 sm:py-5 sm:text-sm md:mb-40 lg:mr-[91px] lg:w-[min(32rem,42vw)] lg:flex-none lg:px-5 xl:mb-56 xl:mr-[123px]">
            <p>¡Hola! Soy Brian, Desarrollador de Software Full Stack. Aquí encontrarás mis proyectos, y mi contacto ¡espero que te guste mi portfolio!</p>
            <span aria-hidden="true" className="absolute -bottom-3 left-10 size-6 bg-white [clip-path:polygon(0_0,100%_0,100%_100%)] sm:top-[36%] sm:bottom-auto sm:left-[-1rem] sm:[clip-path:polygon(0_0,100%_50%,0_100%)] lg:left-auto lg:right-[-1rem]" />
          </div>
          <div className="relative flex h-60 w-[min(80vw,18rem)] shrink-0 items-start justify-center overflow-hidden sm:h-auto sm:w-auto sm:items-end sm:overflow-visible lg:-translate-x-[91px] xl:-translate-x-[123px]">
            <img
              src={avatar}
              alt="Avatar pixel art de Brian"
              className="h-[430px] w-full max-w-none shrink-0 object-cover object-top [image-rendering:pixelated] sm:relative sm:z-10 sm:h-72 sm:w-56 sm:object-contain sm:object-bottom md:h-80 md:w-60 xl:h-96 xl:w-72"
            />
          </div>
        </section>

        <div className="mx-4 mb-0 hidden flex-wrap items-center justify-between gap-2 text-[10px] leading-5 tracking-wide text-[#c1cce0] day:text-slate-700 sm:mx-10 sm:mb-3 sm:flex sm:text-xs">

          <p>[ 01 – 02 ]</p>
        </div>

        <nav aria-label="Explora el portfolio" className="mx-4 grid w-auto gap-4 sm:mx-10 md:grid-cols-2">
          {destinations.map((destination) => (
            <button
              key={destination.number}
              type="button"
              onClick={() => navigate(destination.href)}
              className="theme-home-card group min-h-[166px] w-full cursor-pointer border border-[#273a58] bg-[#080f20]/95 p-4 text-left transition-colors hover:border-[#287ec0] hover:bg-[#0b2a4d] focus-visible:border-[#287ec0] focus-visible:bg-[#0b2a4d] sm:p-6"
            >
              <div className="flex items-center justify-between text-[10px] leading-5 tracking-wide text-[#9eacc3] day:text-slate-600 sm:text-xs">
                <span>
                  {destination.number}
                </span>
                <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor" shapeRendering="crispEdges" className="size-5 shrink-0 text-[#65c5ff] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-6">
                  <path d="M4 1h7v7H9V5H8v1H7v1H6v1H5v1H4v1H3v1H1V9h1V8h1V7h1V6h1V5h1V4h1V3H4z" />
                </svg>
              </div>
              <h2 className="mt-5 text-base leading-8 text-[#e8efff] group-hover:text-[#65c5ff] group-focus-visible:text-[#65c5ff] day:text-slate-900 day:group-hover:text-sky-800 day:group-focus-visible:text-sky-800 sm:mt-7 lg:text-xl">
                {destination.title}
              </h2>
              <p className="mt-2 text-xs leading-7 text-[#c4d0e2] day:text-slate-700 lg:text-sm">
                {destination.description}
              </p>
            </button>
          ))}
        </nav>
      </section>
    </main>
  )
}

export default Home
