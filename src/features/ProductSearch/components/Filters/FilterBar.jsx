import {
	Button,
	ButtonGroup,
	Checkbox,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	FormControl,
	FormHelperText,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	useColorModeValue,
	useDisclosure,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsFilter } from "react-icons/bs";
import ProductService from "../../services/product.service";

export default function FilterBar({
	availableArtisans,
	attributes,
	filteredTags,
	handleTagGroupChange,
	setProducts,
	setFilteredTags,
	handleTagRemoval,
}) {
	const btnRef = useRef();
	const keywordRef = useRef();
	const checkboxArtisans = useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [fetching, isFetching] = useState(false);

	const clearFilters = () => {
		filteredTags([]);
	};

	return (
		<>
			<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Filters</DrawerHeader>

					<DrawerBody>
						<Stack spacing={1} direction="column" ref={checkboxArtisans}>
							<Heading as="h5" size="sm" align={"left"}>
								Shop By Artisan
							</Heading>

							{availableArtisans &&
								availableArtisans.length > 0 &&
								availableArtisans.map((artisan) => (
									<Checkbox
										onChange={handleTagGroupChange}
										value={artisan}
										isChecked={filteredTags.includes(artisan)}
										key={artisan}>
										{artisan}
									</Checkbox>
								))}
						</Stack>
						<Divider marginTop={"1rem"} marginBottom={"1rem"} />
						<Stack spacing={1} direction="column">
							<Heading as="h5" size="sm" align={"left"}>
								Shop By Store Attributes
							</Heading>
							{attributes &&
								attributes.length > 0 &&
								attributes.map((principle) => (
									<Checkbox
										key={`${principle}-opt`}
										value={principle}
										onChange={handleTagGroupChange}
										isChecked={filteredTags.includes(principle)}>
										{principle}
									</Checkbox>
								))}
						</Stack>
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose} w={"50%"}>
							Cancel
						</Button>
						<Button colorScheme="blue" w={"50%"} onClick={onClose}>
							Apply
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			<Flex direction={"row"} justifyContent={"space-between"}>
				<Wrap spacing={{ base: 0, md: 4 }} align="center">
					<WrapItem>
						<Button ref={btnRef} colorScheme="teal" onClick={onOpen} fontSize={{ base: "sm" }}>
							<BsFilter />
							&nbsp;All Filters
						</Button>
					</WrapItem>
					{/* TODO: Add clear selected filters functionality */}
					<WrapItem>
						<Button
							colorScheme="teal"
							fontSize={"sm"}
							variant="link"
							onClick={() => {
								setFilteredTags("");
							}}
							// mb={4}
							py={"auto"}>
							(Clear Selected)
						</Button>
					</WrapItem>
				</Wrap>

				<Stack direction={"row"}>
					<FormControl marginBottom={"1rem"}>
						<InputGroup>
							<InputLeftElement pointerEvents="none" children={<BsFilter color="gray.300" />} />
							<Input type="text" placeholder="Sort products by keyword" ref={keywordRef} fontSize={{ base: "sm" }} />
						</InputGroup>

						<FormHelperText>Clear your filters for best results</FormHelperText>
					</FormControl>

					<Button
						isLoading={fetching}
						px={8}
						color={"#fff"}
						backgroundColor={"#319795"}
						_hover={{
							background: "white",
							color: "teal.500",
							borderColor: "teal.500",
							border: "1px",
						}}
						fontSize={{ base: "sm" }}
						onClick={() => {
							ProductService.getSortedProductResult(keywordRef.current.value || "dress", isFetching).then((data) => {
								setProducts(data);
							});
						}}>
						Sort using AI
					</Button>
				</Stack>
			</Flex>

			<HStack spacing={4}>
				{filteredTags &&
					filteredTags.map((tag) => (
						<Tag size={"sm"} key={tag} borderRadius="full" variant="outline" colorScheme="teal">
							<TagLabel>{tag}</TagLabel>
							<TagCloseButton
								onClick={(e) => {
									handleTagRemoval(tag);
								}}
							/>
						</Tag>
					))}
			</HStack>
		</>
	);
}
