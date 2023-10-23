import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import React, { useContext, useEffect, useRef } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { withEmotionCache } from '@emotion/react';

import ClientStyleContext from '~/styles/client.context';
import ServerStyleContext from '~/styles/server.context';
import { TestContext } from '~/test.context';

export const meta: MetaFunction = () => ([{
	charset: 'utf-8',
	title: 'OICT Remix Test',
	viewport: 'width=device-width,initial-scale=1',
}]);

interface DocumentProps {
	children: React.ReactNode;
	title?: string;
}

const Document = withEmotionCache(
	({ children, title }: DocumentProps, emotionCache) => {
		const serverStyleData = useContext(ServerStyleContext);
		const clientStyleData = useContext(ClientStyleContext);
		const reinjectStylesRef = useRef(true);

		useEffect(() => {
			if (!reinjectStylesRef.current) {
				return;
			}

			emotionCache.sheet.container = document.head;

			const tags = emotionCache.sheet.tags;
			emotionCache.sheet.flush();
			tags.forEach((tag) => {
				(emotionCache.sheet as any)._insertTag(tag);
			});

			clientStyleData.reset();
			reinjectStylesRef.current = false;
		}, [clientStyleData, emotionCache.sheet]);

		return (
			<html lang="en">
			<head>
				{title ? <title>{title}</title> : null}
				<Meta/>
				<Links/>
				{serverStyleData?.map(({ key, ids, css }) => (
					<style
						key={key}
						data-emotion={`${key} ${ids.join(' ')}`}
						dangerouslySetInnerHTML={{ __html: css }}
					/>
				))}
			</head>
			<body>
			<TestContext.Provider value="some value">
				{children}
			</TestContext.Provider>
			<ScrollRestoration/>
			<Scripts/>
			<LiveReload/>
			</body>
			</html>
		);
	},
);

export default function App() {
	return (
		<Document>
			<Outlet/>
		</Document>
	);
}
