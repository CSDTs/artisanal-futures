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
	FormControl,
	Slider,
	SliderMark,
	Tooltip,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { FaTrash, FaHammer, FaPlus, FaInfoCircle, FaTshirt } from "react-icons/fa";
import { MdOutlineHomeWork, MdOutlineElectricalServices, MdLocalGasStation, MdNewReleases } from "react-icons/md";
import FormInput from "../../components/ui/Form/FormInput";
import { useForm } from "react-hook-form";
const handleFieldIcon = (data) => {
	if (data == "MdOutlineHomeWork") return MdOutlineHomeWork;
	if (data == "MdLocalGasStation") return MdLocalGasStation;
	if (data == "MdOutlineElectricalServices") return MdOutlineElectricalServices;
	if (data == "FaHammer") return FaHammer;
	if (data == "FaTshirt") return FaTshirt;
	return MdNewReleases;
};
export default function CostPanel({ title, text, hint, fields, handleCost }) {
	const [total, setTotal] = useState(0);
	const refForm = useRef(null);

	useEffect(() => {
		handleCost(total);
	}, [total]);

	function recalculateCostTotals() {
		let total = 0;
		let hours = 0;

		if (title === "Labor Costs") {
			if (refForm) {
				let product = 1;
				for (let elem of refForm.current.elements) {
					product = product * parseFloat(elem.value || 1);
				}

				total = product;
			}
		} else {
			if (refForm) {
				for (let elem of refForm.current.elements) {
					total = total + parseFloat(elem.value || 0);
				}
			}
		}

		setTotal(total);
	}
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

			<Box as="form" mt={10} ref={refForm} onChange={recalculateCostTotals}>
				<FormControl>
					<Stack spacing={4}>
						{fields &&
							fields.map((field) => (
								<FormInput Icon={handleFieldIcon(field.icon)} title={field.name} handleCost={(e) => console.log(e)} />
							))}
					</Stack>
				</FormControl>
			</Box>

			<Stack direction={["row"]} marginTop={"1rem"} justifyContent={"center"}>
				<FaInfoCircle color="gray.300" />
				<Text fontSize="sm">{hint}</Text>
			</Stack>
		</>
	);
}
