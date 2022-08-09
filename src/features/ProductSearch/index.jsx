import { useState, useEffect } from "react";

import { Container, Box, Text, Image, Link, Stack, Checkbox, Divider, Heading } from "@chakra-ui/react";

import ProductGrid from "./components/Grid/Grid";
import Filter from "./components/Filter/Filter";
// import CategoryDrawer from "./components/CategoryDrawer/CategoryDrawer";
// import CategoryFilters from "./components/CategoryFilters/CategoryFilters";

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

function App() {
	const [products, setProducts] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);
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
		console.log(type);

		if (tags.includes(checkValue)) tags = tags.filter((tag) => tag != checkValue);
		else tags.push(checkValue);
		setFilteredTags(tags);
	};

	useEffect(() => {
		//If user doesn't do anything, just return the set of apps as is.
		console.log(filteredTags);
		if (selectedAttribute === "All" && filteredTags == [] && search == "") {
			setFiltered(products);
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
	}, [selectedAttribute, filteredTags, search]);

	// useEffect(() => {
	// 	// console.log(search);
	// 	let results = "";
	// 	if (search != "") {
	// 		fetchSearch(search).then((data) => console.log(FilterArtisan()));
	// 	}
	// }, [search]);

	const fetchProducts = async () => {
		//TODO Replace with final endpoint
		const res = await fetch("api/products.json");
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

	// const fetchSearch = async (inputData) => {
	// 	//TODO Replace with final endpoint

	// 	const requestOptions = {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({
	// 			query: {
	// 				content: inputData,
	// 			},
	// 			response_model: [
	// 				{
	// 					name: "string",
	// 					description: "string",
	// 					principles: "string",
	// 					the_artisan: "string",
	// 					url: "string",
	// 					image:
	// 						"https://cdn1.vectorstock.com/i/thumb-large/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg",
	// 					craftID: "string",
	// 				},
	// 			],
	// 		}),
	// 	};
	// 	const res = await fetch("http://127.0.0.1:8000/search/", requestOptions);
	// 	const data = await res.json();

	// 	return data;
	// 	// setSearch(data);
	// };

	const fetchSearch = (inputData) => {
		return FilterArtisan();
	};

	useEffect(() => {
		fetchProducts();
		fetchAttributes();
		// fetchSearch();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				{/* <p>Artisanal Futures</p> */}
				{/* <CategoryDrawer attributes={attributes} /> */}
				<Container></Container>

				<Container maxW="container.xl">
					<Box p={4} display={{ md: "flex" }}>
						<Box flexShrink={0}>
							<Stack spacing={1} direction="column">
								<Heading as="h5" size="sm" align={"left"}>
									Shop By Artisan
								</Heading>
								<Checkbox onChange={handleTagGroupChange} value="Dabls Mbad African Bead Museum">
									Dabls' MBAD African Bead Museum
								</Checkbox>
								<Checkbox onChange={handleTagGroupChange} value="African Futurist Collective">
									African Futurist Collective
								</Checkbox>
								<Checkbox onChange={handleTagGroupChange} value="Cactus Harmony">
									Cactus Harmony
								</Checkbox>
								<Checkbox onChange={handleTagGroupChange} value="Visual Noise">
									Visual Noise
								</Checkbox>
								<Checkbox onChange={handleTagGroupChange} value="Xclusive Virgin Hair">
									Xclusive Virgin Hair
								</Checkbox>
								<Checkbox onChange={handleTagGroupChange} value="Akoma">
									Akoma
								</Checkbox>
								<Checkbox onChange={handleTagGroupChange} value="Willow Run Acres">
									Willow Run Acres
								</Checkbox>
								<Checkbox onChange={handleTagGroupChange} value="Olive Mode Boutique">
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
										<Checkbox key={`${principle.name}-opt`} value={principle.name} onChange={handleTagGroupChange}>
											{principle.name}
										</Checkbox>
									))}
							</Stack>
						</Box>
						<Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} w="100%">
							<Text fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wide" color="teal.600">
								Artisanal Futures Products
							</Text>
							<Link
								mt={1}
								display="block"
								fontSize="lg"
								lineHeight="normal"
								fontWeight="semibold"
								href="#"
								marginBottom={"2rem"}
							>
								Search through all our artisans' products and support small businesses
							</Link>
							<Filter
								attributes={attributes}
								products={products}
								handleChange={handleAttributeChange}
								handleSearch={handleSearchChange}
								handleTags={handleTagGroupChange}
							/>

							<ProductGrid products={filtered} />
						</Box>
					</Box>
				</Container>

				{/* <ProductGrid products={search} /> */}
			</header>
			{/* <>{search}</> */}
		</div>
	);
}

export default App;
