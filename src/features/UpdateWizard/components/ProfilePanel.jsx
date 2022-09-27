import { FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";

import { ImageUpload } from "../../MediaUpload/";

export default function ProfilePanel({ profilePayload, setProfilePayload, textColor }) {
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
			<FormControl onChange={(e) => setProfileValue("about_me", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					About Me
				</FormLabel>
				<Textarea
					borderRadius="15px"
					placeholder="eg. I am the owner and operator of this really cool business. "
					fontSize="xs"
					value={profilePayload.about_me}
				/>
			</FormControl>
			<FormControl onChange={(e) => setProfileValue("business_information", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					What is your title?
				</FormLabel>
				<Input
					borderRadius="15px"
					placeholder="eg. Owner and operator of My Company"
					fontSize="xs"
					value={profilePayload.business_information}
				/>
			</FormControl>
			<FormControl onChange={(e) => setProfileValue("misc_information", e.target.value)}>
				<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
					Any news on your business you want to share with others?
				</FormLabel>
				<Textarea
					borderRadius="15px"
					placeholder="eg. For the next two weeks, we are offering a BOGO"
					fontSize="xs"
					value={profilePayload.misc_information}
				/>
			</FormControl>

			<ImageUpload
				heading={"Cover Photo"}
				subheading={"Photo is used for your profile, both public and private"}
				color={textColor}
				selectedFile={profilePayload.selectedFile}
				fileType={"selectedFile"}
				setSelectedFile={setProfileValue}
				updateOverride={profilePayload.cover_image}
			/>
		</Stack>
	);
}
