import { useEffect, useState } from 'react'
import landscape from '../assets/home-volcan-background.jpg'

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
        <span className="text-cyan-300">{'name = '}</span>
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
    href: '#proyectos',
  },
  {
    id: 'redes',
    number: '02 / CONECTAR',
    title: 'Mis redes',
    description: 'Mi lado más allá del editor.',
    href: '#redes',
  },
  {
    id: 'contacto',
    number: '03 / CONVERSAR',
    title: 'Contacto',
    description: '¿Construimos algo juntos?',
    href: 'mailto:hola@brianborrajo.com',
  },
]

function Home() {
  return (
    <main
      style={{ backgroundImage: `url(${landscape})` }}
      id="home"
      className="relative flex min-h-[calc(100dvh-9rem)] w-full min-w-0 flex-col bg-cover bg-center bg-no-repeat px-0 pb-8 pt-8 font-arcade text-[#e8efff] sm:pb-10 sm:pt-8"
    >
      <section className="relative z-10 mx-auto flex w-full min-w-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center pb-8 pt-12 text-center sm:pb-14">
          <div className="flex w-full flex-col items-center px-5 py-4 sm:px-12 sm:py-6">
            <p className="mb-5 text-xs leading-6 tracking-wide text-[#53bfff] sm:text-sm">
              <span className="text-yellow-200">print</span> ("HOLA, MUNDO")
            </p>
            <h1 className="mx-auto w-fit max-w-full bg-neutral-700/75 px-3 py-1 font-arcade text-2xl font-normal leading-relaxed text-[#e8efff] [text-shadow:2px_2px_0_#146694,0_0_6px_#ffffffcc,0_0_16px_#ffffff80] sm:text-4xl lg:text-5xl 2xl:text-[64px]">
              <TerminalName />
            </h1>
            <p className="my-6 w-fit max-w-full bg-neutral-700/75 px-3 py-1 text-center text-[17px] leading-8 text-orange-700 [-webkit-text-stroke:6px_black] [paint-order:stroke_fill] sm:my-8 sm:text-2xl">
              <span aria-hidden="true" className="text-blue-800">{'<h1>'}</span>Desarrollador de software<span aria-hidden="true" className="text-blue-800">{'</h1>'}</span>
            </p>
            <code className="mt-4 flex max-w-full flex-col items-start gap-1 text-left font-arcade text-xs leading-7 text-slate-200 sm:text-sm">
              <span className="flex max-w-full gap-3 bg-neutral-700/75 px-3 py-1">
                <span aria-hidden="true" className="select-none text-slate-300">7</span>
                <span className="min-w-0 break-words"><span className="text-purple-300">def</span> <span className="text-yellow-200">code_mode_on</span>(<span className="text-sky-300">idea</span>, <span className="text-sky-300">cafe</span>):</span>
              </span>
              <span className="flex max-w-full gap-3 bg-neutral-700/75 px-3 py-1">
                <span aria-hidden="true" className="select-none text-slate-300">8</span>
                <span className="min-w-0 break-words pl-[4ch]"><span className="text-purple-300">if</span> <span className="text-sky-300">cafe</span>.<span className="text-yellow-200">drink</span>() == <span className="text-orange-300">True</span>:</span>
              </span>
              <span className="flex max-w-full gap-3 bg-neutral-700/75 px-3 py-1">
                <span aria-hidden="true" className="select-none text-slate-300">9</span>
                <span className="min-w-0 break-words pl-[8ch]"><span className="text-purple-300">return</span> <span className="text-sky-300">idea</span>.<span className="text-yellow-200">build</span>().<span className="text-yellow-200">deploy</span>()</span>
              </span>
            </code>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[10px] leading-5 tracking-wide text-[#c1cce0] sm:text-xs">

          <p>[ 01 – 03 ]</p>
        </div>

        <nav aria-label="Explora el portfolio" className="grid gap-4 md:grid-cols-3">
          {destinations.map((destination) => (
            <a
              key={destination.number}
              id={destination.id}
              href={destination.href}
              className="group min-h-[166px] border border-[#273a58] bg-[#080f20]/95 p-4 transition-colors hover:border-[#287ec0] hover:bg-[#0b2a4d] focus-visible:border-[#287ec0] focus-visible:bg-[#0b2a4d] sm:p-6"
            >
              <div className="flex items-center justify-between text-[10px] leading-5 tracking-wide text-[#9eacc3] sm:text-xs">
                <span>
                  {destination.number}
                </span>
                <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor" shapeRendering="crispEdges" className="size-5 shrink-0 text-[#65c5ff] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-6">
                  <path d="M4 1h7v7H9V5H8v1H7v1H6v1H5v1H4v1H3v1H1V9h1V8h1V7h1V6h1V5h1V4h1V3H4z" />
                </svg>
              </div>
              <h2 className="mt-5 text-base leading-8 text-[#e8efff] group-hover:text-[#65c5ff] group-focus-visible:text-[#65c5ff] sm:mt-7 lg:text-xl">
                {destination.title}
              </h2>
              <p className="mt-2 text-xs leading-7 text-[#c4d0e2] lg:text-sm">
                {destination.description}
              </p>
            </a>
          ))}
        </nav>
      </section>
    </main>
  )
}

export default Home
