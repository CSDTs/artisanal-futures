import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

interface IProps {
	title: string;
	subtitle: string;
}
const PageHeading: FC<IProps> = ({ title, subtitle }) => {
	return (
		<>
			<Heading mb={6}>{title}</Heading>
			<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
				{subtitle}
			</Text>
		</>
	);
};

export default PageHeading;
