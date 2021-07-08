import {PaymentMethod} from './../constants/';
import axios from './../../helpers/axios'
export const verifyQrCodePayment = (_id) => {
    return async(dispatch) => {
        try{
            const res = await axios.post('/verify-customer-id', {_id});
            if(res.status == 200){
                console.log("The Data", res.data.customer);
                return {result: true, data: res.data.customer}
            }else{
                return {result: false, message: 'invalid Information'};
            }
           

        }catch(e) {
            return {result: false, message: 'Something went Wrong'};
        }
    }
}  

export const verifyQrCodePaymentPassword = (info) => {
    return async(dispatch) => {
        try{
            const res = await axios.post('/verify-customer-Qrcode-password', {...info});
            if(res.status == 200){
                return {result: true, message: 'Valid Password' }
            }else{
                return {result: false, message: 'invalid Password'};
            }
           

        }catch(e) {
            return {result: false, message: 'Something went Wrong'};
        }
    }
}  