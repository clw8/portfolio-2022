import React, { useState } from "react";
import { fireEvent, render, act } from "@testing-library/react";

import ContactFormModal from "../contact-form-modal";
import ToastProvider from "../../context-providers/toast-provider";
import axios from "axios"

const ContactFormPage = ({ show }) => {
  const onClose = () => {};
  return (
    <ToastProvider>
      <ContactFormModal show={true} onClose={onClose} />
    </ToastProvider>
  );
};

describe("Contact Form Modal", () => {
  let renderInstance;

  beforeAll(() => {
    renderInstance = render(<ContactFormPage show={true} />);
  });

  it("renders correctly", () => {
    const firstRender = renderInstance.asFragment();

    expect(firstRender).toMatchSnapshot();
  });

  it("handles errors correctly",  () => {
    setTimeout(() => {
        const form = renderInstance.getByTestId("form");
        fireEvent.submit(form);
        const nameInput = form.getByLabelText("Name");
        expect(nameInput).toHaveAttribute("aria-invalid", "true");
        const emailInput = form.getByLabelText("Email");
        expect(emailInput).toHaveAttribute("aria-invalid", "true");
        const messageInput = form.getByLabelText("Your Message");
        expect(messageInput).toHaveAttribute("aria-invalid", "true");
        const termsCheckbox = form.getByRole("checkbox")
        expect(termsCheckbox).toHaveAttribute("aria-invalid", "true");
    }, 1000)
  });

  it("submits the form", () => {
    const postSpySuccess = jest.spyOn(axios, "post").mockImplementation(() => {
        return new Promise((resolve, reject) => {
          return resolve({
            data:{}
          });
        });
      });

      setTimeout(() => {
        const form = renderInstance.getByTestId("form");
        const nameInput = form.getByLabelText("Name");
        fireEvent.change(nameInput, { target: { value: 'Joe Doe' } }); 
        const emailInput = form.getByLabelText("Email");
        fireEvent.change(emailInput, { target: { value: 'johndoe@gmail.com' } }); 
        const messageInput = form.getByLabelText("Your Message");
        fireEvent.change(messageInput, { target: { value: 'hi! this is a message' } }); 
        const termsCheckbox = form.getByRole("checkbox")
        fireEvent.change(termsCheckbox, { target: { checked: true } }); 

        fireEvent.submit(form)
        expect(postSpySuccess).toHaveBeenCalledTimes(1);
    }, 1000)
  })
});
