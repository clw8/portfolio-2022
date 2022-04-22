import React, { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Modal } from ".";
import CloseIcon from "../images/icons/cancel.png";
import axios from "axios";
import { useToast } from '../hooks'
import PropTypes from 'prop-types'

function ContactFormModal(props) {
  const { show, onClose } = props;
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

  const { showErrorToast, showSuccessToast, toastTypes } = useToast();


  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (data) => {
    setIsSubmitting(true)
    delete data.terms; // not needed

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
        showSuccessToast("Thank you for getting in contact. I will get back to you soon :)")
      })
      .catch((error) => {
        showErrorToast("Oops! There was a network problem. Please check your internet connection.")
        setIsSubmitting(false)
      });
  };

  const onCloseIconClick = () => {
    onClose && onClose();
  };

  return (
    <Modal show={show} onClose={onClose} className="contact-form-modal">
      <Fragment>
        <div className="contact-form-modal__close" onClick={onCloseIconClick}>
          <img src={CloseIcon} alt="Close Modal" />
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
                required
                noValidate
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
                required
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
                required
                noValidate
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
                    error={errors?.terms}
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

ContactFormModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
};