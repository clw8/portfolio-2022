import {act } from '@testing-library/react';
import React from "react"

import ModalSequence from "../modal-sequence"
import Modal from '../modal';
import getInstance from '../../utils/test-utils/get-instance';
import "@testing-library/jest-dom"



describe("Modal Sequence", () => {
  let renderInstance;

  beforeEach(() => {
    renderInstance = getInstance(ModalSequence, {
      data: ["test data here", "second modal", "third modal", 3, 4], 
      renderModal: ({show, index, datum, onNext, onPrevious, exitModalSequence}) => {
        return (
          <Modal 
            show={show}
            key={index}
          >
            <button onClick={onPrevious}>Previous</button>
            <p>{datum}</p>
            <button onClick={onNext}>Next</button>
            <button onClick={exitModalSequence}>Close</button>
          </Modal>
      )}})
    
  })

  it("renders correctly", () => {
    expect(renderInstance.container).toBeInTheDocument()
    const firstRender = renderInstance.asFragment()
    expect(firstRender).toMatchSnapshot()
  })

  it("renders the modals correctly ", () => {
    expect(renderInstance.container).toHaveTextContent("test data here")
    expect(renderInstance.container).toHaveTextContent("second modal")
    expect(renderInstance.container).toHaveTextContent("Previous")
    expect(renderInstance.container).toHaveTextContent("Next")
  })

  it("can go to the next and previous modals", () => {
    act(() => {
      renderInstance.instanceRef.current.goToIndex(1)
    })
    const shownModal = renderInstance.getByRole('dialog')
    expect(shownModal).toBeInTheDocument()
    expect(shownModal).toHaveTextContent("second modal")
    act(() => {
      renderInstance.instanceRef.current.goToNext()
    })
    const nextModal = renderInstance.getByRole('dialog')
    expect(nextModal).toHaveTextContent("third modal")
    
    act(() => {
      renderInstance.instanceRef.current.goToPrevious()
    })

    act(() => {
      renderInstance.instanceRef.current.goToPrevious()
    })

    const firstModal = renderInstance.getByRole('dialog')
    expect(firstModal).toHaveTextContent("test data here")

  })
})