import {toast} from 'react-toastify'
function validateForm (item, length) {
    if(!item){
        toast.warning(`Please, input ${item}`)
        return
    }
    if(item.length < length){
        toast.warning(`${item} is too short`)
    }
}

export default {validateForm};