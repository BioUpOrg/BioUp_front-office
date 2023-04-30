import Swal from "sweetalert2";

export default function ErrorAlert(msg) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
    });
  }