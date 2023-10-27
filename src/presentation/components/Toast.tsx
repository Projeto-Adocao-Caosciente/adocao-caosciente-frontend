import React from 'react'
import { toast } from 'react-toastify'
import {
    FaInfo,
    FaCheck,
    FaExclamationTriangle,
    FaBug,
    FaExclamationCircle,
} from 'react-icons/fa'

export const displayIcon = (type) => {
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
    toast[type](
        <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
                {message}
            </div>
        </div>
    )

interface ToastPropTypes {
    message: string,
    type: any, // TODO: verificar tipo
}

ToastMessage.dismiss = toast.dismiss

export default ToastMessage
