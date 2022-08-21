import { Box, FormControl, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useId, useRef, useState } from "react";

import { FaHammer, FaInfoCircle, FaTshirt, FaUserAlt } from "react-icons/fa";
import { MdLocalGasStation, MdNewReleases, MdOutlineElectricalServices, MdOutlineHomeWork } from "react-icons/md";
import FormInput from "./Form/FormInput";

const handleFieldIcon = (data) => {
	if (data == "MdOutlineHomeWork") return MdOutlineHomeWork;
	if (data == "MdLocalGasStation") return MdLocalGasStation;
	if (data == "MdOutlineElectricalServices") return MdOutlineElectricalServices;
	if (data == "FaHammer") return FaHammer;
	if (data == "FaTshirt") return FaTshirt;
	if (data == "FaUserAlt") return FaUserAlt;
	return MdNewReleases;
};
export default function CostPanel({ title, text, hint, fields, handleCost }) {
	const [total, setTotal] = useState(0);
	const refForm = useRef(null);

	useEffect(() => {
		if (handleCost) handleCost(total);
	}, [total]);

	const recalculateTotal = () => {
		let total = 0;
		let product = 1;
		if (!refForm) return;

		for (let elem of refForm.current.elements) {
			if (title === "Labor Costs") product = product * parseFloat(elem.value);
			else total = total + parseFloat(elem.value || 0);
		}
		if (title === "Labor Costs") total = product || 0;

		setTotal(total);
	};

	return (
		<>
			<Stack spacing={4} marginTop="1rem">
				<Heading color={"gray.800"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
					{title}
				</Heading>
				<Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
					{text}
				</Text>
			</Stack>

			<Box as="form" mt={10} ref={refForm} onChange={recalculateTotal}>
				<FormControl>
					<Stack spacing={4}>
						{fields &&
							fields.map((field) => <FormInput Icon={handleFieldIcon(field.icon)} title={field.name} key={useId()} />)}
					</Stack>
				</FormControl>
			</Box>
		</>
	);
}
