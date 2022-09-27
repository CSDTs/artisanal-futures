import { Box, Container, Flex, Image, Link, SimpleGrid, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
const ListHeader = ({ children }) => {
	return (
		<Text fontWeight={"500"} fontSize={"lg"} mb={2}>
			{children}
		</Text>
	);
};

export default function Footer() {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<Box
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
			mt={location.pathname == "/login" ? "0" : "4rem"}
			pt={location.pathname == "/login" ? "4rem" : "0"}>
			<Container as={Stack} maxW={"6xl"} py={10}>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
					<Stack align={"flex-start"}>
						<ListHeader>Products</ListHeader>
						<Link onClick={() => navigate("/products")}>All</Link>
						<Link onClick={() => navigate("/artisans")}>Artisans</Link>
						<Link onClick={() => navigate("/tools")}>Tools</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>The Collective</ListHeader>
						<Link href={"#"}>About Us</Link>
						<Link onClick={() => navigate("/registration")}>Become an Artisan</Link>
						<Link onClick={() => navigate("/registration")}>Contact Us</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>Legal</ListHeader>
						<Link onClick={() => navigate("/agreement")}>The Artisanal Futures Collective Agreement</Link>
						<Link onClick={() => navigate("/policies/privacy")}>Privacy Policy</Link>
						<Link onClick={() => navigate("/policies/terms-of-service")}>Terms of Service</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>Follow Us</ListHeader>
						<Link href={"#"}>Facebook</Link>
						<Link href={"#"}>Twitter</Link>
						<Link href={"#"}>Instagram</Link>
					</Stack>
				</SimpleGrid>
			</Container>
			<Box py={10}>
				<Flex
					align={"center"}
					_before={{
						content: '""',
						borderBottom: "1px solid",
						borderColor: useColorModeValue("gray.200", "gray.700"),
						flexGrow: 1,
						mr: 8,
					}}
					_after={{
						content: '""',
						borderBottom: "1px solid",
						borderColor: useColorModeValue("gray.200", "gray.700"),
						flexGrow: 1,
						ml: 8,
					}}>
					<Image src={"/img/logo.png"} h={7} />
				</Flex>
				<Text pt={6} fontSize={"sm"} textAlign={"center"}>
					© 2022 Artisanal Futures. All rights reserved
				</Text>
			</Box>
		</Box>
	);
}
