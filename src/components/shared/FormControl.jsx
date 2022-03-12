import React from 'react';
import { useFormikContext, ErrorMessage } from 'formik'
import { FormErrorMessage, FormControl as ChakraFormControl } from '@chakra-ui/react'

const FormControl = (props)=>{
  const { errors, touched } = useFormikContext()

  return (
    <ChakraFormControl isInvalid={errors[props.errorProp] && touched[props.errorProp]} {...props}>
      {props.children}
      <ErrorMessage name={props.errorProp} component={FormErrorMessage} />
    </ChakraFormControl>
  )
}

export default FormControl;
