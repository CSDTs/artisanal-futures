import React, { useState, useEffect } from "react";
import { Text, Select, InputGroup, InputLeftElement, InputRightElement, Input, Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import CategoryDrawer from "../CategoryDrawer/CategoryDrawer";

export default function Filter({ attributes, handleChange, handleSearch, handleTags }) {
	const [products, setProducts] = useState([]);
	const [filtered, setFiltered] = useState([]);

	const handleOnChange = (e) => {
		console.log(e.target.value);
		setFilteredProducts(e.target.value);
	};
	return (
		<>
			<Text fontSize="0.95rem" align="left" fontWeight="bold">
				Product Search
			</Text>
			<InputGroup marginBottom={"1rem"}>
				<InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
				<Input type="text" placeholder="Search for a product" onChange={handleSearch} backgroundColor="white" />
				<InputRightElement width="4.5rem">
					<Button
						h="100%"
						size="sm"
						color={"#fff"}
						backgroundColor={"#319795"}
						_hover={{
							background: "white",
							color: "teal.500",
							borderColor: "teal.500",
							border: "1px",
						}}>
						Search
					</Button>
				</InputRightElement>
			</InputGroup>

			{/* <Text fontSize="1.2rem" mb="0" mt="2rem" align="left">
				Filter by store attributes
			</Text>
			<InputGroup>
				<Select mt="0" pt="0" placeholder="Choose a store attribute" onChange={handleChange} backgroundColor="white">
					{attributes && attributes.map((principle) => <option value={principle.name}>{principle.name}</option>)}
				</Select>
				<InputRightElement width="6rem">
					<CategoryDrawer attributes={attributes} handleTagChange={handleTags} />
				</InputRightElement>
			</InputGroup> */}
		</>
	);
}
