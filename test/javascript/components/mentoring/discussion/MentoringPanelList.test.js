import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MentoringPanelList } from '../../../../../app/javascript/components/mentoring/discussion/MentoringPanelList'

test('switches to the scratchpad tab', async () => {
  const links = {
    scratchpad: 'http://exercism.test/scratchpad',
  }
  const iteration = {
    links: {
      posts: 'http://exercism.test/posts',
    },
  }

  render(<MentoringPanelList links={links} iteration={iteration} />)

  userEvent.click(screen.getByRole('tab', { name: 'Scratchpad' }))

  expect(
    await screen.findByRole('tab', { name: 'Scratchpad', selected: true })
  ).toBeInTheDocument()
  expect(
    await screen.findByRole('tabpanel', { name: 'Scratchpad' })
  ).toBeInTheDocument()
  expect(
    await screen.findByRole('tab', { name: 'Discussion', selected: false })
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('tabpanel', { name: 'Discussion' })
  ).not.toBeInTheDocument()
})

test('switches to the guidance tab', async () => {
  const links = {
    scratchpad: 'http://exercism.test/scratchpad',
  }
  const iteration = {
    links: {
      posts: 'http://exercism.test/posts',
    },
  }

  render(<MentoringPanelList links={links} iteration={iteration} />)

  userEvent.click(screen.getByRole('tab', { name: 'Guidance' }))

  expect(
    await screen.findByRole('tab', { name: 'Guidance', selected: true })
  ).toBeInTheDocument()
  expect(
    await screen.findByRole('tabpanel', { name: 'Guidance' })
  ).toBeInTheDocument()
  expect(
    await screen.findByRole('tab', { name: 'Discussion', selected: false })
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('tabpanel', { name: 'Discussion' })
  ).not.toBeInTheDocument()
})