import {
	Avatar,
	Box,
	chakra,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Link,
	Stack,
	Text,
	VisuallyHidden,
} from "@chakra-ui/react";
// Custom components
import { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { ImageUpload } from "../../MediaUpload/";
export default function BusinessPanel({ businessPayload, setBusinessPayload, textColor }) {
	const setBusinessValue = (key, value) => {
		setBusinessPayload((data) => {
			return {
				...data,
				[key]: value,
			};
		});
	};

	return (
		<Stack direction="column" spacing="20px" w="100%">
			<FormControl
				onChange={(e) => {
					setBusinessValue("name", e.target.value);
				}}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Business Name
				</FormLabel>
				<Input borderRadius="15px" placeholder="eg. Artisanal Futures" fontSize="xs" value={businessPayload.name} />
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("address", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Where is your business located?
				</FormLabel>
				<Input borderRadius="15px" placeholder="eg. Detroit, MI" fontSize="xs" value={businessPayload.address} />
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("website", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Do you have a business website? If so, please provide a link:
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. https://www.google.com"
					fontSize="xs"
					value={businessPayload.website}
				/>
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("business_and_customer_description", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Briefly describe your business and customers
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. My business consists of..."
					fontSize="xs"
					value={businessPayload.business_and_customer_description}
				/>
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("principles", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					What principles do you adhere to in your work?
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. My business consists of..."
					fontSize="xs"
					value={businessPayload.principles}
				/>
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("materials", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					What materials are common in your work?
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. My business consists of..."
					fontSize="xs"
					value={businessPayload.materials}
				/>
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("processes", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					What processes are common in your work?
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. My business consists of..."
					fontSize="xs"
					value={businessPayload.processes}
				/>
			</FormControl>

			<ImageUpload
				heading={"Cover Photo"}
				selectedFile={businessPayload.selectedFile}
				fileType={"selectedFile"}
				setSelectedFile={setBusinessValue}
				updateOverride={businessPayload.thumbnail_image}
			/>
		</Stack>
	);
}
