import React from 'react'
import HomePage from '../../pages/HomePage'
import { mount } from 'enzyme'

test ('HomePage renders paragraph text', () => {
  const wrapper = mount(
    <HomePage />
  )
  const p = wrapper.find('.footerBlurb')
  expect(p.text()).toBe('An interactive geography game powered by React, MongoDB, Node.js, Mapbox GL, & Socket.io')
})
