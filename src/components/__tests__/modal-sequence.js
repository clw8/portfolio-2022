import {cleanup, fireEvent, render } from '@testing-library/react';
import React, { useRef } from "react"

import ModalSequence from "../modal-sequence"
import ProjectModal from '../project-modal';
import projectData from '../../data/project-data';

const Page = () => {
    const modalSequenceRef = useRef()
    return (
        <ModalSequence
        ref={modalSequenceRef}
        // onExitModalSequence={onExitModalSequence}
        data={projectData}
        renderModal={
          (props) => {
            return (
              <ProjectModal 
                {...props}
              />
          )}
        }
      />
    )
}
describe("Modal Sequence", () => {
  it("renders correctly", () => {
    const {getByRole, asFragment} = render(<Page />)
    const firstRender = asFragment()
    expect(firstRender).toMatchSnapshot()

  })
})