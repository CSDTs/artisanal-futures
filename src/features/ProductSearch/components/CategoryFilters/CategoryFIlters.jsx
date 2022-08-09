import React from "react";

import { Text, Divider } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup, Stack, Heading } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

export default function CategoryFilters({ attributes, handleTagChange }) {
	return (
		<>
			<Stack spacing={1} direction="column">
				<Heading as="h5" size="sm">
					Shop By Artisan
				</Heading>
				<Checkbox
					onChange={(e) => {
						console.log(e.target.value);
					}}
					value="Dabls Mbad African Bead Museum">
					Dabls' MBAD African Bead Museum
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="African Futurist Collective">
					African Futurist Collective
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Cactus Harmony">
					Cactus Harmony
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Visual Noise">
					Visual Noise
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Xclusive Virgin Hair">
					Xclusive Virgin Hair
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Akoma">
					Akoma
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Willow Run Acres">
					Willow Run Acres
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Olive Mode Boutique">
					Olive Mode Boutique
				</Checkbox>
			</Stack>

			<Divider marginTop={"0.5rem"} marginBottom={"0.5rem"} />
			<Text fontWeight={800}>Shop By Product Category</Text>
			<Stack spacing={1} direction="column">
				<Checkbox onChange={handleTagChange} value="Clothing">
					Clothing
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Jewelry">
					Jewelry
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Accessories">
					Accessories
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Agriculture">
					Agriculture
				</Checkbox>
				<Checkbox onChange={handleTagChange} value="Education">
					Education
				</Checkbox>
			</Stack>

			<Divider marginTop={"0.5rem"} marginBottom={"0.5rem"} />
			<Text fontWeight={800}>Shop By Store Attributes</Text>
			<Stack spacing={1} direction="column">
				{attributes &&
					attributes.map((principle) => (
						<Checkbox key={`${principle.name}-opt`} value={principle.name} onChange={handleTagChange}>
							{principle.name}
						</Checkbox>
					))}
			</Stack>
		</>
	);
}
