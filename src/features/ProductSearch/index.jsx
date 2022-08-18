import { useState, useEffect, useRef } from "react";

import {
	Container,
	Box,
	Text,
	Image,
	Link,
	Stack,
	Checkbox,
	Divider,
	Heading,
	Drawer,
	DrawerBody,
	Flex,
	useColorModeValue,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Input,
	FormControl,
	FormLabel,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";

import ProductGrid from "./Grid/Grid";
import Filter from "./components/Filter/Filter";
import useSWR from "swr";
import axios from "axios";
import ProductCard from "../../components/ui/Card/ProductCard";

import { BsFilter } from "react-icons/bs";
// import CategoryDrawer from "./components/CategoryDrawer/CategoryDrawer";
// import CategoryFilters from "./components/CategoryFilters/CategoryFilters";
import Layout from "./Grid/Layout";
const FilterArtisan = (text, artisan) => {
	artisan = artisan.toLowerCase();
	text = text.toLowerCase();

	return artisan.includes(text);
};

const AdjustText = (text, key) => {
	key = key.toLowerCase();
	text = text.toLowerCase();

	return key.includes(text);
};

const createQuery = (keyword = "dress") => {
	return {
		query: {
			content: keyword,
		},
		response_model: [
			{
				name: "",
				description: "",
				principles: "",
				the_artisan: "",
				url: "",
				image: "",
				craftID: "",
				assessment: [],
			},
		],
	};
};

export default function ProductSearch() {
	const [products, setProducts] = useState([]);
	const [apiProducts, setApiProducts] = useState();
	const [attributes, setAttributes] = useState([]);
	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [fetching, isFetching] = useState(false);
	// const [selectedAttribute, setSelectedAttribute] = useState("");

	// Each option has its own state for filtering
	const [selectedAttribute, setSelectedAttribute] = useState("All");
	const [filteredTags, setFilteredTags] = useState([]);

	//Handle the category filtering
	const handleAttributeChange = (event) => {
		setSelectedAttribute(event.target.value);
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleTagGroupChange = (event) => {
		let tags = [...filteredTags];
		let checkValue = event.target.value;

		let type = event.target;

		if (tags.includes(checkValue)) tags = tags.filter((tag) => tag != checkValue);
		else tags.push(checkValue);
		setFilteredTags(tags);
	};

	useEffect(() => {
		//If user doesn't do anything, just return the set of apps as is.

		if (selectedAttribute === "All" && filteredTags.length == 0 && search == "") {
			setFiltered(apiProducts ? apiProducts : products);
			return;
		}

		//Create the filtered list of apps
		const current = products.filter((app) => {
			let description = app.description.toLowerCase();

			//Category check
			// let cat = selectedAttribute == "All" ? true : app.principles.indexOf(selectedAttribute) != -1;

			let term = AdjustText(search, app.name);
			//Tag check
			let res =
				filteredTags.length == 0
					? true
					: filteredTags.reduce((acc, tag) => {
							return acc || AdjustText(tag, app.the_artisan) || AdjustText(tag, app.principles);
					  }, false);
			return res && term;
		});

		setFiltered(current);
	}, [selectedAttribute, filteredTags, search, apiProducts]);

	const fetchProductOrder = (keyword = "dress") => {
		isFetching(true);
		console.log("Fetching data...please wait...");

		axios.post("https://api.artisanalfutures.org/product-search-with-assessment/", createQuery(keyword)).then((res) => {
			setApiProducts(res.data);
			console.log("Finished fetching");
			isFetching(false);
		});
	};

	const fetchProducts = async () => {
		//TODO Replace with final endpoint
		const res = await fetch("api/ecodata.json");
		const data = await res.json();
		setProducts(data);
		setFiltered(data);
	};
	const fetchAttributes = async () => {
		//TODO Replace with final endpoint
		const res = await fetch("api/principles.json");
		const data = await res.json();
		setAttributes(data);
	};

	const fetchSearch = (inputData) => {
		return FilterArtisan();
	};

	useEffect(() => {
		fetchProducts();
		fetchAttributes();
		// fetchSearch();
	}, []);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const keywordRef = useRef();
	const checkboxArtisans = useRef(null);

	const initSelectedTags = () => {
		onOpen();
	};
	return (
		<Container maxW={"6xl"} mt={6}>
			<Heading mb={6}>Products</Heading>

			{/* <Text fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wide" color="teal.600">
				Artisanal Futures Products
			</Text> */}
			<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
				Search through all our artisans' products and support small businesses
			</Text>
			<Filter
				attributes={attributes}
				products={products}
				handleChange={handleAttributeChange}
				handleSearch={handleSearchChange}
				handleTags={handleTagGroupChange}
			/>

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
							<Checkbox
								onChange={handleTagGroupChange}
								value="Dabls Mbad African Bead Museum"
								isChecked={filteredTags.includes("Dabls Mbad African Bead Museum")}
							>
								Dabls' MBAD African Bead Museum
							</Checkbox>
							<Checkbox
								onChange={handleTagGroupChange}
								value="African Futurist Collective"
								isChecked={filteredTags.includes("African Futurist Collective")}
							>
								African Futurist Collective
							</Checkbox>
							<Checkbox
								onChange={handleTagGroupChange}
								value="Cactus Harmony"
								isChecked={filteredTags.includes("Cactus Harmony")}
							>
								Cactus Harmony
							</Checkbox>
							<Checkbox
								onChange={handleTagGroupChange}
								value="Visual Noise"
								isChecked={filteredTags.includes("Visual Noise")}
							>
								Visual Noise
							</Checkbox>
							<Checkbox
								onChange={handleTagGroupChange}
								value="Xclusive Virgin Hair"
								isChecked={filteredTags.includes("Xclusive Virgin Hair")}
							>
								Xclusive Virgin Hair
							</Checkbox>
							<Checkbox onChange={handleTagGroupChange} value="Akoma" isChecked={filteredTags.includes("Akoma")}>
								Akoma
							</Checkbox>
							<Checkbox
								onChange={handleTagGroupChange}
								value="Willow Run Acres"
								isChecked={filteredTags.includes("Willow Run Acres")}
							>
								Willow Run Acres
							</Checkbox>
							<Checkbox
								onChange={handleTagGroupChange}
								value="Olive Mode Boutique"
								isChecked={filteredTags.includes("Olive Mode Boutique")}
							>
								Olive Mode Boutique
							</Checkbox>
						</Stack>
						<Divider marginTop={"1rem"} marginBottom={"1rem"} />
						<Stack spacing={1} direction="column">
							<Heading as="h5" size="sm" align={"left"}>
								Shop By Store Attributes
							</Heading>
							{attributes &&
								attributes.map((principle) => (
									<Checkbox
										key={`${principle.name}-opt`}
										value={principle.name}
										onChange={handleTagGroupChange}
										isChecked={filteredTags.includes(principle.name)}
									>
										{principle.name}
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
				<Button ref={btnRef} colorScheme="teal" onClick={initSelectedTags} mb={4}>
					<BsFilter />
					&nbsp;All Filters
				</Button>
				<Stack direction={"row"}>
					<InputGroup marginBottom={"1rem"}>
						<InputLeftElement pointerEvents="none" children={<BsFilter color="gray.300" />} />
						<Input
							type="text"
							placeholder="Sort products by keyword"
							ref={keywordRef}

							// backgroundColor="white"
							// color={useColorModeValue("#fff", "gray.900")}
						/>
					</InputGroup>
					<Button
						// h="100%"
						// size="lg"
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
						onClick={() => {
							fetchProductOrder(keywordRef.current.value);
						}}
					>
						Sort using ai
					</Button>
				</Stack>
			</Flex>

			<ProductGrid products={filtered} />
		</Container>
	);
}
