import { AnimatePresence } from 'framer-motion';

import { alertMotion } from '@/shared/lib/animations';

import { AlertSC, CloseButton } from './styled';

export interface AlertProps {
	visible: boolean;
	type?: 'success' | 'danger' | 'warning';
	text: string;
	onClose: () => void;
	className?: string;
}

export const Alert = ({
	visible,
	type = 'warning',
	text,
	onClose,
	className,
}: AlertProps) => {
	return (
		<AnimatePresence initial={false}>
			{visible && (
				<AlertSC
					$type={type}
					layout
					{...alertMotion}
					{...{ className }}
				>
					{text}
					<CloseButton type="button" onClick={onClose}>
						<span>&times;</span>
					</CloseButton>
				</AlertSC>
			)}
		</AnimatePresence>
	);
};
