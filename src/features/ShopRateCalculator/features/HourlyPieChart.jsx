import { Stack } from "@chakra-ui/react";

import { PieChart } from "react-minimal-pie-chart";

import CalculateUtil from "../utils/calculate.util";

export default function HourlyPieChart({ monthlyHourly, materialHourly, laborHourly, hours, isValid, colors }) {
	return (
		<Stack color="#262626" marginLeft={"auto"} justifyContent={"center"} w="100%">
			{!isValid ? (
				<PieChart data={[{ title: "Default", value: 1, color: "#a1a1a1" }]} />
			) : (
				<PieChart
					data={[
						{
							title: "Fixed Costs",
							value: CalculateUtil.calculateHourlyRatio(monthlyHourly, hours),
							color: colors["fixed"],
						},
						{
							title: "Material Costs",
							value: CalculateUtil.calculateHourlyRatio(materialHourly, hours),
							color: colors["material"],
						},
						{
							title: "Labor Costs",
							value: CalculateUtil.calculateHourlyRatio(laborHourly, hours),
							color: colors["labor"],
						},
					]}
				/>
			)}
		</Stack>
	);
}
