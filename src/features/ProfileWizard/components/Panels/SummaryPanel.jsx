import { Avatar, Box, Checkbox, Image, SimpleGrid, Stack, Text, Wrap } from "@chakra-ui/react";

import PropTypes from "prop-types";

const SummaryPanel = ({ account, business, profile, optional, textColor }) => {
	const labelProps = {
		color: textColor,
		fontSize: "md",
		fontWeight: "bold",
	};

	const defaultTextProps = {
		color: textColor,
		fontSize: "xs",
		fontWeight: "400",
		mt: 1,
	};

	const headerTextProps = {
		color: textColor,
		fontSize: "sm",
		fontWeight: "400",
		mt: 1,
	};
	return (
		<>
			<SimpleGrid columns={3} spacingX="40px" spacingY="20px">
				<Box bg="gray.300" p={2}>
					<Stack direction="column" spacing="1rem" w="100%">
						<Text {...labelProps}>Account Information</Text>
						<Avatar bg="gray.300" src={account.preview} size="xl" />
						<Text {...headerTextProps}>{account.first_name + " " + account.last_name}</Text>
						<Text {...headerTextProps}>{account.username}</Text>
						<Text {...headerTextProps}>{account.email}</Text>

						<Text>Required</Text>
						<Stack spacing={5} direction="row">
							<Checkbox isDisabled isChecked={optional.terms_of_service}>
								TOS
							</Checkbox>
							<Checkbox isDisabled isChecked={optional.collective_agreement}>
								Agreement
							</Checkbox>
						</Stack>

						<Text>Form Opt-Ins</Text>
						<Wrap spacing={5}>
							<Checkbox isDisabled isChecked={optional.fourm.unmonitored}>
								unmonitored
							</Checkbox>
							<Checkbox isDisabled isChecked={optional.fourm.monitored}>
								monitored
							</Checkbox>
							<Checkbox isDisabled isChecked={optional.fourm.privately_visible}>
								private
							</Checkbox>
							<Checkbox isDisabled isChecked={optional.fourm.invisible}>
								invisible
							</Checkbox>
						</Wrap>
						<Text>Opt-In for Supply Chain</Text>
						<Wrap spacing={5}>
							<Checkbox isDisabled isChecked={optional.supply_chain}>
								Supply Chain
							</Checkbox>
						</Wrap>
					</Stack>
				</Box>
				<Box bg="gray.300" p={2}>
					<Stack direction="column" spacing="20px" w="100%">
						<Text {...labelProps}>Business Information</Text>

						<Image
							bg="gray.300"
							src={business.preview || business.thumbnail_image}
							size="xl"
							fallbackSrc="https://via.placeholder.com/250"
							alt={"Your selected preview for your business"}
						/>
						<Text {...defaultTextProps}>{business.name}</Text>
						<Text {...defaultTextProps}>{business.address}</Text>
						<Text {...defaultTextProps}>{business.business_and_customer_description}</Text>
						<Text {...defaultTextProps}>{business.principles}</Text>
						<Text {...defaultTextProps}>{business.materials}</Text>
						<Text {...defaultTextProps}>{business.processes}</Text>
					</Stack>
				</Box>
				<Box bg="gray.300" p={2}>
					<Stack direction="column" spacing="20px" w="100%">
						<Text {...labelProps}>Profile Information</Text>

						<Image
							bg="gray.300"
							src={profile.preview || profile.cover_image}
							fallbackSrc="https://via.placeholder.com/250"
							size="xl"
							alt={"Your selected preview for your public profile"}
						/>
						<Text {...defaultTextProps}>{profile.about_me}</Text>
						<Text {...defaultTextProps}>{profile.business_information}</Text>
						<Text {...defaultTextProps}>{profile.misc_information}</Text>
					</Stack>
				</Box>
			</SimpleGrid>
		</>
	);
};

SummaryPanel.propTypes = {
	account: PropTypes.object,
	business: PropTypes.object,
	profile: PropTypes.object,
	optional: PropTypes.object,
	textColor: PropTypes.string,
};

export default SummaryPanel;
