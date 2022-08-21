import { List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import CalculateUtil from "../utils/calculate.util";

export default function Breakdown({ monthlyCost, monthlyHourly, materialCost, materialHourly, laborHourly }) {
	const gradient = "linear(to-r, blue.400,green.400)";
	return (
		<>
			<Text fontWeight={600} fontSize={40} mb={0}>
				Breakdown
			</Text>

			<List spacing={3} marginTop="1rem!important">
				<ListItem fontSize={"1.5rem"}>
					<ListIcon as={MdCheckCircle} color="#E38627" />
					Fixed Costs:{" "}
					<Text as={"span"} bgGradient={gradient} bgClip="text">
						{CalculateUtil.formatPrice(monthlyCost)} / {CalculateUtil.formatPrice(monthlyHourly)} per hour
					</Text>
				</ListItem>

				<ListItem fontSize={"1.5rem"}>
					<ListIcon as={MdCheckCircle} color="#C13C37" />
					Material Costs:{" "}
					<Text as={"span"} bgGradient={gradient} bgClip="text">
						{CalculateUtil.formatPrice(materialCost)} / {CalculateUtil.formatPrice(materialHourly)} per hour
					</Text>
				</ListItem>
				<ListItem fontSize={"1.5rem"}>
					<ListIcon as={MdCheckCircle} color="#6A2135" />
					Labor Costs:{" "}
					<Text as={"span"} bgGradient={gradient} bgClip="text">
						{CalculateUtil.formatPrice(laborHourly)} per hour
					</Text>
				</ListItem>

				<ListItem fontSize={"1.5rem"}>
					<ListIcon as={MdCheckCircle} color="#6A2135" />
					Subtotal:{" "}
					<Text as={"span"} bgGradient={gradient} bgClip="text">
						{CalculateUtil.formatPrice(monthlyHourly + materialHourly + laborHourly)} per hour
					</Text>
				</ListItem>
			</List>
		</>
	);
}
