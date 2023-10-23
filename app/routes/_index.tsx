import type { MetaFunction } from '@remix-run/node';
import styled from '@emotion/styled';
import { TestContext } from '~/test.context';

export const meta: MetaFunction = () => {
	return [
		{ title: 'OICT Remix Test' },
		{ name: 'description', content: 'OICT Remix Test' },
	];
};

export default function Index() {
	return (
		<div>
			<TestContext.Consumer>
				{value =>
					<>
						<StyledH1>{value}</StyledH1>
						<Paragraph>Tato stránka byla vykreslena na straně serveru za pomoci CSS-in-JS knihovny Emotion.js</Paragraph>
					</>
				}
			</TestContext.Consumer>
		</div>
	);
}

const StyledH1 = styled.h1`
	color: darkviolet;
	font-family: sans-serif;
	font-size: 72px;
`;

const Paragraph = styled.p`
	font-family: sans-serif;
`;
