import React from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton
} from '@chakra-ui/react'

const ConfirmModal = (props)=> {
  const {isOpen, title, description, cancelText, confirmText, callBack} = props
  
  const cancelRef = React.useRef()

  const handleCallBack = (result = {})=> {
    callBack(result)
  }

  const handleConfirm = ()=> {
    handleCallBack({
      isConfirmed: true
    })
  }

  const handleCancel = ()=> {
    handleCallBack({
      isConfirmed: false
    })
  }

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={handleCallBack}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        {title && <AlertDialogHeader>{title}</AlertDialogHeader>}

        <AlertDialogCloseButton />

        {description && <AlertDialogBody>{description}</AlertDialogBody>}
        
        <AlertDialogFooter>
          <Button colorScheme='red' ref={cancelRef} onClick={handleCancel}>
            {cancelText || 'Cancelar'}
          </Button>
          <Button ml={3} onClick={handleConfirm}>
            {confirmText || 'Ok'}
          </Button>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal