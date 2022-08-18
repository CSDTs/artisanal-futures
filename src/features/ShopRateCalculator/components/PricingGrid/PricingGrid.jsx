import React, { useState, useEffect } from "react";
import {
	Box,
	Stack,
	Heading,
	Text,
	Container,
	Button,
	SimpleGrid,
	TabPanel,
	TabPanels,
	Tab,
	Tabs,
	TabList,
	Slider,
	SliderMark,
	Tooltip,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";

import { PieChart } from "react-minimal-pie-chart";

import CostPanel from "../../features/CostPanel";
import FORM_DATA from "../../data/panels.json";
import AddNewCharges from "../../features/AddNewCharges";

import FormHours from "../ui/Form/FormHours";

import Breakdown from "../../Breakdown";

import { FaInfoCircle } from "react-icons/fa";

export default function PricingGrid() {
	const [tabIndex, setTabIndex] = useState(0);
	const [sliderValue, setSliderValue] = React.useState(0);
	const [showTooltip, setShowTooltip] = React.useState(false);

	const [fixedTotal, setFixedTotal] = useState(0);
	const [fixedAdditional, setFixedAdditional] = useState(0);
	const [materialAdditional, setMaterialAdditional] = useState(0);
	const [materialTotal, setMaterialTotal] = useState(0);
	const [laborTotal, setLaborTotal] = useState(0);

	const [totalCost, setTotalCost] = useState(0);
	const [hourRate, setHourRate] = useState(0);

	const [hourlyTotal, setHourlyTotal] = useState(0);

	const COST_COLORS = {
		fixed: "#E38627",
		material: "#C13C37",
		labor: "#6A2135",
	};

	const handleSliderChange = () => {
		let current = tabIndex + 1;
		setTabIndex(current > 3 ? 3 : current);
	};

	const handleTabsChange = (index) => {
		setTabIndex(index);
	};

	const handleHourlyCalculation = (cost) => {
		let calc = (cost / hourlyTotal) * 100;

		if (isFinite(calc)) return calc;
		return 0;
	};

	const setPricingHandler = (slug, isAdditional = false) => {
		if (slug === "fixed") return isAdditional ? setFixedAdditional : setFixedTotal;
		if (slug === "material") return isAdditional ? setMaterialAdditional : setMaterialTotal;
		if (slug === "labor") return isAdditional ? "" : setLaborTotal;
	};

	const calculateMonthlyCost = (isHourly = true) => {
		if (isHourly) return ((fixedTotal + fixedAdditional) / 2000) * 12 || 0;
		return fixedTotal + fixedAdditional || 0;
	};

	const calculateMaterialCosts = (isHourly = true) => {
		let val;

		if (isHourly) val = (materialTotal + materialAdditional) / hourRate || 0;
		else val = materialTotal + materialAdditional;

		if (isFinite(val)) return val;
		return 0;
	};

	const calculateLaborCosts = (isHourly = true) => {
		if (isFinite(laborTotal)) return laborTotal;
		return 0;
	};

	const calculateProfitPercentage = () => {
		return 1 + sliderValue / 100;
	};

	useEffect(() => {
		setTotalCost(calculateMonthlyCost(false) + calculateMaterialCosts(false) + laborTotal);
		setHourlyTotal(calculateMonthlyCost() + calculateMaterialCosts() + calculateLaborCosts());
	}, [fixedTotal, fixedAdditional, materialAdditional, materialTotal, laborTotal, hourRate]);

	return (
		<Box position={"relative"}>
			<Container maxW={"6xl"} mt={6}>
				<Heading mb={6}>Shop Rate Calculator</Heading>
				<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
					Calculate your costs per hour for your shop
				</Text>
			</Container>

			<Container as={SimpleGrid} maxW={"6xl"} columns={{ base: 1, md: 2 }} spacing={{ base: 10, lg: 32 }} mt={6}>
				<Stack bg={"gray.50"} rounded={"xl"} p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} maxW={{ lg: "lg" }}>
					<Tabs variant="unstyled" align="center" index={tabIndex} onChange={handleTabsChange}>
						<TabList marginLeft="auto" marginRight="auto">
							{FORM_DATA &&
								FORM_DATA.map((data) => (
									<Tab _selected={{ color: "white", bg: COST_COLORS[data.slug] }}>{data.name}</Tab>
								))}

							<Tab _selected={{ color: "white", bg: "green.400" }}>Profit</Tab>
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
											handleCost={setPricingHandler(data.slug)}
										/>
										{data.is_material_hours && <FormHours handleHours={setHourRate} />}
										{data.is_additional_available && <AddNewCharges handleCost={setPricingHandler(data.slug, true)} />}
									</TabPanel>
								))}

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
										defaultValue={0}
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
					<Heading
						lineHeight={1.1}
						fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
						textAlign={{ base: "center", md: "left" }}
					>
						Total Shop Rate Per Hour{" "}
						<Text as={"span"} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
							$
							{(
								(calculateMaterialCosts() + calculateMonthlyCost() + calculateLaborCosts()) *
								calculateProfitPercentage()
							).toFixed(2)}
						</Text>{" "}
					</Heading>

					<Stack color="#262626" marginLeft={"auto"} justifyContent={"center"} w="100%">
						{totalCost <= 0 && hourlyTotal <= 0 && (
							<PieChart data={[{ title: "Default", value: 1, color: "#a1a1a1" }]} />
						)}
						{totalCost > 0 && hourlyTotal > 0 && (
							<PieChart
								data={[
									{
										title: "Fixed Costs",
										value: handleHourlyCalculation(calculateMonthlyCost()),
										color: COST_COLORS["fixed"],
									},
									{
										title: "Material Costs",
										value: handleHourlyCalculation(calculateMaterialCosts()),
										color: COST_COLORS["material"],
									},
									{
										title: "Labor Costs",
										value: handleHourlyCalculation(calculateLaborCosts()),
										color: COST_COLORS["labor"],
									},
								]}
							/>
						)}
					</Stack>

					<Breakdown
						monthlyCost={calculateMonthlyCost}
						materialCost={calculateMaterialCosts}
						laborCost={calculateLaborCosts}
					/>
				</Stack>
			</Container>
		</Box>
	);
}
