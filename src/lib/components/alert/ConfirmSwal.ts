import Swal from "sweetalert2";

export default function ConfirmSwal(msg: string) {
  return Swal.fire({
    title: "Confirmation",
    titleText: msg,
    showDenyButton: true,
    focusConfirm: true,
  });
}
