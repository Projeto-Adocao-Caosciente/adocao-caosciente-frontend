import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export enum Status {
    idle,
    loading,
    error,
    success,
}
export interface State<T> {
    data?: T
    error?: Error
    status: Status
}

type UseFetchParams<T = unknown> = {
    fn: (...args: any[]) => Promise<T>
    loadingListener?: (() => void) | null
    errorListener?: ((error?: Error) => void) | null
    successListener?: ((data?: T) => void) | null
    idleListener?: (() => void) | null
}

export function useFetch<T = unknown>({
    fn,
    loadingListener = null,
    errorListener = null,
    successListener = null,
    idleListener = null,
}: UseFetchParams<T>): {
    fetch: (...args: any[]) => Promise<void>
    state: State<T>
    isLoading: () => boolean
    hasError: () => boolean
    hasSucceeded: () => boolean
    isIdle: () => boolean
    setIdle: () => void
} {
    const initialState: State<T> = {
        error: undefined,
        data: undefined,
        status: Status.idle,
    }

    const [state, setState] = useState(initialState)

    useEffect(() => {
        switch (state.status) {
            case Status.idle:
                if (idleListener) {
                    idleListener()
                }
                break
            case Status.loading:
                if (loadingListener) {
                    loadingListener()
                }
                break
            case Status.error:
                if (errorListener) {
                    errorListener(state.error)
                }
                break
            case Status.success:
                if (successListener) {
                    successListener()
                }
                break
        }
    }, [state.status])

    const isLoading = () => state.status === Status.loading
    const hasError = () => state.status === Status.error
    const hasSucceeded = () => state.status === Status.success
    const isIdle = () => state.status === Status.idle
    const setIdle = () => {
        setState({
            data: undefined,
            status: Status.idle,
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetch(...args: any[]): Promise<void> {
        setState({
            status: Status.loading,
        })

        try {
            const result = await fn(...args)

            setState({
                data: result,
                status: Status.success,
            })
        } catch (e) {
            setState({
                status: Status.error,
                error: e as Error,
            })
        }
    }

    return { fetch, state, isLoading, hasError, hasSucceeded, isIdle, setIdle }
}
