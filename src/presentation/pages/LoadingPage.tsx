import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function LoadingPage() {
    return (
        <main className={'w-full h-full flex items-center justify-center'}>
            <Spinner size={'lg'} />
        </main>
    )
}
