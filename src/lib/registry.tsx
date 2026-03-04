'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

interface StyledRegistryProps {
	children: React.ReactNode;
}

export function StyledComponentsRegistry({ children }: StyledRegistryProps) {
	const [sheet] = useState(() => new ServerStyleSheet());

	try {
		useServerInsertedHTML(() => {
			const styles = sheet.getStyleElement();
			sheet.instance.clearTag();
			return <>{styles}</>;
		});

		if (typeof window !== 'undefined') {
			return <>{children}</>;
		}

		return (
			<StyleSheetManager sheet={sheet.instance}>
				<>{children}</>
			</StyleSheetManager>
		);
	} catch (error) {
		throw new Error((error as Error).message);
	} finally {
		sheet.instance.clearTag();
	}
}

export default StyledComponentsRegistry;
