import { List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { MdCheckCircle } from "react-icons/md";
import CalculateUtil from "../utils/calculate.util";

interface IProps {
	monthlyCost: number;
	monthlyHourly: number;
	materialCost: number;
	materialHourly: number;
	laborHourly: number;
}
const Breakdown: FC<IProps> = ({ monthlyCost, monthlyHourly, materialCost, materialHourly, laborHourly }) => {
	const gradient = "linear(to-r, blue.400,green.400)";

	const calculatedPrices = useMemo(() => {
		return {
			fixed_monthly: CalculateUtil.formatPrice(monthlyCost),
			fixed_hourly: CalculateUtil.formatPrice(monthlyHourly),
			material_monthly: CalculateUtil.formatPrice(materialCost),
			material_hourly: CalculateUtil.formatPrice(materialHourly),
			labor_hourly: CalculateUtil.formatPrice(laborHourly),
			subtotal: CalculateUtil.formatPrice(monthlyHourly + materialHourly + laborHourly),
		};
	}, [monthlyCost, monthlyHourly, materialCost, materialHourly, laborHourly]);

	return (
		<section className="w-full">
			<h3 className="mb-8 text-4xl font-semibold">Breakdown</h3>

			<table className="w-full text-xl table-auto">
				<thead>
					<tr>
						<td>Cost</td>
						<td>Hourly Rate</td>
					</tr>
				</thead>
				<tbody>
					<tr className="">
						<td className="  before:content-['⬤'] before:text-[#E38627] before:px-1 "> Fixed </td>
						<td className="flex justify-between">
							{calculatedPrices.fixed_monthly}{" "}
							<span className="px-1 ml-4 text-base rounded-md bg-slate-200">{calculatedPrices.fixed_hourly} Total</span>
						</td>
					</tr>
					<tr className="">
						<td className="  before:content-['⬤'] before:text-[#C13C37] before:px-1"> Material </td>
						<td className="flex justify-between ">
							{calculatedPrices.material_monthly}{" "}
							<span className="px-1 ml-4 text-base rounded-md bg-slate-200 ">
								{calculatedPrices.material_hourly} Total
							</span>{" "}
						</td>
					</tr>
					<tr className="">
						<td className="  before:content-['⬤'] before:text-[#6A2135] before:px-1"> Labor </td>
						<td>{calculatedPrices.labor_hourly} </td>
					</tr>
					<tr className="">
						<td className="  before:content-['⬤'] before:text-green-500 before:px-1"> Subtotal </td>
						<td>{calculatedPrices.subtotal} </td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export default Breakdown;
