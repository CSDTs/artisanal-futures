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
			<FormControl onChange={(e) => setBusinessValue("business_name", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Business Name
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. Artisanal Futures"
					fontSize="xs"
					value={businessPayload.business_name}
				/>
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("general_location", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Where is your business located?
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. Detroit, MI"
					fontSize="xs"
					value={businessPayload.general_location}
				/>
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
			<FormControl onChange={(e) => setBusinessValue("business_principles", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					What principles do you adhere to in your work?
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. My business consists of..."
					fontSize="xs"
					value={businessPayload.business_principles}
				/>
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("business_materials", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					What materials are common in your work?
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. My business consists of..."
					fontSize="xs"
					value={businessPayload.business_materials}
				/>
			</FormControl>
			<FormControl onChange={(e) => setBusinessValue("business_processes", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					What processes are common in your work?
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. My business consists of..."
					fontSize="xs"
					value={businessPayload.business_processes}
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
