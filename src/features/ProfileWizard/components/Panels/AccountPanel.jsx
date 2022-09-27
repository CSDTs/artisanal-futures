import { Box, Checkbox, Flex, FormControl, FormLabel, Input, Link, Stack, Text } from "@chakra-ui/react";

import AuthService from "../../../../services/auth.service";

import { AvatarUpload } from "../../../MediaUpload";

import PropTypes from "prop-types";
import setPayload from "../../utils/setPayload";
const AccountPanel = ({ accountPayload, setAccountPayload, miscPayload, setMiscPayload, labelProps, inputProps }) => {
	return (
		<Flex direction={{ sm: "column", md: "row" }} w="100%" mb="24px">
			<Box
				position="relative"
				minW={{ sm: "110px", xl: "150px" }}
				h={{ sm: "110px", xl: "150px" }}
				mx={{ sm: "auto", md: "40px", xl: "85px" }}
				mb={{ sm: "25px" }}>
				<AvatarUpload
					heading={"Profile Image"}
					selectedFile={accountPayload.selectedFile}
					fileType={"selectedFile"}
					setSelectedFile={(key, value) => setPayload(setAccountPayload, key, value)}
					updateOverride={accountPayload.preview}
				/>

				<Text color={labelProps.color} fontSize="xs" fontWeight="400" mt={1}>
					Upload a file or drag and drop
				</Text>
			</Box>
			<Stack direction="column" spacing="20px" w="100%">
				<FormControl>
					<FormLabel htmlFor={"first_name"} {...labelProps}>
						First Name
					</FormLabel>
					<Input
						id="first_name"
						placeholder="eg. Taylor "
						value={accountPayload.first_name}
						onChange={(e) => setPayload(setAccountPayload, "first_name", e.target.value)}
						{...inputProps}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor={"last_name"} {...labelProps}>
						Last Name
					</FormLabel>
					<Input
						id="last_name"
						placeholder="eg. Smith"
						value={accountPayload.last_name}
						onChange={(e) => setPayload(setAccountPayload, "last_name", e.target.value)}
						{...inputProps}
					/>
				</FormControl>
				<FormControl isDisabled>
					<FormLabel htmlFor={"user_nicename"} {...labelProps}>
						Username
					</FormLabel>
					<Input
						id="user_nicename"
						placeholder="eg. tSmith"
						value={AuthService.getCurrentUser().user_nicename}
						readOnly={true}
						{...inputProps}
					/>
				</FormControl>
				<FormControl isDisabled>
					<FormLabel htmlFor={"user_email"} {...labelProps}>
						Email Address
					</FormLabel>
					<Input
						id="user_email"
						placeholder="eg. example@address.com"
						type="email"
						value={AuthService.getCurrentUser().user_email}
						readOnly={true}
						{...inputProps}
					/>
				</FormControl>

				<Stack direction="column" spacing="20px">
					<FormControl>
						<Checkbox
							isChecked={miscPayload.terms_of_service}
							onChange={(e) => setPayload(setMiscPayload, "terms_of_service", e.target.checked)}>
							{" "}
							Check here to indicate tha you have read and agree to our{" "}
							<Link href={"/tos"} target="_blank" color="teal.400">
								{" "}
								Terms of Service
							</Link>
						</Checkbox>
					</FormControl>
					<FormControl>
						<Checkbox
							isChecked={miscPayload.collective_agreement}
							onChange={(e) => setPayload(setMiscPayload, "collective_agreement", e.target.checked)}>
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
};

AccountPanel.propTypes = {
	accountPayload: PropTypes.object,
	setAccountPayload: PropTypes.func,
	miscPayload: PropTypes.object,
	setMiscPayload: PropTypes.func,
	textColor: PropTypes.string,
	inputProps: PropTypes.object,
	labelProps: PropTypes.object,
};

export default AccountPanel;
