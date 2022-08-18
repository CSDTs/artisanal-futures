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
		if (!profilePayload.selectedFile) {
			setProfileValue("preview", null);
			return;
		}

		const objectUrl = URL.createObjectURL(profilePayload.selectedFile);

		setProfileValue("preview", objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [profilePayload.selectedFile]);

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setProfileValue("selectedFile", null);
			return;
		}

		setProfileValue("selectedFile", e.target.files[0]);
	};

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
				<Textarea borderRadius="15px" placeholder="eg. Artisanal Futures" fontSize="xs" />
			</FormControl>
			<FormControl onChange={(e) => setProfileValue("business_information", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Business Information
				</FormLabel>
				<Textarea borderRadius="15px" placeholder="eg. Detroit, MI" fontSize="xs" />
			</FormControl>
			<FormControl onChange={(e) => setProfileValue("misc_information", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Any other information you wish to let people know?
				</FormLabel>
				<Textarea borderRadius="15px" placeholder="eg. https://www.google.com" fontSize="xs" />
			</FormControl>

			<ImageUpload
				setSelectedFile={setProfileValue}
				fileType={"cover_image"}
				heading={"Cover Photo"}
				selectedFile={profilePayload.cover_image}
			/>
		</Stack>
	);
}
