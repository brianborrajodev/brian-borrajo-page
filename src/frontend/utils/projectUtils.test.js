import { describe, expect, it } from '@jest/globals'
import { filterProjects, getProjectCodeAction, getProjectPreview } from './projectUtils.js'

const projects = [
  { id: 'web-one', platform: 'web' },
  { id: 'desktop-one', platform: 'desktop' },
  { id: 'web-two', platform: 'web' },
]

describe('filterProjects', () => {
  it('returns every project for the all filter', () => {
    expect(filterProjects(projects)).toEqual(projects)
    expect(filterProjects(projects, 'all')).toEqual(projects)
  })

  it('returns only projects matching the selected platform', () => {
    expect(filterProjects(projects, 'web').map(({ id }) => id)).toEqual(['web-one', 'web-two'])
    expect(filterProjects(projects, 'desktop').map(({ id }) => id)).toEqual(['desktop-one'])
  })

  it('returns an empty array when the platform has no projects', () => {
    expect(filterProjects(projects, 'mobile')).toEqual([])
  })
})

describe('getProjectPreview', () => {
  it('keeps descriptions at or below the limit intact', () => {
    expect(getProjectPreview('Descripción breve', 20)).toEqual({
      text: 'Descripción breve',
      truncated: false,
    })
  })

  it('shortens long descriptions at a word boundary and adds an ellipsis', () => {
    const result = getProjectPreview('uno dos tres cuatro cinco seis', 18)

    expect(result).toEqual({ text: 'uno dos tres…', truncated: true })
  })
})

describe('getProjectCodeAction', () => {
  it('returns the repository link for public code', () => {
    expect(getProjectCodeAction({ codePublic: true, codeUrl: 'https://github.com/example/repo' })).toEqual({
      label: 'Ver código público',
      href: 'https://github.com/example/repo',
    })
  })

  it('distinguishes private code from a link that has not been supplied', () => {
    expect(getProjectCodeAction({ codePublic: false })).toEqual({ label: 'Código privado', href: null })
    expect(getProjectCodeAction({ codePublic: null })).toEqual({ label: 'Enlace pendiente', href: null })
  })
})
