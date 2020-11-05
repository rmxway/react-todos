import { useEffect, useState } from 'react';

export const useWidth = (element) => {
    const [width, setWidth] = useState(element?.clientWidth);

    useEffect(() => {
        setWidth(element?.clientWidth);

        const resizeHandler = () => setWidth(element?.clientWidth);
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [element]);

    return width;
};
