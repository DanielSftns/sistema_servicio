import React from 'react';
import { useFormikContext, ErrorMessage } from 'formik'
import { FormErrorMessage, FormControl as ChakraFormControl } from '@chakra-ui/react'

const FormControl = ({errorProp, children})=>{
  const { errors, touched } = useFormikContext()

  return (
    <ChakraFormControl isInvalid={errors[errorProp] && touched[errorProp]}>
      {children}
      <ErrorMessage name={errorProp} component={FormErrorMessage} />
    </ChakraFormControl>
  )
}

export default FormControl;
