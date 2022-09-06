import {
	Box,
	Button,
	chakra,
	Container,
	createIcon,
	Flex,
	Heading,
	HStack,
	Icon,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function UpdateProfileCard() {
	const navigate = useNavigate();
	return (
		<>
			<Flex px={4} py={32} mx="auto">
				<Container maxWidth={"6xl"}>
					<Box mx="auto">
						<chakra.h1
							mb={3}
							fontSize={{
								base: "3xl",
								md: "4xl",
							}}
							fontWeight="bold"
							lineHeight="shorter"
							color="gray.900"
							_dark={{
								color: "white",
							}}>
							Welcome to Artisanal Futures!
						</chakra.h1>
						<chakra.p
							mb={5}
							color="gray.500"
							fontSize={{
								md: "lg",
							}}>
							Your next step is to update your profile, and establish your store on the site.
						</chakra.p>
						<HStack>
							<Button
								as="a"
								w={{
									base: "full",
									sm: "auto",
								}}
								bg={"blue.400"}
								colorScheme="brand"
								size="lg"
								mb={{
									base: 2,
									sm: 0,
								}}
								cursor="pointer"
								onClick={() => navigate("/update-profile")}>
								Update profile
							</Button>
							<Button
								as="a"
								w={{
									base: "full",
									sm: "auto",
								}}
								mb={{
									base: 2,
									sm: 0,
								}}
								variant={"link"}
								size="md"
								cursor="pointer"
								onClick={() => navigate("/")}>
								Nah, I'll do this later
							</Button>
						</HStack>
					</Box>
				</Container>
			</Flex>
		</>
	);
}
