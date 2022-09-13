import {
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";

export default function SearchBar({ handleSearch }) {
	return (
		<>
			{/* <Text fontSize="0.95rem" align="left" fontWeight="bold">
				Product Search
			</Text> */}
			<Stack direction={"row"}>
				<InputGroup marginBottom={"1rem"}>
					<InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
					<Input type="text" placeholder="Search for a product" onChange={handleSearch} />
					<InputRightElement width="4.5rem"></InputRightElement>
				</InputGroup>
				<Button
					color={"#fff"}
					backgroundColor={"#319795"}
					fontSize={{ base: "sm" }}
					_hover={{
						background: "white",
						color: "teal.500",
						borderColor: "teal.500",
						border: "1px",
					}}>
					Search
				</Button>
			</Stack>
		</>
	);
}
