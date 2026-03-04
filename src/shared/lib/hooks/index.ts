import { useCallback, useEffect, useState } from 'react';

export const useWidth = (): [
	(node: HTMLElement | null) => void,
	number | undefined,
] => {
	const [element, setElement] = useState<HTMLElement | null>(null);
	const [width, setWidth] = useState<number | undefined>();

	const ref = useCallback((node: HTMLElement | null) => {
		setElement(node);
	}, []);

	useEffect(() => {
		if (!element) return;
		const updateWidth = () => setWidth(element.clientWidth);
		updateWidth();
		const ro = new ResizeObserver(updateWidth);
		ro.observe(element);
		return () => ro.disconnect();
	}, [element]);

	return [ref, width];
};

export const useOnClickOutside = (
	ref: React.RefObject<HTMLElement | null>,
	handler: (event: MouseEvent | TouchEvent) => void,
) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
};
