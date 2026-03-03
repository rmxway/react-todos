import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectDropdownVariants, selectLiVariants } from '@/styles/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks';

import { SelectSC } from './styled';

interface SelectItem {
	id: string | number;
	title: string;
}

interface SelectProps {
	list?: SelectItem[];
	onChange?: (data: { selected: string }) => void;
	label?: string;
	placeholder?: string;
}

export const Select = ({
	list,
	onChange,
	label,
	placeholder = 'Выберите вариант',
}: SelectProps) => {
	const [title, setTitle] = useState(
		list && list.length ? placeholder : 'Нет данных...',
	);
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<number | null>(null);
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
			const { id } = target.dataset;
			if (id !== undefined) {
				setSelected(+id);
				setTitle(newTitle);
				onChange?.({ selected: newTitle });
			}
		}
	};

	return (
		<SelectSC ref={ref} onClick={handleClick} noItems={noItems}>
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
						exit="exit"
					>
						{(list ?? []).map((item, idx) => (
							<motion.li
								variants={selectLiVariants}
								key={item.id}
								className={selected === idx ? 'selected' : ''}
								data-id={idx}
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
