import { FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";

import { ImageUpload } from "../../../MediaUpload";

import PropTypes from "prop-types";
import setPayload from "../../utils/setPayload";

const ProfilePanel = ({ profilePayload, setProfilePayload, labelProps, inputProps }) => {
	return (
		<Stack direction="column" spacing="20px" w="100%">
			<FormControl>
				<FormLabel htmlFor={"profile_about_me"} {...labelProps}>
					About Me
				</FormLabel>
				<Textarea
					id={"profile_about_me"}
					placeholder="eg. I am the owner and operator of this really cool business. "
					value={profilePayload.about_me}
					onChange={(e) => setPayload(setProfilePayload, "about_me", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"profile_business_information"} {...labelProps}>
					What is your title?
				</FormLabel>
				<Input
					id={"profile_business_information"}
					placeholder="eg. Owner and operator of My Company"
					value={profilePayload.business_information}
					onChange={(e) => setPayload(setProfilePayload, "business_information", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"profile_misc_information"} {...labelProps}>
					Any news on your business you want to share with others?
				</FormLabel>
				<Textarea
					id={"profile_misc_information"}
					placeholder="eg. For the next two weeks, we are offering a special promotion"
					value={profilePayload.misc_information}
					onChange={(e) => setPayload(setProfilePayload, "misc_information", e.target.value)}
					{...inputProps}
				/>
			</FormControl>

			<ImageUpload
				heading={"Cover Photo"}
				subheading={"Photo is used for your profile, both public and private"}
				color={labelProps.color}
				selectedFile={profilePayload.selectedFile}
				fileType={"selectedFile"}
				setSelectedFile={(key, value) => setPayload(setProfilePayload, key, value)}
				updateOverride={profilePayload.cover_image}
			/>
		</Stack>
	);
};

ProfilePanel.propTypes = {
	profilePayload: PropTypes.object,
	setProfilePayload: PropTypes.func,
	inputProps: PropTypes.object,
	labelProps: PropTypes.object,
};

export default ProfilePanel;
