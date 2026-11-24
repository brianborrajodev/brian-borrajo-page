const socials = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/brianborrajodev',
    path: 'M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.05c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.24-5.11 5.52.4.35.76 1.03.76 2.08V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/brian-borrajo-otalvaro/',
    path: 'M5.2 3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM1 7h4v16H1V7Zm6.5 0h3.8v2.2h.06C11.9 7.9 13.4 6.6 16 6.6c4.2 0 5 2.8 5 6.5V23h-4v-8.8c0-2.1 0-4.7-2.9-4.7s-3.4 2.3-3.4 4.6V23h-4V7Z',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/borrajo.dev/',
    path: 'M7 1h10a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6V7a6 6 0 0 1 6-6Zm0 2A4 4 0 0 0 3 7v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7Zm5 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm6.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z',
  },
]

export default function Socials() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-10">
      <h1 className="font-arcade text-2xl [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] sm:text-4xl">
        <span aria-hidden="true" style={{ color: '#569cd6' }}>{'<h2> '}</span>
        <span style={{ color: '#ce9178' }}>Mis redes</span>
        <span aria-hidden="true" style={{ color: '#569cd6' }}>{' </h2>'}</span>
      </h1>
      <p className="mt-5 text-lg text-slate-300">Conectemos más allá del código.</p>

      <nav aria-label="Redes sociales" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-48 flex-col items-center justify-center gap-5 border border-[#273a58] bg-[#080f20]/95 p-6 text-center text-slate-100 transition-colors hover:border-[#287ec0] hover:bg-[#0b2a4d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-16 shrink-0 fill-current text-cyan-300 transition-transform group-hover:scale-110">
              <path d={social.path} />
            </svg>
            <span className="font-arcade text-sm">{social.label}</span>
          </a>
        ))}
      </nav>
    </main>
  )
}
