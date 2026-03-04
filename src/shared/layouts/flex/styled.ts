import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export interface FlexProps {
	direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	justify?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
	gap?: string | number;
	wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
	children?: React.ReactNode;
	className?: string;
}

export const StyledFlex = styled(motion.div)<FlexProps>`
	display: flex;

	${(props) =>
		props.direction &&
		css`
			flex-direction: ${props.direction};
		`}

	${(props) =>
		props.justify &&
		css`
			justify-content: ${props.justify};
		`}

    ${(props) =>
		props.align &&
		css`
			align-items: ${props.align};
		`}

    ${(props) =>
		props.gap &&
		css`
			gap: ${typeof props.gap === 'number'
				? `${props.gap}px`
				: props.gap};
		`}

    ${(props) =>
		props.wrap &&
		css`
			flex-wrap: ${props.wrap};
		`}
`;
