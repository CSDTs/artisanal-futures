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
	Textarea,
} from "@chakra-ui/react";
// Custom components
import { useEffect } from "react";
import ImageUpload from "../../components/ImageUpload";
import { FaUserAlt } from "react-icons/fa";
export default function ProfilePanel({ profilePayload, setProfilePayload, textColor }) {
	useEffect(() => {
		console.log(profilePayload);
	}, [profilePayload]);

	const setProfileValue = (key, value) => {
		setProfilePayload((data) => {
			return {
				...data,
				[key]: value,
			};
		});
	};

	return (
		<Stack direction="column" spacing="20px" w="100%">
			<FormControl onChange={(e) => setProfileValue("profile_information", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					About Me
				</FormLabel>
				<Textarea
					borderRadius="15px"
					placeholder="eg. Artisanal Futures"
					fontSize="xs"
					value={profilePayload.profile_information}
				/>
			</FormControl>
			<FormControl onChange={(e) => setProfileValue("business_information", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Business Information
				</FormLabel>
				<Textarea
					borderRadius="15px"
					placeholder="eg. Detroit, MI"
					fontSize="xs"
					value={profilePayload.business_information}
				/>
			</FormControl>
			<FormControl onChange={(e) => setProfileValue("misc_information", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Any other information you wish to let people know?
				</FormLabel>
				<Textarea
					borderRadius="15px"
					placeholder="eg. https://www.google.com"
					fontSize="xs"
					value={profilePayload.misc_information}
				/>
			</FormControl>

			<ImageUpload
				heading={"Cover Photo"}
				selectedFile={profilePayload.selectedFile}
				fileType={"selectedFile"}
				setSelectedFile={setProfileValue}
				updateOverride={profilePayload.cover_image}
			/>
		</Stack>
	);
}
