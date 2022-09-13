import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	Heading,
	SimpleGrid,
	Spacer,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { useEffect, useId, useState } from "react";

import CostPanel from "./components/CostPanel";
import FORM_DATA from "./data/panels.json";
import AddNewExpenses from "./features/AddNewExpenses";

import FormHours from "./components/Form/FormHours";

import Breakdown from "./components/Breakdown";

import { FaHammer, FaInfoCircle, FaTshirt, FaUserAlt } from "react-icons/fa";
import ProfitsPanel from "./components/ProfitsPanel";
import HourlyPieChart from "./features/HourlyPieChart";
import CalculateUtil from "./utils/calculate.util";
export default function ShopRateCalculator() {
	const [tabIndex, setTabIndex] = useState(0);
	const [sliderValue, setSliderValue] = useState(0);
	const [showTooltip, setShowTooltip] = useState(false);

	const [fixedTotal, setFixedTotal] = useState(0);
	const [fixedAdditional, setFixedAdditional] = useState(0);
	const [materialAdditional, setMaterialAdditional] = useState(0);
	const [materialTotal, setMaterialTotal] = useState(0);
	const [laborTotal, setLaborTotal] = useState(0);

	const [totalCost, setTotalCost] = useState(0);
	const [hourRate, setHourRate] = useState(0);

	const [hourlyTotal, setHourlyTotal] = useState(0);

	const [breakdown, setBreakdown] = useState({
		monthlyCost: 0,
		monthlyHourly: 0,
		materialCost: 0,
		materialHourly: 0,
		laborHourly: 0,
	});

	const COST_COLORS = {
		fixed: "#E38627",
		material: "#C13C37",
		labor: "#6A2135",
	};

	const handleTabsChange = (index) => {
		setTabIndex(index);
	};
	const handleNextEvent = (event) => {
		if (tabIndex >= FORM_DATA.length) return;
		setTabIndex(tabIndex + 1);
	};

	const handlePrevEvent = (event) => {
		if (tabIndex <= 0) return;
		setTabIndex(tabIndex - 1);
	};

	const setPricingHandler = (slug, isAdditional = false) => {
		if (slug === "fixed") return isAdditional ? setFixedAdditional : setFixedTotal;
		if (slug === "material") return isAdditional ? setMaterialAdditional : setMaterialTotal;
		if (slug === "labor") return isAdditional ? "" : setLaborTotal;
	};

	const calculateProfitPercentage = () => {
		return 1 + sliderValue / 100;
	};

	useEffect(() => {
		let fixed = CalculateUtil.calculateMonthly(fixedTotal, fixedAdditional);
		let material = CalculateUtil.calculateMaterial(materialTotal, materialAdditional, hourRate);
		let labor = CalculateUtil.calculateLabor(laborTotal);

		setBreakdown((data) => {
			return {
				...data,
				monthlyCost: fixed.total,
				monthlyHourly: fixed.hourly,
				materialCost: material.total,
				materialHourly: material.hourly,
				laborHourly: labor,
			};
		});

		setTotalCost(fixed.total + material.total + laborTotal);
		setHourlyTotal(fixed.hourly + material.total + labor);
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
									<Tab _selected={{ color: "white", bg: COST_COLORS[data.slug] }} key={useId()}>
										{data.name}
									</Tab>
								))}

							<Tab _selected={{ color: "white", bg: "green.400" }}>Profit</Tab>
						</TabList>
						<TabPanels>
							{FORM_DATA &&
								FORM_DATA.map((data) => (
									<TabPanel key={useId()}>
										<CostPanel
											title={data.alt}
											text={data.description}
											hint={data.hint}
											fields={data.fields}
											additional={data.is_additional_available}
											handleCost={setPricingHandler(data.slug)}
										/>
										{data.is_material_hours && <FormHours handleHours={setHourRate} />}
										{data.is_additional_available && <AddNewExpenses handleCost={setPricingHandler(data.slug, true)} />}

										<Stack direction={["row"]} marginTop={"1rem"} justifyContent={"center"}>
											<FaInfoCircle color="gray.300" />
											<Text fontSize="sm">{data.hint}</Text>
										</Stack>
										<Flex minWidth="max-content" alignItems="center" gap="2" mt={"3rem"}>
											<Spacer />
											<ButtonGroup gap="2">
												<Button
													colorScheme="blue"
													variant="ghost"
													px={8}
													onClick={handlePrevEvent}
													isDisabled={tabIndex === 0}
												>
													Prev
												</Button>
												<Button
													colorScheme="blue"
													px={8}
													onClick={handleNextEvent}
													isDisabled={tabIndex === FORM_DATA.length}
												>
													Next
												</Button>
											</ButtonGroup>
										</Flex>
									</TabPanel>
								))}

							<TabPanel>
								<ProfitsPanel sliderValue={sliderValue} setSliderValue={setSliderValue} />
								<Flex minWidth="max-content" alignItems="center" gap="2" mt={"5rem"}>
									<Spacer />
									<ButtonGroup gap="2">
										<Button
											colorScheme="blue"
											variant="ghost"
											px={8}
											onClick={handlePrevEvent}
											isDisabled={tabIndex === 0}
										>
											Prev
										</Button>
										<Button
											colorScheme="blue"
											px={8}
											onClick={handleNextEvent}
											isDisabled={tabIndex === FORM_DATA.length}
										>
											Next
										</Button>
									</ButtonGroup>
								</Flex>
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
								(breakdown.materialHourly + breakdown.monthlyHourly + breakdown.laborHourly) *
								calculateProfitPercentage()
							).toFixed(2)}
						</Text>{" "}
					</Heading>

					<HourlyPieChart
						{...breakdown}
						hours={hourlyTotal}
						isValid={totalCost > 0 && hourlyTotal > 0}
						colors={COST_COLORS}
					/>
					<Breakdown {...breakdown} />
				</Stack>
			</Container>
		</Box>
	);
}
