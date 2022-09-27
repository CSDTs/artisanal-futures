import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import faq from "../data/markdown/faq.md";
import privacy from "../data/markdown/privacy.md";
import tos from "../data/markdown/tos.md";
import { LoadContainer, PageHeading } from "../layout";
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
const PolicyInformation = () => {
	const { name } = useParams();

	const [text, setText] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (name && name in policies)
			fetch(policies[name].data)
				.then((response) => response.text())
				.then((text) => {
					setText(text);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsError(true);
					console.error(error);
				});
		else {
			setIsLoading(false);
			setText();
		}
	}, [name]);

	const navigate = useNavigate();
	return (
		<LoadContainer isLoading={isLoading} isError={isError}>
			{/* eslint-disable-next-line react/no-children-prop */}
			<ReactMarkdown components={ChakraUIRenderer()} children={text} skipHtml />
			{!text && (
				<>
					<PageHeading
						title={"Artisanal Futures Legal Policies"}
						subtitle={"Take a look at our policies and guidelines"}
					/>
					<UnorderedList>
						{Object.keys(policies).map((policy) => (
							<ListItem key={policy}>
								<Button variant="link" onClick={() => navigate(`/policies/${policy}`)}>
									{policies[policy].name}
								</Button>
							</ListItem>
						))}
					</UnorderedList>
				</>
			)}
		</LoadContainer>
	);
};

export default PolicyInformation;
