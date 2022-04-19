import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "../components"
import axios from "axios"

function ContactForm() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control } = useForm({
        defaultValues: {
          terms: false,
        }
      });

    const onSubmit = (data) => {
      axios({
        url: 'https://formspree.io/f/mayvpkbo',
        method: 'post',
        headers: {
          'Accept': 'application/json'
        },
        data
      }).then((response) => { console.log(response); })
        .catch(error => {
          //toast network error
          /// oops problems...
          //status.innerHTML = "Oops! There was a problem submitting your form"
        });
          
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            {...register("name", { required: { value: true, message: "Please enter your name"} })}
          />
          {errors?.name && <span>{errors.name.message}</span>}
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                {...register("email", {
                required: "I can't contact you back without an email :)",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                }
                })}
                type="email"
                novalidate
            />
            {errors?.email && <span>{errors.email.message}</span>}
        </div>

        <div>
            <label htmlFor="message">Your Message</label>
            <textarea
                id="message"
                {...register("message", {
                required: "I appreciate blank emails, but that probably wasn't your intention.",})}
                name="message"
            />
            {errors?.email && <span>{errors.message.message}</span>}
        </div>
        <div>
            <label htmlFor="terms">I agree for my email to be stored for the purposes of being contacted back by Chris :)</label>
            <Controller id="terms" name="terms" 
              rules={{ required: true }}
              control={control}
              render={({ field }) => <Checkbox id={field.name} checked={field.value} onChange={field.onChange} />}
              />
        </div>

        <input type="submit" disabled={isSubmitting} />
      </form>
    );
}

export default ContactForm