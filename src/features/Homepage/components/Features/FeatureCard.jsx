import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function FeatureCard({ title, text, icon, onClick }) {
	return (
		<Box
			role="group"
			bg={"white"}
			pt={"2rem"}
			pb={"2rem"}
			h={"100%"}
			textAlign="center"
			minH={"100%"}
			onClick={onClick}
			cursor={"pointer"}
			_groupHover={{
				boxShadow: "md",
				bg: "gray.100",
			}}>
			<Stack minH={"100%"}>
				<Flex w={"100%"} h={16} align={"center"} justify={"center"} rounded={"full"} mb={1} minH={"100%"}>
					{icon}
				</Flex>
				<Heading
					fontWeight={700}
					_groupHover={{
						color: "gray.700",
					}}
					color={"gray.800"}>
					{title}
				</Heading>
				<Text color={"gray.500"}>{text}</Text>
			</Stack>
		</Box>
	);
}
FeatureCard.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
	icon: PropTypes.element,
	onClick: PropTypes.func,
};

export default FeatureCard;
