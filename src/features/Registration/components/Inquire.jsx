import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Link,
	Stack,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";

import emailjs from "emailjs-com";
import React from "react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

import SocialMediaRow from "../components/SocialMediaRow";

export default function Inquire({ setHasCode, social = false }) {
	const [status, setStatus] = React.useState();

	const handleOnSubmit = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				import.meta.env.VITE_SERVICE_ID,
				import.meta.env.VITE_TEMPLATE_ID,
				e.target,
				import.meta.env.VITE_USER_ID
			)
			.then(
				(result) => {
					console.log(result.text);
					setStatus(true);
					onOpen();
				},
				(error) => {
					console.log(error.text);
					setStatus(false);
					onOpen();
				}
			);
		e.target.reset();
	};
	const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
	return (
		<Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
			<Box>
				<VStack spacing={{ base: 4, md: 8, lg: 20 }}>
					{isVisible ? (
						<Alert status="success">
							<AlertIcon />
							<Box>
								<AlertTitle>{status ? "Success!" : "Error"}</AlertTitle>
								<AlertDescription>
									{status
										? " Your message has been received. We will get back to you as soon as we can."
										: "There was an error processing your request. Please try again later. "}
								</AlertDescription>
							</Box>
							<CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose} />
						</Alert>
					) : (
						""
					)}

					<Stack spacing={{ base: 4, md: 8, lg: 20 }} direction={{ base: "column", md: "row" }}>
						{social && <SocialMediaRow />}

						<Box
							bg={useColorModeValue("white", "gray.700")}
							borderRadius="lg"
							p={8}
							color={useColorModeValue("gray.700", "whiteAlpha.900")}
							shadow="base">
							<VStack as={"form"} spacing={5} onSubmit={handleOnSubmit}>
								<FormControl isRequired>
									<FormLabel>Name</FormLabel>

									<InputGroup>
										<InputLeftElement children={<BsPerson />} />
										<Input type="text" name="name" placeholder="Your Name" />
									</InputGroup>
								</FormControl>

								<FormControl isRequired>
									<FormLabel>Email</FormLabel>

									<InputGroup>
										<InputLeftElement children={<MdOutlineEmail />} />
										<Input type="email" name="email" placeholder="Your Email" />
									</InputGroup>
								</FormControl>

								<FormControl isRequired>
									<FormLabel>Message</FormLabel>

									<Textarea name="message" placeholder="Your Message" rows={6} resize="none" />
								</FormControl>

								<Button
									colorScheme="blue"
									bg="blue.400"
									color="white"
									type="submit"
									_hover={{
										bg: "blue.500",
									}}
									isFullWidth>
									Send Message
								</Button>
							</VStack>
							<Text
								mt={4}
								fontSize={{
									base: "md",
									md: "md",
								}}>
								Have an authorization code?{" "}
								<Button variant="link" colorScheme="blue" onClick={() => setHasCode(true)}>
									Click here
								</Button>
							</Text>
						</Box>
					</Stack>
				</VStack>
			</Box>
		</Box>
	);
}
