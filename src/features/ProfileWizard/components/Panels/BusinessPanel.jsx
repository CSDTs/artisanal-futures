import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

import PropTypes from "prop-types";
import { ImageUpload } from "../../../MediaUpload";
import setPayload from "../../utils/setPayload";

const BusinessPanel = ({ businessPayload, setBusinessPayload, labelProps, inputProps }) => {
	return (
		<Stack direction="column" spacing="20px" w="100%">
			<FormControl>
				<FormLabel htmlFor={"business_name"} {...labelProps}>
					Business Name
				</FormLabel>
				<Input
					id="business_name"
					placeholder="eg. Artisanal Futures"
					value={businessPayload.name}
					onChange={(e) => {
						setPayload(setBusinessPayload, "name", e.target.value);
					}}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"business_address"} {...labelProps}>
					Where is your business located?
				</FormLabel>
				<Input
					id="business_address"
					placeholder="eg. Detroit, MI"
					value={businessPayload.address}
					onChange={(e) => setPayload(setBusinessPayload, "address", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"business_website"} {...labelProps}>
					Do you have a business website? If so, please provide a link:
				</FormLabel>
				<Input
					id="business_website"
					placeholder="eg. https://www.google.com"
					value={businessPayload.website}
					onChange={(e) => setPayload(setBusinessPayload, "website", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"business_phone_number"} {...labelProps}>
					Does your business have a phone number? If so, please provide a phone number:
				</FormLabel>
				<Input
					id="business_phone_number"
					placeholder="eg. 313-333-3333"
					value={businessPayload.phone_number}
					onChange={(e) => setPayload(setBusinessPayload, "phone_number", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"business_email"} {...labelProps}>
					Does your business have an email address? If so, please provide an email for inquiries:
				</FormLabel>
				<Input
					borderRadius="15px"
					id="business_email"
					placeholder="eg. contact@mysuperawesomebusiness.com"
					va={businessPayload.email}
					onChange={(e) => setPayload(setBusinessPayload, "email", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"business_and_customer_description"} {...labelProps}>
					Briefly describe your business and customers
				</FormLabel>
				<Input
					id="business_and_customer_description"
					placeholder="eg. My business consists of..."
					value={businessPayload.business_and_customer_description}
					onChange={(e) => setPayload(setBusinessPayload, "business_and_customer_description", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"business_principles"} {...labelProps}>
					What principles do you adhere to in your work?
				</FormLabel>
				<Input
					id="business_principles"
					placeholder="eg. My business consists of..."
					value={businessPayload.principles}
					onChange={(e) => setPayload(setBusinessPayload, "principles", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"business_materials"} {...labelProps}>
					What materials are common in your work?
				</FormLabel>
				<Input
					id="business_materials"
					placeholder="eg. My business consists of..."
					value={businessPayload.materials}
					onChange={(e) => setPayload(setBusinessPayload, "materials", e.target.value)}
					{...inputProps}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor={"business_processes"} {...labelProps}>
					What processes are common in your work?
				</FormLabel>
				<Input
					id="business_processes"
					placeholder="eg. My business consists of..."
					value={businessPayload.processes}
					onChange={(e) => setPayload(setBusinessPayload, "processes", e.target.value)}
					{...inputProps}
				/>
			</FormControl>

			<ImageUpload
				heading={"Cover Photo"}
				subheading={"Photo is used to showcase your business on the site"}
				color={labelProps.color}
				selectedFile={businessPayload.selectedFile}
				fileType={"selectedFile"}
				setSelectedFile={(key, value) => setPayload(setBusinessPayload, key, value)}
				updateOverride={businessPayload.thumbnail_image}
			/>
		</Stack>
	);
};

BusinessPanel.propTypes = {
	businessPayload: PropTypes.object,
	setBusinessPayload: PropTypes.func,
	inputProps: PropTypes.object,
	labelProps: PropTypes.object,
};

export default BusinessPanel;
