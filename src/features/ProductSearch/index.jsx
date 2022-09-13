import { useEffect, useRef, useState } from "react";

import { Container, Heading, Text } from "@chakra-ui/react";

import Filter from "./components/Filters/SearchBar";
import ProductGrid from "./components/ProductGrid";

import Loading from "../../components/Loading";
import FilterBar from "./components/Filters/FilterBar";
import ProductService from "./services/product.service";

const AdjustText = (text, key) => {
	key = key.toLowerCase();
	text = text.toLowerCase();

	return key.includes(text);
};

export default function ProductSearch() {
	const {
		data: products,
		isLoading: isLoadingProducts,
		isError: isErrorProducts,
	} = ProductService.getLocalProductList("api/ecodata.json");
	const {
		data: attributes,
		isLoading: isLoadingAttributes,
		isError: isErrorAttributes,
	} = ProductService.getLocalProductList("api/principles.json");

	const [apiProducts, setApiProducts] = useState();

	const [apiAttributes, setApiAttributes] = useState();
	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);

	const [availableArtisans, setAvailableArtisans] = useState([]);

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

	const handleFiltering = () => {
		//If user doesn't do anything, just return the set of apps as is.

		if (selectedAttribute === "All" && filteredTags.length == 0 && search == "") {
			setFiltered(apiProducts ? apiProducts : products);
			return;
		}

		//Create the filtered list of apps
		const current = products.filter((app) => {
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
	};

	useEffect(() => {
		handleFiltering();
	}, [selectedAttribute, filteredTags, search, apiProducts]);

	useEffect(() => {
		if (!products) return;
		setFiltered(products);
		setAvailableArtisans(ProductService.formatProductArtisans(products));
		setApiAttributes(ProductService.formatProductPrinciples(products));
	}, [products]);

	return (
		<>
			<Filter
				attributes={attributes}
				products={products}
				handleChange={handleAttributeChange}
				handleSearch={handleSearchChange}
				handleTags={handleTagGroupChange}
			/>

			<FilterBar
				availableArtisans={availableArtisans}
				attributes={apiAttributes}
				handleTagGroupChange={handleTagGroupChange}
				filteredTags={filteredTags}
				setProducts={setApiProducts}
			/>
			{!isLoadingProducts && <ProductGrid products={filtered} />}

			<Loading isLoading={isLoadingProducts} />
		</>
	);
}
