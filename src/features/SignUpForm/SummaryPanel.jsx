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
	Image,
	Text,
	SimpleGrid,
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
						<Avatar bg="gray.300" src={profile.artisan_image} size="xl" />
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
							<Checkbox isDisabled isChecked={optional.tos}>
								TOS
							</Checkbox>
							<Checkbox isDisabled isChecked={optional.agreement}>
								Agreement
							</Checkbox>
						</Stack>

						<Text>Form Opt-Ins</Text>
						<Wrap spacing={5}>
							<Checkbox isDisabled isChecked={optional.formType.unmonitored}>
								unmonitored
							</Checkbox>
							<Checkbox isDisabled isChecked={optional.formType.monitored}>
								monitored
							</Checkbox>
							<Checkbox isDisabled isChecked={optional.formType.private}>
								private
							</Checkbox>
							<Checkbox isDisabled isChecked={optional.formType.invisible}>
								invisible
							</Checkbox>
						</Wrap>
						<Text>Opt-In for Supply Chain</Text>
						<Wrap spacing={5}>
							<Checkbox isDisabled isChecked={optional.supplyChain}>
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
							{business.business_name}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.general_location}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.business_and_customer_description}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.business_principles}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.business_materials}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{business.business_processes}
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
							{profile.profile_information}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{profile.misc_information}
						</Text>
						<Text color={textColor} fontSize="xs" fontWeight="400" mt={1}>
							{profile.business_information}
						</Text>
					</Stack>
				</Box>
			</SimpleGrid>
		</>
	);
}
