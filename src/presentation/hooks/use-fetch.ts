import { useState } from 'react'

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
export function useFetch<T = unknown>(
    fn: (...args: any[]) => Promise<T>
): {
    fetch: (...args: any[]) => Promise<void>
    state: State<T>
} {
    const initialState: State<T> = {
        error: undefined,
        data: undefined,
        status: Status.idle,
    }

    const [state, setState] = useState(initialState)

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

    return { fetch, state }
}
