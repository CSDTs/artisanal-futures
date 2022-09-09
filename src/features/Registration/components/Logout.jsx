import { Button, chakra, Flex, FormControl, Heading, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";

export default function Logout() {
	const navigate = useNavigate();
	return (
		<Stack
			spacing={4}
			w={"full"}
			maxW={"md"}
			bg={useColorModeValue("white", "gray.700")}
			rounded={"xl"}
			boxShadow={"lg"}
			p={6}
			my={12}>
			<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
				Logout first?
			</Heading>
			<Text fontSize={{ base: "sm", sm: "md" }} color={useColorModeValue("gray.800", "gray.400")}>
				You are currently signed in as{" "}
				<chakra.span fontWeight={600}>{AuthService.getCurrentUser().user_nicename}</chakra.span>. Logout first to
				continue.
			</Text>

			<Stack spacing={6} direction={["column", "row"]}>
				<Button
					bg={"red.400"}
					color={"white"}
					w="full"
					onClick={() => navigate("/")}
					_hover={{
						bg: "red.500",
					}}>
					Cancel
				</Button>
				<Button
					bg={"blue.400"}
					color={"white"}
					w="full"
					onClick={() => {
						AuthService.logout();
					}}
					_hover={{
						bg: "blue.500",
					}}>
					Logout
				</Button>
			</Stack>
		</Stack>
	);
}
