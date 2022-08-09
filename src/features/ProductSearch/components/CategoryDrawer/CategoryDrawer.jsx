import React from "react";

import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Input,
	Text,
	Divider,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

export default function CategoryDrawer({ attributes, handleTagChange }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	return (
		<>
			<Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
				Open
			</Button>
			<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Hello User!</DrawerHeader>

					<DrawerBody>
						<Text fontWeight={800}>Shop By Artisan</Text>

						<Stack spacing={1} direction="column">
							<Checkbox onChange={handleTagChange} value="Dabls Mbad African Bead Museum">
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
					</DrawerBody>

					<DrawerFooter>
						<Button colorScheme="blue">Filter</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
