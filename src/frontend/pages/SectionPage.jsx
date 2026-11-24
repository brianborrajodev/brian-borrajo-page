export default function SectionPage({ title, children }) {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="mb-6 font-arcade text-2xl [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
        <span aria-hidden="true" style={{ color: '#569cd6' }}>{'<h2> '}</span>
        <span style={{ color: '#ce9178' }}>{title}</span>
        <span aria-hidden="true" style={{ color: '#569cd6' }}>{' </h2>'}</span>
      </h1>
      {children}
    </main>
  )
}
