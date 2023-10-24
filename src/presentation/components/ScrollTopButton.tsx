import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ChevronUp from '../assets/ChevronUp'
import useDimensions from '../hooks/use-dimensions'

export default function ScrollTopButton() {
    const { dimensions } = useDimensions()
    const [controller, setController] = useState(false)
    const handleScroll = () => window.scrollTo({ top: 0, behavior: 'smooth' })
    
    useEffect(() => {
        if (dimensions.scroll > 300) {
            setController(true)
        } else {
            setController(false)
        }
    }, [dimensions.scroll])
    
    const defaultCSS = 'fixed bottom-8 right-8'
    return (
        <>
            {controller && (
                <Button
                    isIconOnly
                    style={{ display: 'flex', justifyContent: 'center' }}
                    startContent={<ChevronUp />}
                    color="primary"
                    variant="solid"
                    size="lg"
                    className={`${defaultCSS}`}
                    onClick={handleScroll}
                />
            )}
        </>
    )
}
