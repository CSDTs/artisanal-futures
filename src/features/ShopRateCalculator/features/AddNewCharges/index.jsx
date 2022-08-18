import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { MdOutlineHomeWork, MdOutlineElectricalServices, MdLocalGasStation, MdNewReleases } from "react-icons/md";
import BookView from "./bookView";
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
export default function AddNewCharges({ handleCost }) {
	const [formValues, setFormValues] = useState([]);
	let addFormFields = () => {
		setFormValues([...formValues, { value: 0 }]);
	};

	let removeFormFields = (i, test) => {
		let newFormValues = [...formValues];

		newFormValues.splice(i, 1);

		setFormValues(newFormValues);
	};

	const createField = (val, index) => {
		return (
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
					handleCost={(e) => console.log(e)}
					defaultValue={val}
				/>

				<InputRightElement onClick={() => removeFormFields(index, element)} children={<FaTrash color="gray.300" />} />
			</InputGroup>
		);
	};
	useEffect(() => {}, [formValues]);
	return (
		<>
			{/* <Stack direction={["column"]} spacing={4}>
				{formValues &&
					formValues.map((element, index) => (
						<>
							{
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
										handleCost={(e) => console.log(e)}
										onChange={(e) => {
											element.value = parseFloat(e.target.value);
										}}
										defaultValue={element.value}
									/>

									<InputRightElement
										onClick={() => removeFormFields(index, element)}
										children={<FaTrash color="gray.300" />}
									/>
								</InputGroup>
							}
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
			</Stack> */}
			<BookView handleCost={handleCost} />
		</>
	);
}
