import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, chakra, Flex, Heading, Link, Text } from "@chakra-ui/react";

export default function UndergoingMaintenance({ user }) {
	return (
		<Box textAlign="center" py={10} px={6}>
			<Box display="inline-block">
				<Flex
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					bg={"red.500"}
					rounded={"50px"}
					w={"55px"}
					h={"55px"}
					textAlign="center">
					<CloseIcon boxSize={"20px"} color={"white"} />
				</Flex>
			</Box>
			<Heading as="h2" size="xl" mt={6} mb={2}>
				Account Setup Undergoing Maintenance
			</Heading>
			<Text color={"gray.500"}>
				Hey,{" "}
				<chakra.span color={"blue.500"} fontWeight="500">
					{user?.user_display_name.split(" ")[0]}
				</chakra.span>
				! It seems like you were granted access to Artisanal Futures, with the next step being setting up your profile
				and store on the site. However, that service is temporarily down for maintenance. Check back later to finish
				setting up your account. If you have any questions, please let us know at{" "}
				<Link href={`email:${import.meta.env.VITE_SITE_EMAIL}`} color={"teal.500"} fontWeight="bold">
					{import.meta.env.VITE_SITE_EMAIL}
				</Link>
			</Text>
			<Button mt={8} colorScheme={"teal"} onClick={() => navigate("/")}>
				Back to Homepage
			</Button>
		</Box>
	);
}
