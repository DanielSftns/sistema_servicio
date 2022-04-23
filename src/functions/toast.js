import { createStandaloneToast } from '@chakra-ui/react'

const toastDefault = {
  status: 'error',
  position: 'top-right',
  duration: 5000,
  isClosable: true
}

const Toast = (config) => {
  const toast = createStandaloneToast()
  toast({...toastDefault, ...config})
}

const successToast = ({title = 'Exito', description}) => {
  Toast({
    status: 'success',
    title,
    description
  })
}

const errorToast = ({title = 'Error', description}) => {
  Toast({
    status: 'error',
    title,
    description
  })
}

const infoToast = ({title = 'Info', description}) => {
  Toast({
    status: 'info',
    title,
    description
  })
}
 
export { successToast, errorToast, infoToast }