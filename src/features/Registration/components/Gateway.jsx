import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ProfileService from "../../Profile/services/profile.service";
import RegistrationService from "../services/registration.service";
import CustomFormContainer from "./CustomFormContainer";
export default function Gateway() {
	const [isProcessing, setIsProcessing] = useState(false);
	const navigate = useNavigate();
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
	const handleOnSubmit = (e) => {
		e.preventDefault();
		setIsProcessing(true);
		const temp = {
			username: e.target.elements.username.value,
			password: e.target.elements.password.value,
		};
		console.log(temp);
		RegistrationService.createNewUser(e.target.elements)
			.then((data) => {
				console.log(data);
				onClose();
				setIsProcessing(false);
				if (data.jwt) {
					RegistrationService.login({
						username: temp.username,
						password: temp.password,
					}).then(() => {
						ProfileService.createMembershipId().then((data) => {
							AuthService.updateCurrentUser({ membership_id: data.id });
							navigate("/profile");
							window.location.reload();
						});
					});
				}
			})
			.catch((err) => {
				console.error(
					err?.response?.data?.data?.message || "There was an error processing your request. Please try again later."
				);
				onOpen();
				setIsProcessing(false);
			});

		e.target.reset();
	};

	return (
		<CustomFormContainer handleOnSubmit={handleOnSubmit}>
			{isVisible ? (
				<Alert status="error">
					<AlertIcon />
					<Box>
						<AlertTitle>{"Error"}</AlertTitle>
						<AlertDescription>
							{"There was an error processing your request. Please try again later. "}
						</AlertDescription>
					</Box>
					<CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose} />
				</Alert>
			) : (
				""
			)}
			<FormControl isRequired>
				<FormLabel>Username</FormLabel>

				<InputGroup>
					<InputLeftElement children={<BsPerson />} />
					<Input type="text" name="username" placeholder="eg. jsmith" />
				</InputGroup>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Email</FormLabel>

				<InputGroup>
					<InputLeftElement children={<MdOutlineEmail />} />
					<Input type="email" name="email" placeholder="eg. jsmith@gmail.com" />
				</InputGroup>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Password</FormLabel>

				<InputGroup>
					<Input type="password" name="password" placeholder="eg. SupEr$ecretP@ssw0rd" />
				</InputGroup>
			</FormControl>
			<FormControl>
				<FormLabel>Please enter the authorization code to register:</FormLabel>
				<Input type="text" name="code" />
				<FormHelperText>Don't have an authorization? Click here</FormHelperText>
			</FormControl>

			<Button
				colorScheme="blue"
				bg="blue.400"
				color="white"
				type="submit"
				_hover={{
					bg: "blue.500",
				}}
				w={"100%"}
				isLoading={isProcessing}>
				Create account
			</Button>
		</CustomFormContainer>
	);
}
