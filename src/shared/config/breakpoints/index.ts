import { css, Interpolation } from 'styled-components';

const sizes = {
	xs: '450px',
	sm: '700px',
	md: '1000px',
	lg: '1350px',
} as const;

type Breakpoint = keyof typeof sizes;

const createMedia =
	(type: 'min' | 'max') =>
	(size: Breakpoint) =>
	(
		strings: TemplateStringsArray,
		...interpolations: Interpolation<object>[]
	) => css`
		@media (${type === 'min' ? 'min' : 'max'}-width: ${sizes[size]}) {
			${css(strings, ...interpolations)}
		}
	`;

export const breakpoints = {
	lessThan: createMedia('max'),
	greaterThan: createMedia('min'),
};
