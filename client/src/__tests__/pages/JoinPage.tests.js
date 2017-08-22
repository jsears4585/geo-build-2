import React from 'react'
import JoinPage from '../../pages/JoinPage'
import { mount } from 'enzyme'

test ('JoinPage renders paragraph text', () => {
  const wrapper = mount(
    <JoinPage />
  )
  wrapper.setState({ startGame: false })
  const p = wrapper.find('.footerBlurb')
  expect(p.text()).toBe("Please input your 4-digit code. Don't worry, we're case-insensitive.")
})
