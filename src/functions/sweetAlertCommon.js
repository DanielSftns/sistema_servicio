import Swal from "sweetalert2"

const SwalModal = Swal.mixin({
  focusCancel: true,
  showCloseButton: true,
  showCancelButton: true,
  cancelButtonText: 'Cancelar',
})

export {
  SwalModal
}