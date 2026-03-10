import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { fadein, modalItem } from '@/shared/lib/animations';
import { useBodyScrollLock, useOnClickOutside } from '@/shared/lib/hooks';

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
	const contentRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(contentRef, onClose);
	useBodyScrollLock(open);

	return createPortal(
		<AnimatePresence mode="wait">
			{open && (
				<ModalWrapper
					variants={fadein}
					initial="hidden"
					animate="visible"
					exit="exit"
					{...{ className }}
				>
					<ModalWindow
						ref={contentRef}
						variants={modalItem}
						$width={width}
					>
						{title && <ModalTitle>{title}</ModalTitle>}
						{body && <ModalBody>{body}</ModalBody>}
						{!noClose && <Close onClick={onClose}>&times;</Close>}
					</ModalWindow>
				</ModalWrapper>
			)}
		</AnimatePresence>,
		document.body,
	);
};
