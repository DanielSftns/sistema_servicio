import React from 'react';
import { useFormikContext, ErrorMessage } from 'formik'
import { FormErrorMessage, FormControl as ChakraFormControl } from '@chakra-ui/react'

const FormControl = (props)=>{
  const { errors, touched } = useFormikContext()

  return (
    <ChakraFormControl isInvalid={errors[props.errorprop] && touched[props.errorprop]} {...props}>
      {props.children}
      <ErrorMessage name={props.errorprop} component={FormErrorMessage} />
    </ChakraFormControl>
  )
}

export default FormControl;
