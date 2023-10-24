import { useEffect, useState } from 'react'

export default function useDimensions() {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
        scroll: window.scrollY,
    });

    useEffect(() => {
        function updateDimensions() {
            setDimensions({
                ...dimensions,
                width: window.innerWidth,
                scroll: window.scrollY,
            })
        };

        window.addEventListener('scroll', updateDimensions);
        window.addEventListener('resize', updateDimensions);
        updateDimensions();
        return () => {
            window.removeEventListener('scroll', updateDimensions);
            window.removeEventListener('resize', updateDimensions);
        }
        // eslint-disable-next-line
    }, []);

    return {
        dimensions
    }

}