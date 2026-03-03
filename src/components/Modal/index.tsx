import { fadein, modalItem } from '@/styles/animations';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

import {
	Close,
	ModalBody,
	ModalTitle,
	ModalWindow,
	ModalWrapper,
} from './styled';

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	body?: React.ReactNode;
	noClose?: boolean;
}

export const Modal = ({ open, onClose, title, body, noClose }: ModalProps) => {
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
				>
					<ModalWindow variants={modalItem} width="400px">
						{title && <ModalTitle>{title}</ModalTitle>}
						{body && <ModalBody>{body}</ModalBody>}
						{!noClose && <Close onClick={onClose}>&times;</Close>}
					</ModalWindow>
				</ModalWrapper>
			)}
		</AnimatePresence>
	);
};
