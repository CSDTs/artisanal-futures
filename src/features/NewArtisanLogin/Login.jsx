import { useState, useEffect, useRef } from "react";

import AuthService from "../../services/auth.service";
import axios from "axios";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	useDisclosure,
	CloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Login({ setApproval, setArtisan }) {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
	const logInUser = () => {
		AuthService.login({ username, password })
			.then(() => {
				let artisan = JSON.parse(localStorage.getItem("user"));

				AuthService.getUserInformation().then((data) => {
					artisan = { ...artisan, ...data[0].acf };
					setArtisan(artisan);
				});

				// if (JSON.parse(localStorage.getItem("user")?.user_email)) {

				// }
				// navigate("/");
				// window.location.reload();
			})
			.catch(() => {
				console.error("Nope, not going to happen");
				onOpen();
			});
	};

	const populateData = () => {
		setUserName("ahunn");
		setPassword("DTp4IWqQG)bF8m#x%qrgW!4U");
	};
	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool <Link color={"blue.400"}>features</Link> <Link onClick={populateData}>✌️</Link>
					</Text>
				</Stack>

				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						{isVisible && (
							<Alert status="error">
								<AlertIcon />
								<Box>
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										Your login information was either incorrect, or you were not added as one of our artisans. Please
										try again
									</AlertDescription>
								</Box>
								<CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose} />
							</Alert>
						)}
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input type="email" onChange={(e) => setUserName(e.target.value)} />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input type="password" onChange={(e) => setPassword(e.target.value)} />
						</FormControl>
						<Stack spacing={10}>
							<Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
								<Checkbox>Remember me</Checkbox>
								<Link color={"blue.400"}>Forgot password?</Link>
							</Stack>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={logInUser}
							>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
