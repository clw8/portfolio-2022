import React from "react"
import {fireEvent, render } from '@testing-library/react';

import Header from "../src/components/header"

describe("Header", () => {
  let header;
  const onMouseEnter = () => {}
  const onMouseOut = () => {}

  beforeAll(() => {
    header = render(<Header {...{onMouseEnter, onMouseOut, show: true}} />)
  })

  it("renders correctly", () => {
    const firstRender = header.asFragment()
    
    expect(firstRender).toMatchSnapshot()
  })
  
  it("renders hover effects correctly", async() => {
    setTimeout(async() => {
      const projectsLink = await header.findByRole("link", {name: "Projects"});
      fireEvent.mouseEnter(projectsLink);
      expect(onMouseEnter).toHaveBeenCalledTimes(1)
    }, 1000)
  })
})