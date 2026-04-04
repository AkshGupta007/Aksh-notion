import React from 'react'
import { useForm } from 'react-hook-form'


const Allcourseinfromation = () => {\

    const { register, handleSubmit, getValues,setValue,formState: { errors } } = useForm();
  return (
    <div>

        <form onSubmit={handleSubmit(submit)}>

        </form>
      
    </div>
  )
}

export default Allcourseinfromation
