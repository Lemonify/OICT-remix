import type { MetaFunction } from '@remix-run/node';
import { styled } from 'styled-components';
import { TestContext } from '~/test.context';
import { Card } from '@oict/standard-design-prague';

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
					<StyledCard>
						<StyledH1>{value}</StyledH1>
						<Paragraph>Tato stránka byla vykreslena na straně serveru za pomoci CSS-in-JS knihovny Emotion.js</Paragraph>
					</StyledCard>
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

const StyledCard = styled(Card)`
	box-shadow: 0 0 50px black;
` as typeof Card;
