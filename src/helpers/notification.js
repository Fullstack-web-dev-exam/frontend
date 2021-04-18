import { toast } from 'react-toastify'

function notifySuccess(message) {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

//Part of 'react-toastify'
function notifyError(message){
    toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export { notifySuccess, notifyError };