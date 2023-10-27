import React from 'react'
import { toast } from 'react-toastify'
import {
    FaInfo,
    FaCheck,
    FaExclamationTriangle,
    FaBug,
    FaExclamationCircle,
} from 'react-icons/fa'

type ToastTypes = 'success' | 'info' | 'error' | 'warning' 

interface ToastPropTypes {
    message: string,
    type: ToastTypes, // TODO: verificar tipo
}

export const displayIcon = (type: ToastTypes) => {
    switch (type) {
        case 'success':
            return <FaCheck />
        case 'info':
            return <FaInfo />
        case 'error':
            return <FaExclamationCircle />
        case 'warning':
            return <FaExclamationTriangle />
        default:
            return <FaBug />
    }
}

const ToastMessage = ({ type, message }: ToastPropTypes) =>
toast[type as ToastTypes](
        <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
                {message}
            </div>
        </div>
    )
    

ToastMessage.dismiss = toast.dismiss

export default ToastMessage
