import { Text, List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
export default function Breakdown({ monthlyCost, materialCost, laborCost }) {
	const parsePrice = (price) => {
		return `$${price.toFixed(2)}`;
	};

	return (
		<>
			<Text fontWeight={600} fontSize={40} mb={0}>
				Breakdown
			</Text>

			<List spacing={3} marginTop="1rem!important">
				<ListItem fontSize={"1.5rem"}>
					<ListIcon as={MdCheckCircle} color="#E38627" />
					Fixed Costs:{" "}
					<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
						{parsePrice(monthlyCost(false))} / {parsePrice(monthlyCost())} per hour
					</Text>
				</ListItem>

				<ListItem fontSize={"1.5rem"}>
					<ListIcon as={MdCheckCircle} color="#C13C37" />
					Material Costs:{" "}
					<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
						{parsePrice(materialCost(false))} / {parsePrice(materialCost())} per hour
					</Text>
				</ListItem>
				<ListItem fontSize={"1.5rem"}>
					<ListIcon as={MdCheckCircle} color="#6A2135" />
					Labor Costs:{" "}
					<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
						{parsePrice(laborCost())} per hour
					</Text>
				</ListItem>

				<ListItem fontSize={"1.5rem"}>
					<ListIcon as={MdCheckCircle} color="#6A2135" />
					Subtotal:{" "}
					<Text as={"span"} bgGradient="linear(to-r, blue.400,green.400)" bgClip="text">
						{parsePrice(monthlyCost() + materialCost() + laborCost())} per hour
					</Text>
				</ListItem>
			</List>
		</>
	);
}
