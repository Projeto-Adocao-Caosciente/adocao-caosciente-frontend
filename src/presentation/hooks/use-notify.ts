import React from 'react'
import toast from '../components/Toast'

export default function useNotify() {
    const notify = React.useCallback((type: string, message: string) => {
        toast({ type, message })
    }, [])

    const dismiss = React.useCallback(() => {
        toast.dismiss()
    }, [])

    return {notify, dismiss}
}
