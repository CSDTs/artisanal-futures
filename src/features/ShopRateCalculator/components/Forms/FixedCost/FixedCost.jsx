import { useState } from "react";
import { Box, Stack, Input, InputGroup, InputLeftElement, InputRightElement, Button, Text } from "@chakra-ui/react";
import { MdOutlineHomeWork, MdOutlineElectricalServices, MdLocalGasStation, MdNewReleases } from "react-icons/md";
import { FaTrash, FaHammer, FaPlus, FaInfoCircle } from "react-icons/fa";
import FormInput from "../FormInput/FormInput";
export default function FixedCost(props) {
	const [tabIndex, setTabIndex] = useState(0);
	const [formValues, setFormValues] = useState([]);
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

	return (
		<Box as={"form"} mt={10}>
			<Stack spacing={4}>
				<Stack spacing={4}>
					<FormInput Icon={MdOutlineHomeWork} title={"Monthly Rent"} handleCost={props.handleCost} />
					<FormInput Icon={MdLocalGasStation} title={"Gas Bill"} handleCost={props.handleCost} />
					<FormInput Icon={MdOutlineElectricalServices} title={"Electric Bill"} handleCost={props.handleCost} />
					<FormInput Icon={FaHammer} title={"Maintenance Costs"} handleCost={props.handleCost} />

					{formValues &&
						formValues.map((element, index) => (
							<>
								<InputGroup>
									<InputLeftElement pointerEvents="none" children={<MdNewReleases color="gray.300" />} />
									<Input
										type="text"
										placeholder={`Additional Fixed Cost ${index}`}
										bg={"gray.100"}
										border={0}
										color={"gray.500"}
										_placeholder={{
											color: "gray.500",
										}}
										onChange={props.handleCost}
									/>

									<InputRightElement onClick={() => removeFormFields(index)} children={<FaTrash color="gray.300" />} />
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
		</Box>
	);
}
