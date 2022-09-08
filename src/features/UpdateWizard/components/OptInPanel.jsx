import {
	Avatar,
	Box,
	chakra,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Icon,
	Input,
	Link,
	Stack,
	Switch,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";
// Custom components
import { useEffect } from "react";

import { AiFillSetting } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { FaCube, FaUserAlt } from "react-icons/fa";

import { MdModeEdit } from "react-icons/md";
export default function OptInPanel({ optInPayload, setOptInPayload, checkboxes, setCheckboxes, textColor }) {
	const iconColor = useColorModeValue("gray.300", "gray.700");
	let formTypes = optInPayload.formType;

	useEffect(() => {
		setOptInPayload({ ...optInPayload, ...{ fourm: checkboxes } });
	}, [checkboxes]);

	return (
		<>
			<Text color="gray.600" fontWeight="normal" fontSize="sm" mb={4}>
				ArtisanalFutures includes a forum for discussion with other businesses and customers like you. Please indicate
				the kinds of forums you are interested in joining:
			</Text>
			<Stack
				direction={{ sm: "column", md: "row" }}
				spacing={{ sm: "20px", lg: "35px" }}
				alignSelf="center"
				justifySelf="center"
				mb="24px">
				<Flex direction="column" align="center">
					<FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
						<Flex
							w="100%"
							h="100%"
							borderRadius="12px"
							justify="center"
							transition=".5s all ease"
							border="1px solid lightgray"
							align="center"
							bg={checkboxes.unmonitored ? "teal.300" : "#fff"}
							_hover={{ opacity: "0.8" }}>
							<Checkbox
								isChecked={optInPayload.fourm.unmonitored}
								onChange={() =>
									setCheckboxes((prevCheckboxes) => {
										return {
											...prevCheckboxes,
											unmonitored: !prevCheckboxes.unmonitored,
										};
									})
								}
								display="none"
							/>
							<Icon as={AiFillSetting} w="54px" h="54px" color={checkboxes.unmonitored ? "#fff" : iconColor} />
						</Flex>
					</FormLabel>
					<Text color={textColor} fontWeight="bold" fontSize="md">
						Unmonitored, publicly visible and open to the public
					</Text>
				</Flex>
				<Flex direction="column" align="center">
					<FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
						<Flex
							w="100%"
							h="100%"
							borderRadius="12px"
							justify="center"
							transition=".5s all ease"
							border="1px solid lightgray"
							align="center"
							bg={checkboxes.monitored ? "teal.300" : "#fff"}
							_hover={{ opacity: "0.8" }}>
							<Checkbox
								isChecked={optInPayload.fourm.monitored}
								onChange={() =>
									setCheckboxes((prevCheckboxes) => {
										return {
											...prevCheckboxes,
											monitored: !prevCheckboxes.monitored,
										};
									})
								}
								display="none"
							/>
							<Icon as={FaCube} w="54px" h="54px" color={checkboxes.monitored ? "#fff" : iconColor} />
						</Flex>
					</FormLabel>
					<Text color={textColor} fontWeight="bold" fontSize="md">
						Monitored, publicly visible, and open to the public
					</Text>
				</Flex>
				<Flex direction="column" align="center">
					<FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
						<Flex
							w="100%"
							h="100%"
							borderRadius="12px"
							justify="center"
							transition=".5s all ease"
							border="1px solid lightgray"
							align="center"
							bg={checkboxes.privately_visible ? "teal.300" : "#fff"}
							_hover={{ opacity: "0.8" }}>
							<Checkbox
								isChecked={optInPayload.fourm.privately_visible}
								onChange={() =>
									setCheckboxes((prevCheckboxes) => {
										return {
											...prevCheckboxes,
											privately_visible: !prevCheckboxes.privately_visible,
										};
									})
								}
								display="none"
							/>
							<Icon w="54px" h="54px" color={checkboxes.privately_visible ? "#fff" : iconColor} />
						</Flex>
					</FormLabel>
					<Text color={textColor} fontWeight="bold" fontSize="md">
						Privately visible and open to approved members only
					</Text>
				</Flex>
				<Flex direction="column" align="center">
					<FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
						<Flex
							w="100%"
							h="100%"
							borderRadius="12px"
							justify="center"
							transition=".5s all ease"
							border="1px solid lightgray"
							align="center"
							bg={checkboxes.invisible ? "teal.300" : "#fff"}
							_hover={{ opacity: "0.8" }}>
							<Checkbox
								isChecked={optInPayload.formType.invisible}
								onChange={() =>
									setCheckboxes((prevCheckboxes) => {
										return {
											...prevCheckboxes,
											invisible: !prevCheckboxes.invisible,
										};
									})
								}
								display="none"
							/>
							<Icon w="54px" h="54px" color={checkboxes.invisible ? "#fff" : iconColor} />
						</Flex>
					</FormLabel>
					<Text color={textColor} fontWeight="bold" fontSize="md">
						Invisible and open to invited members only
					</Text>
				</Flex>
			</Stack>
			<Text color="gray.600" fontWeight="normal" fontSize="sm" mb={4}>
				Supply chains provide materials and resources critical for your work. We want to use collective bargaining by
				identifying alternative and multiple sources and help network you and other businesses. To do this we need more
				supply chain conversations. To help do this we need periodic input from you. If you agree, then from time to
				time we will ask you to mention what supplies and materials you are currently using. Our AI technology will help
				suggest materials and processes upfront to save you time and effort. What the AI technology learns helps us
				identify outside price dips for groups of materials useful to groups of ArtisanalFutures businesses. It also
				helps us identify alternative and new sources.
			</Text>
			<FormControl display="flex" alignItems="center">
				<FormLabel htmlFor="email-alerts" mb="0">
					I agree to be a part of our supply chain conversations service
				</FormLabel>
				<Switch
					id="email-alerts"
					onChange={(e) => setOptInPayload({ ...optInPayload, ...{ supply_chain: e.target.checked } })}
					isChecked={optInPayload.supply_chain}
				/>
			</FormControl>
		</>
	);
}
