import React, { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Modal } from ".";
import CloseIcon from "../images/icons/cancel.png";
import axios from "axios";

function ContactFormModal(props) {
  const { show, onClose, onNavigateBack } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      terms: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (data) => {
    setIsSubmitting(true)
    axios({
      url: "https://formspree.io/f/mayvpkbo",
      method: "post",
      headers: {
        Accept: "application/json",
      },
      data,
    })
    .then((response) => {
        setIsSubmitting(false)
        console.log(response);
      })
      .catch((error) => {
        setIsSubmitting(false)
        //toast network error
        /// oops problems...
        //status.innerHTML = "Oops! There was a problem submitting your form"
      });
  };

  const onCloseIconClick = () => {
    onClose && onClose();
  };
console.log(show)
  return (
    <Modal show={show} onNavigateBack={onNavigateBack} className="contact-form-modal">
      <Fragment>
        <div className="project-modal__close" onClick={onCloseIconClick}>
          <img src={CloseIcon} />
        </div>
        <div className="modal__content contact-form-modal__content">

          <form onSubmit={handleSubmit(onSubmit)} className="contact-form-modal__form">
            <div className="input__container">
              <label htmlFor="name" 
              className="label label--input" 
              error-content={errors?.name && errors?.name.message}>
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="input"
                {...register("name", {
                  required: { value: true, message: "Please enter your name" },
                })}
              />
            </div>
            <div className="input__container">
              <label htmlFor="email" className="label label--input" error-content={errors?.email && errors?.email.message}>Email</label>
              <input
                id="email"
                className="input"
                {...register("email", {
                  required: "Please enter your email :)",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                type="email"
                noValidate
              />
            </div>
            <div className="input__container">
              <label htmlFor="message" className="label label--input" error-content={errors?.message && errors?.message.message}>Your Message</label>
              <textarea
                id="message"
                className="textarea"
                {...register("message", {
                  required: "I appreciate blank emails, but that probably wasn't your intention.",
                  minLength: {
                    value: 6,
                    message: "I appreciate blank emails, but that probably wasn't your intention."
                  }
                })}
                name="message"
              />
            </div>
            <div className="checkbox-container">
              <Controller
                id="terms"
                name="terms"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onChange={field.onChange}>
                  I agree for my email to be stored for the purposes of being contacted
                    back by Chris
                  </Checkbox>
                )}
              />
            </div>

            <input type="submit"  disabled={isSubmitting} className="btn btn__primary contact-form-modal__submit" />
          </form>
        </div>
      </Fragment>
    </Modal>
  );
}

export default ContactFormModal;
