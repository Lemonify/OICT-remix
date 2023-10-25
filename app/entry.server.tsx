import type { AppLoadContext, EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
// import createEmotionServer from '@emotion/server/create-instance';
// import createEmotionCache from '~/styles/createEmotionCache';
// import ServerStyleContext from '~/styles/server.context';
// import { CacheProvider } from '@emotion/react';

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
	loadContext: AppLoadContext,
) {
	// EMOTION.JS
	// const cache = createEmotionCache();
	// const { extractCriticalToChunks } = createEmotionServer(cache);

	// const html = renderToString(
	// 	<ServerStyleContext.Provider value={null}>
	// 		<CacheProvider value={cache}>
	// 			<RemixServer context={remixContext} url={request.url}/>
	// 		</CacheProvider>
	// 	</ServerStyleContext.Provider>,
	// );

	const sheet = new ServerStyleSheet();
	let markup = renderToString(
		sheet.collectStyles(
			<RemixServer
				context={remixContext}
				url={request.url}
			/>
		)
	);

	const styles = sheet.getStyleTags();
	markup = markup.replace('__STYLES__', styles);

	responseHeaders.set('Content-Type', 'text/html');

	return new Response(`<!DOCTYPE html>${markup}`, {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}
