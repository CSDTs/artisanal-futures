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

export default function SummaryPanel({ account, business, profile, optional, textColor }) {
	return (
		<>
			<Flex direction={{ sm: "column", md: "row" }} w="100%" mb="24px"></Flex>
			<Flex direction={{ sm: "column", md: "row" }} w="100%" mb="24px">
				<Box
					position="relative"
					minW={{ sm: "110px", xl: "150px" }}
					h={{ sm: "110px", xl: "150px" }}
					mx={{ sm: "auto", md: "40px", xl: "85px" }}
					mb={{ sm: "25px" }}
				>
					<FormControl>
						<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
							Account Information
						</FormLabel>
					</FormControl>

					<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
						Upload a file or drag and drop
					</Text>

					<FormControl isDisabled>
						<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
							Full Name
						</FormLabel>
						<Input
							borderRadius="15px"
							placeholder="eg. example@address.com"
							fontSize="xs"
							type="email"
							value={account.name}
						/>
					</FormControl>
					<FormControl isDisabled>
						<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
							Username
						</FormLabel>
						<Input
							borderRadius="15px"
							placeholder="eg. example@address.com"
							fontSize="xs"
							type="email"
							value={account.username}
						/>
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
							value={account.email}
						/>
					</FormControl>
				</Box>
				<Box
					position="relative"
					minW={{ sm: "110px", xl: "150px" }}
					h={{ sm: "110px", xl: "150px" }}
					mx={{ sm: "auto", md: "40px", xl: "85px" }}
					mb={{ sm: "25px" }}
				>
					<FormControl>
						<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
							Profile Image
						</FormLabel>
					</FormControl>

					<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
						Upload a file or drag and drop
					</Text>
				</Box>
				<Box
					position="relative"
					minW={{ sm: "110px", xl: "150px" }}
					h={{ sm: "110px", xl: "150px" }}
					mx={{ sm: "auto", md: "40px", xl: "85px" }}
					mb={{ sm: "25px" }}
				>
					<FormControl>
						<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
							Profile Image
						</FormLabel>
					</FormControl>

					<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
						Upload a file or drag and drop
					</Text>
				</Box>
				{/* <Stack direction="column" spacing="20px" w="100%" >
				<FormControl isRequired onChange={(e) => setAccountValue("name", e.target.value)}>
					<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
						Full Name
					</FormLabel>
					<Input borderRadius="15px" placeholder="eg. Taylor Smith" fontSize="xs" />
				</FormControl>
				<FormControl isRequired onChange={(e) => setAccountValue("username", e.target.value)}>
					<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
						Username
					</FormLabel>
					<Input borderRadius="15px" placeholder="eg. tsmith" fontSize="xs" />
				</FormControl>
				<FormControl isRequired onChange={(e) => setAccountValue("email", e.target.value)}>
					<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
						Email Address
					</FormLabel>
					<Input borderRadius="15px" placeholder="eg. example@address.com" fontSize="xs" type="email" />
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
			</Stack> */}
			</Flex>
		</>
	);
}
