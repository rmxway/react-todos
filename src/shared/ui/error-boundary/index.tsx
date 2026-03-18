'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import { Button } from '@/shared/ui';

import { ErrorFallbackWrapper, ErrorMessage, ErrorTitle } from './styled';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
		// Error logged to state for fallback display
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError && this.state.error) {
			return (
				<ErrorFallbackWrapper>
					<ErrorTitle>Что-то пошло не так</ErrorTitle>
					<ErrorMessage>{this.state.error.message}</ErrorMessage>
					<Button $variant="primary" onClick={this.handleReset}>
						Обновить
					</Button>
				</ErrorFallbackWrapper>
			);
		}

		return this.props.children;
	}
}
