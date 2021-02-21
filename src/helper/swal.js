import Swal from 'sweetalert2'

const alerting = {
    methods: {
        alertDanger (message) {
            Swal.fire({
                icon: 'error',
                iconHtml: '<i style="font-size: 50px" class="fas fa-exclamation"></i>',
                title: 'Oops...',
                text: message,
            })
        },
        alertQuestion (message) {
            return new Promise((resolve) => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: message,
                    icon: 'warning',
                    iconHtml: '<i  style="font-size: 50px" class="fas fa-question"></i>',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sure!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        resolve(true)
                    }
                })
            })
        },
        toastDanger: (message) => {
            const Toast = Swal.fire({
                icon: 'error',
                text: message,
              })
            return Toast;
        },
        toastSuccess (message) {
            const Toast = Swal.fire({
                icon: 'success',
                text: message,
              })
              return Toast; 
        }
    }
}
export default alerting