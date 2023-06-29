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
import ArtisanField from "./ArtisansField";
import AttributeField from "./AttributeField";
import SortUsingAI from "./SortUsingAI";
import Tags from "./Tags";

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
	const keywordRef = useRef<HTMLInputElement | null>(null);
	const checkboxArtisans = useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [fetching, isFetching] = useState(false);

	const clearFilters = () => {
		filteredTags([]);
	};

	const filterWithAI = () => {
		ProductService.getSortedProductResult(keywordRef?.current?.value || "dress", isFetching).then((data) => {
			setProducts(data);
		});
	};

	return (
		<>
			<div className="md:hidden w-full">
				<div className="flex flex-row w-full">
					<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>Filters</DrawerHeader>

							<DrawerBody>
								<fieldset>
									<legend className="text-sm font-semibold leading-6 text-gray-900">Shop By Artisan</legend>
									<div className="mt-6 space-y-3">
										{availableArtisans &&
											availableArtisans.length > 0 &&
											availableArtisans.map((artisan) => (
												<div className="relative flex gap-x-3">
													<div className="flex h-6 items-center">
														<input
															id={`${artisan}-opt`}
															name={`${artisan}-opt`}
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
															onChange={handleTagGroupChange}
															value={artisan}
															checked={filteredTags.includes(artisan)}
														/>
													</div>
													<div className="text-sm leading-6">
														<label htmlFor={`${artisan}-opt`} className="font-medium text-gray-900">
															{artisan}
														</label>
													</div>
												</div>
											))}
									</div>
								</fieldset>
								<hr className="my-6" />
								<fieldset>
									<legend className="text-sm font-semibold leading-6 text-gray-900">Shop By Store Attributes</legend>
									<div className="mt-6 space-y-3">
										{attributes &&
											attributes.length > 0 &&
											attributes.map((principle) => (
												<div className="relative flex gap-x-3">
													<div className="flex h-6 items-center">
														<input
															id={`${principle}-opt`}
															name={`${principle}-opt`}
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
															onChange={handleTagGroupChange}
															value={principle}
															checked={filteredTags.includes(principle)}
														/>
													</div>
													<div className="text-sm leading-6">
														<label htmlFor={`${principle}-opt`} className="font-medium text-gray-900">
															{principle}
														</label>
													</div>
												</div>
											))}
									</div>
								</fieldset>
							</DrawerBody>
						</DrawerContent>
					</Drawer>

					<div className="flex justify-between w-full">
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
									<Input
										type="text"
										placeholder="Sort products by keyword"
										ref={keywordRef}
										fontSize={{ base: "sm" }}
									/>
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
								onClick={filterWithAI}>
								Sort using AI
							</Button>
						</Stack>
					</div>
				</div>

				<Tags tags={filteredTags} handleRemoval={handleTagRemoval} />
			</div>

			<nav className="hidden md:flex">
				<div className="flex flex-col gap-1">
					<SortUsingAI fetching={fetching} handleOnClick={filterWithAI} ref={keywordRef} />
					<hr className="my-6" />
					<AttributeField attributes={attributes} filteredTags={filteredTags} handleChange={handleTagGroupChange} />
					<hr className="my-6" />
					<ArtisanField artisans={availableArtisans} filteredTags={filteredTags} handleChange={handleTagGroupChange} />
				</div>
			</nav>
		</>
	);
}
