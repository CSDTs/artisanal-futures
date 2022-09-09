import {
	Avatar,
	Box,
	chakra,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Image,
	Input,
	Link,
	SimpleGrid,
	Stack,
	Text,
	VisuallyHidden,
	Wrap,
} from "@chakra-ui/react";
// Custom components
import { useEffect } from "react";

export default function SummaryPanel({ account, business, profile, optional, textColor }) {
	return (
		<>
			<SimpleGrid columns={3} spacingX="40px" spacingY="20px">
				<Box bg="gray.300" p={2}>
					<Stack direction="column" spacing="1rem" w="100%">
						<FormControl>
							<FormLabel color={textColor} fontSize="md" fontWeight="bold">
								Account Information
							</FormLabel>
						</FormControl>
						<Avatar bg="gray.300" src={account.preview} size="xl" />
						<Text color={textColor} fontSize="sm" fontWeight="400" mt={1}>
							{account.first_name + " " + account.last_name}
						</Text>
						<Text color={textColor} fontSize="sm" fontWeight="400" mt={1}>
							{account.username}
						</Text>
						<Text color={textColor} fontSize="sm" fontWeight="400" mt={1}>
							{account.email}
						</Text>

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
						<FormControl>
							<FormLabel color={textColor} fontSize="md" fontWeight="bold">
								Business Information
							</FormLabel>
						</FormControl>
						<Image bg="gray.300" src={business.preview || business.thumbnail_image} size="xl" />
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.name}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.address}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.business_and_customer_description}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.principles}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.materials}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.processes}
						</Text>
					</Stack>
				</Box>
				<Box bg="gray.300" p={2}>
					<Stack direction="column" spacing="20px" w="100%">
						<FormControl>
							<FormLabel color={textColor} fontSize="md" fontWeight="bold">
								Profile Information
							</FormLabel>
						</FormControl>
						<Image bg="gray.300" src={profile.preview || profile.cover_image} size="xl" />
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{profile.about_me}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{profile.business_information}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{profile.misc_information}
						</Text>
					</Stack>
				</Box>
			</SimpleGrid>
		</>
	);
}
