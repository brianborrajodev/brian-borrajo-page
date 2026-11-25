export function filterProjects(projects, platform = 'all') {
  if (platform === 'all') return projects
  return projects.filter((project) => project.platform === platform)
}

export function getProjectPreview(description, limit = 120) {
  if (description.length <= limit) {
    return { text: description, truncated: false }
  }

  const excerpt = description.slice(0, limit).replace(/\s+\S*$/, '')
  return { text: `${excerpt}…`, truncated: true }
}

export function getProjectCodeAction(project) {
  if (project.codePublic === true && project.codeUrl) {
    return { label: 'Ver código público', href: project.codeUrl }
  }

  if (project.codePublic === false) {
    return { label: 'Código privado', href: null }
  }

  return { label: 'Enlace pendiente', href: null }
}
