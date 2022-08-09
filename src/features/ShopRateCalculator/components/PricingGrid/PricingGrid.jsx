import React, { useState } from "react";
import {
	Box,
	Flex,
	Stack,
	Heading,
	Text,
	Container,
	Input,
	Button,
	SimpleGrid,
	Avatar,
	AvatarGroup,
	useBreakpointValue,
	Icon,
	TabPanel,
	TabPanels,
	Tab,
	Tabs,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	TabList,
	List,
	ListIcon,
	ListItem,
	Slider,
	SliderMark,
	Tooltip,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";

import FormHeading from "../Forms/FormHeading/FormHeading";
import FixedCost from "../Forms/FixedCost/FixedCost";
import MaterialCost from "../Forms/MaterialCost/MaterialCost";
import NextButton from "../Forms/NextButton/NextButton";

import { CheckIcon } from "@chakra-ui/icons";
import { PieChart } from "react-minimal-pie-chart";

import CostPanel from "../../features/CostPanel";
import FORM_DATA from "../../data/panels.json";
import AddNewCharges from "../../features/AddNewCharges";

import FormHours from "../ui/Form/FormHours";
import {
	MdOutlineHomeWork,
	MdOutlineElectricalServices,
	MdLocalGasStation,
	MdNewReleases,
	MdCheckCircle,
	MdSettings,
} from "react-icons/md";
import { FaTrash, FaHammer, FaPlus, FaInfoCircle, FaTshirt } from "react-icons/fa";
const avatars = [
	{
		name: "Ryan Florence",
		url: "https://bit.ly/ryan-florence",
	},
	{
		name: "Segun Adebayo",
		url: "https://bit.ly/sage-adebayo",
	},
	{
		name: "Kent Dodds",
		url: "https://bit.ly/kent-c-dodds",
	},
	{
		name: "Prosper Otemuyiwa",
		url: "https://bit.ly/prosper-baba",
	},
	{
		name: "Christian Nwamba",
		url: "https://bit.ly/code-beast",
	},
];

const AdditionalMonthly = (current) => {
	let additionalFields = [];
	for (let i = 0; i < current; i++) {
		additionalFields.push(
			<InputGroup>
				<InputLeftElement pointerEvents="none" children={<MdNewReleases color="gray.300" />} />
				<Input
					type="text"
					placeholder="Additional Fixed Cost"
					bg={"gray.100"}
					border={0}
					color={"gray.500"}
					_placeholder={{
						color: "gray.500",
					}}
					key={i}
				/>
			</InputGroup>
		);
	}

	return additionalFields;
};

export default function PricingGrid() {
	const [count, setCount] = useState(0);
	const [tabIndex, setTabIndex] = useState(0);
	const [formValues, setFormValues] = useState([]);
	const [sliderValue, setSliderValue] = React.useState(5);
	const [showTooltip, setShowTooltip] = React.useState(false);

	const [fixedTotal, setFixedTotal] = useState(0);
	const [fixedAdditional, setFixedAdditional] = useState(0);
	const [materialAdditional, setMaterialAdditional] = useState(0);
	const [materialTotal, setMaterialTotal] = useState(0);
	const [laborTotal, setLaborTotal] = useState(0);

	const [totalCost, setTotalCost] = useState(0);
	const [hourRate, setHourRate] = useState(0);
	let addFormFields = () => {
		setFormValues([...formValues, { name: "", email: "" }]);
	};
	let removeFormFields = (i) => {
		let newFormValues = [...formValues];
		newFormValues.splice(i, 1);
		setFormValues(newFormValues);
	};

	let handleChange = (i, e) => {
		let newFormValues = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
	};

	const handleSliderChange = (event) => {
		console.log(tabIndex);
		let current = tabIndex + 1;
		setTabIndex(current > 3 ? 3 : current);
	};

	const handleTabsChange = (index) => {
		setTabIndex(index);
	};

	const calculateMaterialCosts = () => {
		return (materialTotal + materialAdditional) / hourRate;
	};

	const calculateFixedCosts = () => {
		return ((fixedTotal + fixedAdditional) / 2000) * 12;
	};
	React.useEffect(() => {
		setTotalCost(fixedTotal + fixedAdditional + calculateMaterialCosts() + laborTotal);
	}, [fixedTotal, fixedAdditional, materialAdditional, materialTotal, laborTotal, hourRate]);

	React.useEffect(() => {
		console.log(handleCalculation(fixedTotal + fixedAdditional));
		console.log(handleCalculation(materialTotal + materialAdditional));
		console.log(handleCalculation(laborTotal));
	}, [totalCost]);

	React.useEffect(() => {
		console.log(sliderValue);
	}, [sliderValue]);

	const handleCalculation = (cost) => {
		let calc = (totalCost / cost) * 100;
		if (isFinite(calc)) return calc;
		return 0;
	};

	return (
		<Box position={"relative"}>
			<Container
				as={SimpleGrid}
				maxW={"7xl"}
				columns={{ base: 1, md: 2 }}
				spacing={{ base: 10, lg: 32 }}
				py={{ base: 10, sm: 20, lg: 32 }}
			>
				<Stack bg={"gray.50"} rounded={"xl"} p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} maxW={{ lg: "lg" }}>
					<Tabs variant="unstyled" align="center" index={tabIndex} onChange={handleTabsChange}>
						<TabList marginLeft="auto" marginRight="auto">
							{FORM_DATA &&
								FORM_DATA.map((data) => <Tab _selected={{ color: "white", bg: "blue.500" }}>{data.name}</Tab>)}

							<Tab _selected={{ color: "white", bg: "orange.400" }}>Profit</Tab>
						</TabList>
						<TabPanels>
							{FORM_DATA &&
								FORM_DATA.map((data) => (
									<TabPanel>
										<CostPanel
											title={data.alt}
											text={data.description}
											hint={data.hint}
											fields={data.fields}
											additional={data.is_additional_available}
											handleCost={
												data.name === "Monthly Cost"
													? setFixedTotal
													: data.name === "Material Cost"
													? setMaterialTotal
													: setLaborTotal
											}
										/>
										{data.is_additional_available && (
											<AddNewCharges
												handleCost={
													data.name === "Monthly Cost"
														? setFixedAdditional
														: data.name === "Material Cost"
														? setMaterialAdditional
														: ""
												}
											/>
										)}

										{data.is_material_hours && <FormHours handleHours={setHourRate} />}
									</TabPanel>
								))}

							{/* <TabPanel>
								<FormHeading
									title={"Fixed Costs"}
									text={"Fixed costs are calculated monthly. Things like rent, gas, etc are included in this."}
								/>
								<FixedCost handleCost={setFixedTotal} />
								<NextButton handleClick={handleSliderChange} />

								<Stack direction={["row"]} marginTop={"1rem"} justifyContent={"center"}>
									<FaInfoCircle color="gray.300" />
									<Text fontSize="sm">Charges should be recorded on a monthly basis.</Text>
								</Stack>
							</TabPanel> */}
							{/* <TabPanel>
								<FormHeading
									title={"Material Costs"}
									text={"These costs are intended for one project (to give the best estimate)."}
								/>
								<MaterialCost handleCost={setMaterialTotal} />
								<NextButton handleClick={handleSliderChange} />
								<Stack direction={["row"]} marginTop={"1rem"} justifyContent={"center"}>
									<FaInfoCircle color="gray.300" />
									<Text fontSize="sm">Charges should be recorded on a monthly basis.</Text>
								</Stack>
							</TabPanel> */}
							{/* <TabPanel>
								<Stack spacing={4} marginTop="1rem">
									<Heading color={"gray.800"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
										Labor Costs
									</Heading>
									<Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
										These costs are based on your current staffing operations
									</Text>
								</Stack>
								<Box as={"form"} mt={10}>
									<Stack spacing={4}>
										<Stack spacing={4}>
											<InputGroup>
												<InputLeftElement pointerEvents="none" children={<FaTshirt color="gray.300" />} />
												<Input
													type="text"
													placeholder="Labor rate per hour"
													bg={"gray.100"}
													border={0}
													color={"gray.500"}
													_placeholder={{
														color: "gray.500",
													}}
												/>
											</InputGroup>
											<InputGroup>
												<InputLeftElement pointerEvents="none" children={<FaTshirt color="gray.300" />} />
												<Input
													type="text"
													placeholder="Number of Workers (no./hour)"
													bg={"gray.100"}
													border={0}
													color={"gray.500"}
													_placeholder={{
														color: "gray.500",
													}}
												/>
											</InputGroup>
											<InputGroup>
												<InputLeftElement pointerEvents="none" children={<FaTshirt color="gray.300" />} />
												<Input
													type="text"
													placeholder="Labor cost per hour"
													bg={"gray.100"}
													border={0}
													color={"gray.500"}
													_placeholder={{
														color: "gray.500",
													}}
												/>
											</InputGroup>
											{formValues &&
												formValues.map((element, index) => (
													<>
														<InputGroup>
															<InputLeftElement pointerEvents="none" children={<MdNewReleases color="gray.300" />} />
															<Input
																type="text"
																placeholder={`Misc material cost ${index}`}
																bg={"gray.100"}
																border={0}
																color={"gray.500"}
																_placeholder={{
																	color: "gray.500",
																}}
																onChange={(e) => handleChange(index, e)}
															/>

															<InputRightElement
																onClick={() => removeFormFields(index)}
																children={<FaTrash color="gray.300" />}
															/>
														</InputGroup>
													</>
												))}
										</Stack>
										<Stack direction={["row"]} spacing="24px" w={"100%"} justifyItems="center">
											<Text
												w={"100%"}
												textAlign="right"
												display={"inline-flex"}
												alignItems={"center"}
												justifyContent={"end"}
												fontWeight="semibold"
											>
												Additional Charges
											</Text>
											<Button fontFamily={"heading"} bg={"gray.200"} color={"gray.800"} onClick={() => addFormFields()}>
												<FaPlus color="gray.300" />
											</Button>
										</Stack>
									</Stack>
									<Button
										fontFamily={"heading"}
										mt={8}
										w={"full"}
										bgGradient="linear(to-r, red.400,pink.400)"
										color={"white"}
										_hover={{
											bgGradient: "linear(to-r, red.400,pink.400)",
											boxShadow: "xl",
										}}
										onClick={handleSliderChange}
									>
										Next
									</Button>
									<Stack direction={["row"]} marginTop={"1rem"} justifyContent={"center"}>
										<FaInfoCircle color="gray.300" />
										<Text fontSize="sm">Charges should be recorded on a monthly basis.</Text>
									</Stack>
								</Box>
							</TabPanel> */}
							<TabPanel>
								<Stack spacing={4} marginTop="1rem">
									<Heading color={"gray.800"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
										Percentage Profit
									</Heading>
									<Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
										None of the previous fields gives you a profit, so adjust the percentage to get one.
									</Text>
								</Stack>
								<Box as={"form"} mt={10}>
									<Slider
										id="slider"
										defaultValue={5}
										min={0}
										max={100}
										colorScheme="teal"
										onChange={(v) => setSliderValue(v)}
										onMouseEnter={() => setShowTooltip(true)}
										onMouseLeave={() => setShowTooltip(false)}
									>
										<SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
											25%
										</SliderMark>
										<SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
											50%
										</SliderMark>
										<SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
											75%
										</SliderMark>
										<SliderTrack>
											<SliderFilledTrack />
										</SliderTrack>
										<Tooltip
											hasArrow
											bg="teal.500"
											color="white"
											placement="top"
											isOpen={showTooltip}
											label={`${sliderValue}%`}
										>
											<SliderThumb />
										</Tooltip>
									</Slider>
									<Button
										fontFamily={"heading"}
										mt={8}
										w={"full"}
										bgGradient="linear(to-r, red.400,pink.400)"
										color={"white"}
										_hover={{
											bgGradient: "linear(to-r, red.400,pink.400)",
											boxShadow: "xl",
										}}
										onClick={handleSliderChange}
									>
										Next
									</Button>
									<Stack direction={["row"]} marginTop={"1rem"} justifyContent={"center"}>
										<FaInfoCircle color="gray.300" />
										<Text fontSize="sm">Charges should be recorded on a monthly basis.</Text>
									</Stack>
								</Box>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Stack>
				<Stack spacing={{ base: 10, md: 20 }}>
					<Heading lineHeight={1.1} fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}>
						Total Shop Rate Per Hour{" "}
						<Text as={"span"} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
							${((calculateMaterialCosts() + calculateFixedCosts() + laborTotal) * (1 + sliderValue / 100)).toFixed(2)}
						</Text>{" "}
					</Heading>

					<Stack color="#262626" marginLeft={"auto"} justifyContent={"center"} w="100%">
						<PieChart
							data={[
								{ title: "One", value: handleCalculation(fixedTotal + fixedAdditional), color: "#E38627" },
								{ title: "Two", value: handleCalculation(materialTotal + materialAdditional), color: "#C13C37" },
								{ title: "Three", value: handleCalculation(laborTotal), color: "#6A2135" },
							]}
						/>
					</Stack>
					<Text fontWeight={600} fontSize={40} mb={0}>
						Breakdown
					</Text>
					<List spacing={3} marginTop="1rem!important">
						<ListItem fontSize={"1.5rem"}>
							<ListIcon as={MdCheckCircle} color="#E38627" />
							Fixed Costs:{" "}
							<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
								${(fixedTotal + fixedAdditional).toFixed(2)}
							</Text>
						</ListItem>
						<ListItem fontSize={"1.5rem"}>
							<ListIcon as={MdCheckCircle} color="#E38627" />
							Fixed Costs / Hour (2000hrs/year, 12months):{" "}
							<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
								${calculateFixedCosts().toFixed(2)}
							</Text>
						</ListItem>
						<ListItem fontSize={"1.5rem"}>
							<ListIcon as={MdCheckCircle} color="#C13C37" />
							Material Costs:{" "}
							<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
								${(materialTotal + materialAdditional).toFixed(2)}
							</Text>
						</ListItem>
						<ListItem fontSize={"1.5rem"}>
							<ListIcon as={MdCheckCircle} color="#C13C37" />
							Material Costs Per Hour:{" "}
							<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
								${calculateMaterialCosts().toFixed(2)}
							</Text>
						</ListItem>
						<ListItem fontSize={"1.5rem"}>
							<ListIcon as={MdCheckCircle} color="#6A2135" />
							Labor Costs:{" "}
							<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
								${laborTotal.toFixed(2)}
							</Text>
						</ListItem>

						<ListItem fontSize={"1.5rem"}>
							<ListIcon as={MdCheckCircle} color="#6A2135" />
							Subtotal:{" "}
							<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
								${(calculateMaterialCosts() + calculateFixedCosts() + laborTotal).toFixed(2)}
							</Text>
						</ListItem>
					</List>
				</Stack>
			</Container>
			{/* <Blur position={"absolute"} top={-10} left={-10} style={{ filter: "blur(70px)" }} /> */}
		</Box>
	);
}

export const Blur = (props) => {
	return (
		<Icon
			width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
			zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
			height="560px"
			viewBox="0 0 528 560"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle cx="71" cy="61" r="111" fill="#F56565" />
			<circle cx="244" cy="106" r="139" fill="#ED64A6" />
			<circle cy="291" r="139" fill="#ED64A6" />
			<circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
			<circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
			<circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
			<circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
		</Icon>
	);
};
