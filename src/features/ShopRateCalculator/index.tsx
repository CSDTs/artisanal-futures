import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useId, useMemo, useState } from "react";

import AddNewExpenses from "./components/AddNewExpenses";
import CostPanel from "./components/Panels/CostPanel";
import FORM_DATA from "./data/panels.json";

import Breakdown from "./components/Breakdown";

import { FaInfoCircle } from "react-icons/fa";

import HourlyPieChart from "./components/HourlyPieChart";
import ProfitsPanel from "./components/Panels/ProfitsPanel";
import CalculateUtil from "./utils/calculate.util";

export default function ShopRateCalculator() {
	const [tabIndex, setTabIndex] = useState(0);
	const [sliderValue, setSliderValue] = useState(0);

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
		profits: "#f472b6",
	};

	const handleTabsChange = (index: number) => {
		setTabIndex(index);
	};
	const handleNextEvent = () => {
		if (tabIndex >= FORM_DATA.length) return;
		setTabIndex(tabIndex + 1);
	};

	const handlePrevEvent = () => {
		if (tabIndex <= 0) return;
		setTabIndex(tabIndex - 1);
	};

	const setPricingHandler = (slug: string) => {
		if (slug === "fixed") return setFixedTotal;
		if (slug === "material") return setMaterialTotal;
		if (slug === "labor") return setLaborTotal;
	};

	const setAdditionalHandler = (slug: string) => {
		if (slug === "fixed") return setFixedAdditional;
		if (slug === "material") return setMaterialAdditional;
		return;
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

	const formattedPrice = useMemo(() => {
		return (
			(breakdown.materialHourly + breakdown.monthlyHourly + breakdown.laborHourly) *
			(1 + sliderValue / 100)
		).toFixed(2);
	}, [breakdown, sliderValue]);

	return (
		<section>
			<div className="grid max-w-6xl grid-cols-1 gap-10 px-4 mx-auto lg:gap-32 md:grid-cols-2">
				<div className="flex flex-col ">
					<div className="px-4 mt-6">
						<h1 className="mb-6 text-4xl font-bold">Shop Rate Calculator</h1>
						<p className="mt-1 mb-8 text-lg font-semibold">Calculate your costs per hour for your shop</p>
					</div>
					<div className="flex max-w-lg gap-8 p-4 mx-auto rounded-xl sm:p-6 md:p-8">
						<Tabs variant="unstyled" align="center" index={tabIndex} onChange={handleTabsChange}>
							<TabList marginLeft="auto" marginRight="auto">
								{FORM_DATA &&
									FORM_DATA.map((data) => (
										<Tab
											_selected={{
												color: "white",
												bg: `${COST_COLORS[data.slug as keyof typeof COST_COLORS]}fa`,

												borderBottom: `2px solid ${COST_COLORS[data.slug as keyof typeof COST_COLORS]}`,
											}}
											color={COST_COLORS[data.slug as keyof typeof COST_COLORS]}
											className="font-semibold"
											key={useId()}>
											{data.name}
										</Tab>
									))}
							</TabList>
							<TabPanels>
								{FORM_DATA &&
									FORM_DATA.map((data) => (
										<TabPanel
											key={useId()}
											className="bg-slate-50 "
											borderTop={`2px solid ${COST_COLORS[data.slug as keyof typeof COST_COLORS]}`}>
											{data?.profit_modifier && (
												<ProfitsPanel sliderValue={sliderValue} setSliderValue={setSliderValue} />
											)}
											{!data.profit_modifier && (
												<>
													<CostPanel
														title={data.alt}
														text={data.description}
														hint={data.hint}
														fields={data.fields}
														additional={data.is_additional_available}
														handleCost={setPricingHandler(data.slug)}
														includesHours={data.is_material_hours ? setHourRate : null}
													/>

													{data.is_additional_available && (
														<AddNewExpenses
															handleCost={setAdditionalHandler(data.slug) as Dispatch<SetStateAction<number>>}
														/>
													)}

													<div className="flex flex-row justify-center mt-4">
														<FaInfoCircle color="gray.300" />
														<p className="text-sm">{data.hint}</p>
													</div>
												</>
											)}

											<div className="flex items-center justify-end gap-2 mt-12 min-w-max">
												<button
													className="px-8 py-2 font-semibold text-blue-400 transition-all rounded-md disabled:text-opacity-40 decoration-0 hover:text-blue-600 hover:bg-blue-50"
													onClick={handlePrevEvent}
													disabled={tabIndex === 0}>
													Prev
												</button>
												<button
													className="px-8 py-2 font-semibold text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700"
													onClick={handleNextEvent}
													disabled={tabIndex === FORM_DATA.length}>
													Next
												</button>
											</div>
										</TabPanel>
									))}
							</TabPanels>
						</Tabs>
					</div>
				</div>
				<div className="flex flex-col gap-10 md:gap-20">
					<h2 className="text-4xl leading-tight text-center md:text-4xl lg:text-5xl md:text-left">
						Total Shop Rate Per Hour{" "}
						<span className="font-semibold text-transparent bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text">
							${formattedPrice}
						</span>{" "}
					</h2>

					<HourlyPieChart
						{...breakdown}
						hours={hourlyTotal}
						isValid={totalCost > 0 && hourlyTotal > 0}
						colors={COST_COLORS}
					/>
					<Breakdown {...breakdown} />
				</div>
			</div>
		</section>
	);
}
