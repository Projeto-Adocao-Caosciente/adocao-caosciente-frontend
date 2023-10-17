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
  fn: () => Promise<T>
): {
  fetch: () => Promise<void>
  state: State<T>
} {
  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    status: Status.idle,
  }

  const [state, setState] = useState(initialState)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetch(): Promise<void> {
    setState({
      status: Status.loading,
    })

    try {
      const result = await fn()

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
