import Swal from "sweetalert2";

export default function SuccessAlert(msg) {
  Swal.fire({
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
}