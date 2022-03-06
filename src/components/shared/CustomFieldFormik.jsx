import { useState } from 'react';
import { useField } from 'formik';
import {
  Textarea,
  Input,
  Select,
  Box
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'


const Field = (props) => {
  const [field] = useField(props)
  const [show, setShow] = useState(false)
  if (props.component === 'select'){
    return (
      <Select boxShadow='sm' {...props} {...field} >
        {props.children}
      </Select>
    )
  } else if(props.component === 'textarea'){
    return <Textarea boxShadow='sm' {...props} {...field} />
  }
  
  if(props.type === 'password'){
    const newProps = {...props, type: show? 'text' : 'password'}
    return <Box position='relative'>
      <Input boxShadow='sm' {...newProps} {...field} />
      <button tabIndex="-1" className='input-button-show-password' type='button' onClick={()=> setShow(!show)}>
        {
          show
          ? <ViewOffIcon />
          : <ViewIcon />
        }
      </button>
    </Box>
  }
  return <Input boxShadow='sm' {...props} {...field} />
}
 
export default Field;