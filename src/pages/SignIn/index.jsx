import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Checkbox,
	CloseButton,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import AuthService from "../../services/auth.service";

export default function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
	const logInUser = () => {
		setIsLoading(true);
		AuthService.loginAlt({ username, password })
			.then(() => {
				AuthService.setProfileImage()
					.catch(() => {
						console.error("Error setting profile image");
					})
					.finally(() => {
						navigate("/profile");
						window.location.reload();
					});
			})
			.catch(() => {
				console.error("Error logging in");
				setIsLoading(false);
				onOpen();
			});
	};

	const populateData = () => {
		setUserName(import.meta.env.VITE_TEST_USERNAME);
		setPassword(import.meta.env.VITE_TEST_PASS);
	};

	useEffect(() => {
		if (AuthService.getCurrentUser()) navigate("/profile");
	}, []);

	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
			{!isLoading && (
				<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
					<Stack align={"center"}>
						<Heading fontSize={"4xl"}>Sign in to your account</Heading>
						<Text fontSize={"lg"} color={"gray.600"}>
							to customize your profile and store <Link onClick={populateData}>✌️</Link>
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
									onClick={logInUser}>
									Sign in
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			)}
			<Loading isLoading={isLoading} />
		</Flex>
	);
}
