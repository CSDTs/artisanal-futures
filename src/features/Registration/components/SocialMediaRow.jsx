import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Link,
	Stack,
	Text,
	Textarea,
	Tooltip,
	useClipboard,
	useColorModeValue,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";

import emailjs from "emailjs-com";
import React from "react";
import { BsInstagram, BsLinkedin, BsPerson, BsTwitter } from "react-icons/bs";
import { MdEmail, MdOutlineEmail } from "react-icons/md";

export default function SocialMediaRow() {
	const { hasCopied, onCopy } = useClipboard(import.meta.env.VITE_SITE_EMAIL);
	return (
		<Stack align="center" justify="space-around" direction={{ base: "row", md: "column" }}>
			<Tooltip label={hasCopied ? "Email Copied!" : "Copy Email"} closeOnClick={false} hasArrow>
				<IconButton
					aria-label="email"
					variant="ghost"
					size="lg"
					fontSize="3xl"
					icon={<MdEmail />}
					_hover={{
						bg: "blue.500",
						color: useColorModeValue("white", "gray.700"),
					}}
					onClick={onCopy}
					isRound
				/>
			</Tooltip>

			<Link href="#">
				<IconButton
					aria-label="instagram"
					variant="ghost"
					size="lg"
					fontSize="3xl"
					icon={<BsInstagram />}
					_hover={{
						bg: "blue.500",
						color: useColorModeValue("white", "gray.700"),
					}}
					isRound
				/>
			</Link>

			<Link href="#">
				<IconButton
					aria-label="twitter"
					variant="ghost"
					size="lg"
					icon={<BsTwitter size="28px" />}
					_hover={{
						bg: "blue.500",
						color: useColorModeValue("white", "gray.700"),
					}}
					isRound
				/>
			</Link>

			<Link href="#">
				<IconButton
					aria-label="linkedin"
					variant="ghost"
					size="lg"
					icon={<BsLinkedin size="28px" />}
					_hover={{
						bg: "blue.500",
						color: useColorModeValue("white", "gray.700"),
					}}
					isRound
				/>
			</Link>
		</Stack>
	);
}
