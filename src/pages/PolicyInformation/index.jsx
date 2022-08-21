import { Container, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import faq from "../../data/markdown/faq.md";
import privacy from "../../data/markdown/privacy.md";
import tos from "../../data/markdown/tos.md";
const policies = {
	"terms-of-service": {
		name: "Terms of Service",
		data: tos,
	},
	privacy: {
		name: "Privacy Policy",
		data: privacy,
	},
	faq: {
		name: "Frequently Asked Questions",
		data: faq,
	},
};
export default function PolicyInformation() {
	const { name } = useParams();

	const [text, setText] = useState();

	useEffect(() => {
		if (name && name in policies)
			fetch(policies[name].data)
				.then((response) => response.text())
				.then((text) => {
					setText(text);
				})
				.catch((error) => {});
		else {
			setText();
		}
	}, [name]);

	const navigate = useNavigate();
	return (
		<Container maxW={"6xl"} mt={6}>
			<ReactMarkdown components={ChakraUIRenderer()} children={text} skipHtml />
			{!text && (
				<>
					<Heading>Artisanal Futures Legal Policies</Heading>

					<UnorderedList>
						{Object.keys(policies).map((policy) => (
							<ListItem key={policy}>
								<Link onClick={() => navigate(`/policies/${policy}`)}>{policy}</Link>
							</ListItem>
						))}
					</UnorderedList>
				</>
			)}
		</Container>
	);
}
