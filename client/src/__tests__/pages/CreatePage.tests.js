import React from 'react'
import CreatePage from '../../pages/CreatePage'
import { mount } from 'enzyme'

test ('CreatePage renders paragraph text', () => {
  const wrapper = mount(
    <CreatePage />
  )
  wrapper.setState({ code: false })
  const p = wrapper.find('.footerBlurb')
  expect(p.text()).toBe('Geography is pretty fun, huh?')
})
