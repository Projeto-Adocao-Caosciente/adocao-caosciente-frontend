import React from 'react'
import toast from '../components/Toast'
import { ToastTypes } from '../components/Toast'

export default function useNotify() {
    const notify = React.useCallback((type: ToastTypes, message: string) => {
        toast({ type, message })
    }, [])

    const dismiss = React.useCallback(() => {
        toast.dismiss()
    }, [])

    return {notify, dismiss}
}
