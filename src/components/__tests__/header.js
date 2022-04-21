import React from "react"
import {fireEvent, render } from '@testing-library/react';

import Header from "../header.js"

describe("Header", () => {
  it("renders correctly", () => {
    const onMouseEnter = () => {}
    const onMouseOut = () => {}
    const show = true;
    // const component = renderer
    //   .create(<Header {...{onMouseEnter, onMouseOut, show}} />)

    const {getByRole, asFragment} = render(<Header {...{onMouseEnter, onMouseOut, show}} />)
    const firstRender = asFragment()

    const projectsLink = getByRole("link", {name: "Projects"});
    fireEvent.mouseEnter(projectsLink);

    expect(firstRender).toMatchSnapshot()
  })
})