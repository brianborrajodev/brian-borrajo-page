import { useRef, useState } from 'react'
import projects from '../data/projects.json'

const previewLimit = 120
const filters = [
  { id: 'all', label: 'Todos', icon: 'all' },
  { id: 'web', label: 'Web', icon: 'web' },
  { id: 'desktop', label: 'Escritorio', icon: 'desktop' },
  { id: 'mobile', label: 'Móvil', icon: 'mobile' },
]
const images = import.meta.glob('../assets/proyecto-*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' })

function FilterIcon({ type }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinejoin: 'round', strokeLinecap: 'round' }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0" {...shared}>
      {type === 'all' && <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>}
      {type === 'web' && <><rect x="2.5" y="3.5" width="19" height="14" rx="1" /><path d="M8 21h8m-4-3.5V21M3 8h18" /></>}
      {type === 'desktop' && <><rect x="3" y="3" width="18" height="14" /><path d="M8 21h8m-4-4v4M6 7h12" /></>}
      {type === 'mobile' && <><rect x="6" y="2" width="12" height="20" rx="1.5" /><path d="M10 5h4m-3 14h2" /></>}
    </svg>
  )
}

function ProjectCard({ project, visible }) {
  const dialog = useRef(null)
  const image = images[`../assets/${project.image}`]
  const truncated = project.description.length > previewLimit
  const preview = truncated ? `${project.description.slice(0, previewLimit).replace(/\s+\S*$/, '')}…` : project.description
  return (
    <article aria-hidden={!visible} className={visible ? '' : 'pointer-events-none invisible select-none'}>
      <button type="button" aria-haspopup="dialog" aria-label={`Ver ficha de ${project.title}`} onClick={() => dialog.current.showModal()} className="theme-card group h-full w-full cursor-pointer border border-[#273a58] bg-[#080f20] text-left transition-colors hover:border-[#287ec0] hover:bg-[#0b2a4d] focus-visible:outline-cyan-300">
        <img src={image} alt={project.alt} className="aspect-video w-full object-cover" />
        <span className="block p-5">
          <span className="theme-card-type font-mono text-xs uppercase text-cyan-300">{project.type}</span>
          <span className="my-3 flex flex-wrap items-center gap-3">
            <span className="font-arcade text-base">{project.title}</span>
            <span className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="theme-card-stack border border-sky-800/80 bg-[#07152e] px-2 py-1 font-mono text-[10px] text-sky-200">
                  {tech}
                </span>
              ))}
            </span>
          </span>
          <span className="theme-card-description block text-slate-300">{preview}</span>
          {truncated && <span className="mt-4 block font-mono text-sky-300">Ver más...</span>}
        </span>
      </button>
      <dialog ref={dialog} aria-labelledby={`${project.id}-title`} className="theme-dialog fixed inset-0 m-auto max-h-[90dvh] w-[min(92vw,40rem)] overflow-y-auto border border-sky-500 bg-[#081526] p-5 text-slate-100 backdrop:bg-black/80 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {project.codePublic === true ? (
            <a href={project.codeUrl} target="_blank" rel="noreferrer" className="theme-dialog-code-link border border-cyan-700 px-3 py-2 font-mono text-xs text-cyan-200 hover:bg-[#0b2a4d]">
              <span aria-hidden="true" className="mr-2 font-bold">&lt;/&gt;</span>Ver código público
            </a>
          ) : (
            <button type="button" disabled className="cursor-not-allowed border border-slate-700 px-3 py-2 font-mono text-xs text-slate-400">
              <span aria-hidden="true" className="mr-2 font-bold">&lt;/&gt;</span>{project.codePublic === false ? 'Código privado' : 'Enlace pendiente'}
            </button>
          )}
          <form method="dialog"><button className="cursor-pointer border border-sky-600 px-3 py-2 text-sm text-sky-200">Cerrar ×</button></form>
        </div>
        <p className="font-mono text-xs uppercase text-cyan-300">{project.type}</p>
        <h2 id={`${project.id}-title`} className="my-4 font-arcade text-lg">{project.title}</h2>
        <img src={image} alt={project.alt} className="mb-4 max-h-64 w-full object-contain" />
        <section aria-labelledby={`${project.id}-description`}>
          <h3 id={`${project.id}-description`} className="mb-2 font-mono text-sm text-[#569cd6]">Descripción</h3>
          <p className="leading-7">{project.description}</p>
        </section>
        {project.stack.length > 0 && (
          <section aria-labelledby={`${project.id}-stack`} className="theme-dialog-stack-section mt-6 border border-[#3c4654] bg-[#1e1e1e] p-4">
            <h3 id={`${project.id}-stack`} className="mb-3 font-mono text-sm text-[#ce9178]">
              <span className="text-[#569cd6]">const</span> tecnologías =
            </h3>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {project.stack.map((tech) => (
                <li key={tech} className="theme-dialog-stack-item flex min-h-12 items-center justify-center break-words border border-[#3c4654] bg-[#252526] px-2 py-2 text-center font-mono text-xs text-[#9cdcfe]">
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}
      </dialog>
    </article>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const hasVisibleProjects = activeFilter === 'all'
    || projects.some((project) => project.platform === activeFilter)

  return (
    <main className="theme-page mx-auto w-full max-w-6xl px-3 py-12 sm:px-10">
      <h1 style={{ fontSize: 'clamp(0.7rem, 4.1vw, 2.25rem)', whiteSpace: 'nowrap' }} className="mx-auto text-center font-arcade tracking-[-0.15em] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
        <span aria-hidden="true" style={{ color: '#569cd6' }}>{'<h2> '}</span>
        <span style={{ color: '#ce9178' }}>Mis proyectos</span>
        <span aria-hidden="true" style={{ color: '#569cd6' }}>{' </h2>'}</span>
      </h1>
      <p style={{ fontSize: 'clamp(0.55rem, 3.2vw, 1.125rem)' }} className="theme-page-muted mt-5 text-center text-slate-300">Húsmea entre los proyectos que he participado.</p>
      <div className="mt-7 flex flex-col items-center">
        <p className="theme-filter-label font-arcade text-xs uppercase tracking-wide text-cyan-200">Filtros</p>
        <div aria-label="Filtrar proyectos por plataforma" className="mt-3 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              data-active={activeFilter === filter.id}
              className={`theme-filter inline-flex h-12 w-36 cursor-pointer items-center justify-center gap-2 border px-3 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                activeFilter === filter.id
                  ? 'border-cyan-300 bg-[#0b2a4d] text-cyan-200'
                  : 'border-[#273a58] bg-[#080f20] text-slate-300 hover:border-[#287ec0] hover:bg-[#0b2a4d]'
              }`}
            >
              <FilterIcon type={filter.icon} />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-8">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              visible={activeFilter === 'all' || project.platform === activeFilter}
            />
          ))}
        </div>
        {!hasVisibleProjects && (
          <div role="status" className="theme-empty-state absolute inset-x-0 top-0 border border-[#273a58] bg-[#080f20] p-5 text-slate-300">
            Todavía no hay proyectos en esta categoría.
          </div>
        )}
      </div>
    </main>
  )
}
