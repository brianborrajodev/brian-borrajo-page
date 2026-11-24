const contacts = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+34 679 14 07 13',
    href: 'https://wa.me/34679140713',
    path: 'M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.3ZM12.1 21.6h-.1c-1.7 0-3.4-.5-4.8-1.3l-.4-.2-3.9 1 1-3.8-.3-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5H8c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.6s1.2 3 1.4 3.2c.2.2 2.3 3.5 5.5 4.9.8.4 1.4.6 1.9.7.8.3 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z',
  },
  {
    id: 'email',
    label: 'Correo electrónico',
    value: 'brianborrajodev@gmail.com',
    href: 'mailto:brianborrajodev@gmail.com',
    path: 'M2 4h20v16H2V4Zm2 2v.4l8 5.4 8-5.4V6l-8 5-8-5Zm16 12V8.8l-8 5.3-8-5.3V18h16Z',
  },
  {
    id: 'phone',
    label: 'Teléfono',
    value: '+34 614 641 158',
    href: 'tel:+34614641158',
    path: 'M6.6 1h3l1.5 5-2.3 1.8a15 15 0 0 0 7.4 7.4L18 13l5 1.5v3c0 1.1-.9 2-2 2C10.5 19.5 4.5 13.5 4.5 3A2 2 0 0 1 6.6 1Z',
  },
]

const profiles = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/brian-borrajo-otalvaro/',
    path: 'M5.2 3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM1 7h4v16H1V7Zm6.5 0h3.8v2.2h.06C11.9 7.9 13.4 6.6 16 6.6c4.2 0 5 2.8 5 6.5V23h-4v-8.8c0-2.1 0-4.7-2.9-4.7s-3.4 2.3-3.4 4.6V23h-4V7Z',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/brianborrajodev',
    path: 'M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.05c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.24-5.11 5.52.4.35.76 1.03.76 2.08V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z',
  },
]

export default function Contact() {
  return (
    <main className="theme-page mx-auto w-full max-w-6xl px-3 py-12 sm:px-10">
      <h1 style={{ fontSize: 'clamp(0.7rem, 4.1vw, 2.25rem)', whiteSpace: 'nowrap' }} className="mx-auto text-center font-arcade tracking-[-0.15em] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
        <span aria-hidden="true" style={{ color: '#569cd6' }}>{'<h2> '}</span>
        <span style={{ color: '#ce9178' }}>Contacto</span>
        <span aria-hidden="true" style={{ color: '#569cd6' }}>{' </h2>'}</span>
      </h1>
      <p style={{ fontSize: 'clamp(0.55rem, 3.2vw, 1.125rem)' }} className="theme-page-muted mt-5 text-center text-slate-300">Elige cómo quieres ponerte en contacto conmigo.</p>

      <section aria-labelledby="direct-contact-title" className="mt-9">
        <h2 id="direct-contact-title" className="whitespace-nowrap text-center font-arcade text-[clamp(0.5rem,2.2vw,1rem)] [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]">
          <span aria-hidden="true" style={{ color: '#569cd6' }}>{'<h3> '}</span>
          <span className="theme-contact-subheading text-[#dcdcaa]">Contacto directo</span>
          <span aria-hidden="true" style={{ color: '#569cd6' }}>{' </h3>'}</span>
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <a
              key={contact.id}
              href={contact.href}
              target={contact.id === 'whatsapp' ? '_blank' : undefined}
              rel={contact.id === 'whatsapp' ? 'noreferrer' : undefined}
              className="theme-contact-card group flex min-h-48 flex-col items-center justify-center gap-5 border border-[#273a58] bg-[#080f20]/95 p-6 text-center text-slate-100 transition-colors hover:border-[#287ec0] hover:bg-[#0b2a4d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-14 shrink-0 fill-current text-cyan-300 transition-transform group-hover:scale-110"><path d={contact.path} /></svg>
              <span className="font-arcade text-xs sm:text-sm">{contact.label}</span>
              <span className="theme-contact-value break-all font-mono text-sm text-sky-200">{contact.value}</span>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="professional-profiles-title" className="mt-10">
        <h2 id="professional-profiles-title" className="whitespace-nowrap text-center font-arcade text-[clamp(0.5rem,2.2vw,1rem)] [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]">
          <span aria-hidden="true" style={{ color: '#569cd6' }}>{'<h3> '}</span>
          <span className="theme-contact-subheading text-[#dcdcaa]">Perfiles profesionales</span>
          <span aria-hidden="true" style={{ color: '#569cd6' }}>{' </h3>'}</span>
        </h2>
        <div className="mx-auto mt-4 grid w-full max-w-4xl gap-5 sm:grid-cols-2">
          {profiles.map((profile) => (
            <a key={profile.id} href={profile.href} target="_blank" rel="noreferrer" className="theme-contact-card group flex min-h-48 flex-col items-center justify-center gap-5 border border-[#273a58] bg-[#080f20]/95 p-6 text-center text-slate-100 transition-colors hover:border-[#287ec0] hover:bg-[#0b2a4d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-14 shrink-0 fill-current text-cyan-300 transition-transform group-hover:scale-110"><path d={profile.path} /></svg>
              <span className="font-arcade text-xs sm:text-sm">{profile.label}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
