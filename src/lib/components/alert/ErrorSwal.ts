import Swal from "sweetalert2";

export default function ErrorSwal(e:string){
    return Swal.fire("Error Occur", e, "error")
}