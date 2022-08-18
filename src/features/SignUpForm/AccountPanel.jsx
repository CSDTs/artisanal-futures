import {
	Avatar,
	Link,
	Box,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Stack,
	VisuallyHidden,
	chakra,
	Text,
} from "@chakra-ui/react";
// Custom components
import { useEffect } from "react";
import ImageUpload from "../../components/ImageUpload";
import { FaUserAlt } from "react-icons/fa";
import AvatarUpload from "../../components/AvatarUpload";
import AuthService from "../../services/auth.service";

export default function AccountPanel({ accountPayload, setAccountPayload, textColor }) {
	const setAccountValue = (key, value) => {
		setAccountPayload((data) => {
			return {
				...data,
				[key]: value,
			};
		});
	};

	useEffect(() => {
		console.log(accountPayload);
	}, [accountPayload]);

	return (
		<Flex direction={{ sm: "column", md: "row" }} w="100%" mb="24px">
			<Box
				position="relative"
				minW={{ sm: "110px", xl: "150px" }}
				h={{ sm: "110px", xl: "150px" }}
				mx={{ sm: "auto", md: "40px", xl: "85px" }}
				mb={{ sm: "25px" }}
			>
				<AvatarUpload
					heading={"Profile Image"}
					selectedFile={accountPayload.selectedFile}
					fileType={"selectedFile"}
					setSelectedFile={setAccountValue}
					updateOverride={accountPayload.preview}
				/>

				<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
					Upload a file or drag and drop
				</Text>
			</Box>
			<Stack direction="column" spacing="20px" w="100%">
				<FormControl onChange={(e) => setAccountValue("first_name", e.target.value)}>
					<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
						First Name
					</FormLabel>
					<Input borderRadius="15px" placeholder="eg. Taylor " fontSize="xs" />
				</FormControl>
				<FormControl onChange={(e) => setAccountValue("last_name", e.target.value)}>
					<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
						Last Name
					</FormLabel>
					<Input borderRadius="15px" placeholder="eg. Smith" fontSize="xs" />
				</FormControl>
				<FormControl isDisabled>
					<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
						Username
					</FormLabel>
					<Input borderRadius="15px" placeholder="eg. tsmith" fontSize="xs" value={accountPayload.username} />
				</FormControl>
				<FormControl isDisabled>
					<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
						Email Address
					</FormLabel>
					<Input
						borderRadius="15px"
						placeholder="eg. example@address.com"
						fontSize="xs"
						type="email"
						value={accountPayload.email}
					/>
				</FormControl>

				<Stack direction="column" spacing="20px">
					<FormControl isRequired>
						<Checkbox>
							{" "}
							Check here to indicate tha you have read and agree to our{" "}
							<Link href={"/tos"} target="_blank" color="teal.400">
								{" "}
								Terms of Service
							</Link>
						</Checkbox>
					</FormControl>
					<FormControl isRequired>
						<Checkbox>
							Check here to indicate tha you have read and agree to our{" "}
							<Link href={"/agreement"} target="_blank" color="teal.400">
								{" "}
								Collective Agreement
							</Link>
						</Checkbox>
					</FormControl>
				</Stack>
			</Stack>
		</Flex>
	);
}
