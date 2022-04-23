import {act } from '@testing-library/react';
import React, {useState} from "react"

import ModalSequence from "../modal-sequence"
// import Modal from '../modal';
import getInstance from '../../utils/test-utils/get-instance';
import "@testing-library/jest-dom"

const MockModal = ({show, children}) => {
  return show && (<div role="dialog">
    {children}
  </div>)
}

const createRenderInstanceAtIndex = (startingIndex) => {
  return getInstance(ModalSequence, {
    data: ["test data here", "second modal", "third modal", 3, 4], 
    renderModal: ({show, index, datum, onNext, onPrevious, exitModalSequence}) => {
      return (
        <MockModal 
          show={startingIndex === index || show}
          key={index}
        >
          <button onClick={onPrevious}>Previous</button>
          <p>{datum}</p>
          <button onClick={onNext}>Next</button>
          <button onClick={exitModalSequence}>Close</button>
        </MockModal>
    )}})
}

describe("Modal Sequence", () => {
  let renderInstance;
  
  beforeEach(() => {
  })
  
  it("renders correctly", () => {
    renderInstance = createRenderInstanceAtIndex(1);
    expect(renderInstance.container).toBeInTheDocument()
    const firstRender = renderInstance.asFragment()
    expect(firstRender).toMatchSnapshot()
  })
  
  it("opens on the correct modal and renders correctly", () => {
    renderInstance = createRenderInstanceAtIndex(0);    
    expect(renderInstance.container).toHaveTextContent("test data here")
  })
    
  it("renders the correctly and can go to the next and previous modals", () => {
    renderInstance = createRenderInstanceAtIndex();
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