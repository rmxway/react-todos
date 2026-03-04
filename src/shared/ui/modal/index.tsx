import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

import { fadein, modalItem } from '@/shared/lib/animations';

import {
	Close,
	ModalBody,
	ModalTitle,
	ModalWindow,
	ModalWrapper,
} from './styled';

export interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	body?: React.ReactNode;
	noClose?: boolean;
	width?: string;
	className?: string;
}

export const Modal = ({
	open,
	onClose,
	title,
	body,
	noClose,
	width = '400px',
	className,
}: ModalProps) => {
	const modalRef = useRef<HTMLElement>(null);

	const handleClickOut = (e: React.MouseEvent) => {
		if (e.target === modalRef.current) {
			e.stopPropagation();
			onClose();
		}
	};

	return (
		<AnimatePresence mode="wait">
			{open && (
				<ModalWrapper
					variants={fadein}
					initial="hidden"
					animate="visible"
					exit="exit"
					ref={modalRef}
					onClick={handleClickOut}
					{...{ className }}
				>
					<ModalWindow variants={modalItem} {...{ width }}>
						{title && <ModalTitle>{title}</ModalTitle>}
						{body && <ModalBody>{body}</ModalBody>}
						{!noClose && <Close onClick={onClose}>&times;</Close>}
					</ModalWindow>
				</ModalWrapper>
			)}
		</AnimatePresence>
	);
};
