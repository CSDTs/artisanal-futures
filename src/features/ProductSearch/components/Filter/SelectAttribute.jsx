import React, { useState, useEffect } from "react";
import { Text, Select, InputGroup, InputLeftElement, InputRightElement, Input, Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
export default function SelectAttribute({ attributes }) {
	return (
		<>
			<Text fontSize="1.2rem" mb="0" mt="2rem" align="left">
				Filter by store attributes
			</Text>
			<Select mt="0" pt="0" placeholder="Choose a store attribute">
				{attributes && attributes.map((principle) => <option value={principle.name}>{principle.name}</option>)}
			</Select>
		</>
	);
}
