import { useCallback, useEffect, useRef, useState } from 'react';

export const useBodyScrollLock = (locked: boolean) => {
	const scrollYRef = useRef(0);

	useEffect(() => {
		if (locked) {
			scrollYRef.current = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollYRef.current}px`;
			document.body.style.left = '0';
			document.body.style.right = '0';
		} else {
			const scrollY = scrollYRef.current;
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.left = '';
			document.body.style.right = '';
			window.scrollTo(0, scrollY);
		}
		return () => {
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.left = '';
			document.body.style.right = '';
			window.scrollTo(0, scrollYRef.current);
		};
	}, [locked]);
};

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
		const updateWidth = () => {
			const newWidth = element.clientWidth;
			setWidth((prev) => (prev !== newWidth ? newWidth : prev));
		};
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
