'use client';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import {
	selectDropdownVariants,
	selectLiVariants,
} from '@/shared/lib/animations';
import { useOnClickOutside } from '@/shared/lib/hooks';

import { SelectSC } from './styled';

export interface SelectItem {
	id: string | number;
	title: string;
}

export interface SelectChangeData {
	selected: string;
	selectedId: string | number;
}

export interface SelectProps {
	list?: SelectItem[];
	onChange?: (data: SelectChangeData) => void;
	label?: string;
	placeholder?: string;
	className?: string;
}

export const Select = ({
	list,
	onChange,
	label,
	placeholder = 'Выберите вариант',
	className,
}: SelectProps) => {
	const [title, setTitle] = useState(
		list && list.length ? placeholder : 'Нет данных...',
	);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string | number | null>(null);
	const noItems = !list || !list.length;
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref, () => {
		if (isOpen) setIsOpen(false);
	});

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (noItems) return;

		const target = e.target as HTMLElement;
		const { type } = target.dataset;
		setIsOpen(!isOpen);

		if (type === 'item') {
			const newTitle = target.innerText;
			const idStr = target.dataset.id;
			if (idStr !== undefined) {
				const item = (list ?? []).find((i) => String(i.id) === idStr);
				const id = item?.id ?? idStr;
				setSelectedId(id);
				setTitle(newTitle);
				onChange?.({ selected: newTitle, selectedId: id });
			}
		}
	};

	return (
		<SelectSC
			{...{ ref, className }}
			$noItems={noItems}
			onClick={handleClick}
		>
			<div className="select-label">{label}</div>
			<div
				className={`select-block${isOpen ? ' open' : ''}`}
				data-type="title"
			>
				{title}
				<FontAwesomeIcon className="select-icon" icon={faChevronDown} />
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						variants={selectDropdownVariants}
						initial="close"
						animate={isOpen ? 'open' : 'close'}
						exit="close"
					>
						{(list ?? []).map((item) => (
							<motion.li
								variants={selectLiVariants}
								key={item.id}
								className={
									selectedId !== null &&
									String(selectedId) === String(item.id)
										? 'selected'
										: ''
								}
								data-id={String(item.id)}
								data-type="item"
							>
								{item.title}
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</SelectSC>
	);
};
