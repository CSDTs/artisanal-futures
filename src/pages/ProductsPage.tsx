import PageContainer from "@/components/PageContainer";

import {
	ArtisanField,
	AttributeField,
	ProductCard,
	SearchBar,
	SortUsingAI,
	useProducts,
} from "@/features/ProductSearch";

import { Product } from "@/types";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import React, { Fragment, useEffect, useRef, useState } from "react";

const ProductsPage: React.FC = () => {
	const { products, attributes: principles, artisans, isLoading, isError, sortWithAI } = useProducts();
	const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
	const [selectedPrinciples, setSelectedPrinciples] = useState<string[]>([]);
	const [selectedArtisans, setSelectedArtisans] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOption, setSortOption] = useState<string>("");

	const [isAISortVisible, setIsAISortVisible] = useState<boolean>(false);

	const aiSortRef = useRef<HTMLInputElement>(null);

	const pageInfo = {
		title: "Products",
		subtitle: "Search through all our artisans' products and support small businesses",
	};

	useEffect(() => {
		setFilteredProducts(products);
	}, [products]);

	useEffect(() => {
		filterProducts();
	}, [selectedPrinciples, selectedArtisans, searchTerm]);

	// Filter products based on selected principles, artisans, and search term
	const filterProducts = () => {
		let filtered = products;

		if (selectedPrinciples.length > 0) {
			filtered = filtered.filter((product) =>
				selectedPrinciples.some((principle) => product.principles.toLowerCase().includes(principle.toLowerCase()))
			);
		}

		if (selectedArtisans.length > 0) {
			filtered = filtered.filter((product) => selectedArtisans.includes(product.the_artisan));
		}

		if (searchTerm.trim() !== "") {
			const search = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(product) => product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)
			);
		}

		setFilteredProducts(filtered.length > 0 ? filtered : null);
	};

	// Sort products based on the selected sort option
	const sortProducts = (option: string) => {
		let sorted = [...(filteredProducts || [])];

		setIsAISortVisible(false);
		if (option === "atoz") {
			sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
		} else if (option === "ztoa") {
			sorted = sorted.sort((a, b) => b.name.localeCompare(a.name));
		} else if (option === "none") {
			sorted = sorted.sort((a, b) => a.id - b.id);
		} else if (option === "ai") {
			setIsAISortVisible(true);
		}

		setFilteredProducts(sorted);
	};

	// Handle principle selection
	const handlePrincipleSelect = (principle: string) => {
		const isSelected = selectedPrinciples.includes(principle);
		let updatedPrinciples = [...selectedPrinciples];

		if (isSelected) {
			updatedPrinciples = updatedPrinciples.filter((p) => p !== principle);
		} else {
			updatedPrinciples.push(principle);
		}

		setSelectedPrinciples(updatedPrinciples);
	};

	// Handle artisan selection
	const handleArtisanSelect = (artisan: string) => {
		const isSelected = selectedArtisans.includes(artisan);
		let updatedArtisans = [...selectedArtisans];

		if (isSelected) {
			updatedArtisans = updatedArtisans.filter((a) => a !== artisan);
		} else {
			updatedArtisans.push(artisan);
		}

		setSelectedArtisans(updatedArtisans);
	};

	// Handle search term input
	const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	// Handle sort option change
	const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const option = event.target.value;
		setSortOption(option);
		sortProducts(option);
	};

	const findCommonProducts = (aiSortedArray: Product[], filteredArray: Product[]) => {
		// Create a set of craftIDs from the second array
		const craftIDsSet = new Set(filteredArray.map((obj) => obj.craftID));

		// Filter the first array to include only objects that have a matching craftID
		const commonObjects = aiSortedArray.filter((obj) => craftIDsSet.has(obj.craftID));

		return commonObjects;
	};

	const handleSortWithAI = async () => {
		if (aiSortRef.current?.value === undefined || aiSortRef?.current?.value === "") return;
		sortWithAI(aiSortRef.current?.value).then((data) => {
			const sortedData = findCommonProducts(data, filteredProducts || []);
			setFilteredProducts(sortedData);
		});
	};

	// Reset all filters
	const resetFilters = () => {
		setSelectedPrinciples([]);
		setSelectedArtisans([]);
		setSearchTerm("");
		setFilteredProducts(products);
		setSortOption("");
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error occurred while fetching products.</div>;
	}

	const filteredPrinciples = filteredProducts
		? filteredProducts.reduce<string[]>((acc, product) => {
				const productPrinciples = product.principles.split(",").map((attr) => attr.trim());
				return [...acc, ...productPrinciples];
		  }, [])
		: [];

	return (
		<PageContainer {...pageInfo}>
			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/4 p-4 w-full">
					<Popover className="relative flex md:hidden">
						{({ open }) => (
							<>
								<Popover.Button
									className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-indigo-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full`}>
									<span>Filters</span>
									<ChevronDownIcon
										className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-indigo-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
										aria-hidden="true"
									/>
								</Popover.Button>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-200"
									enterFrom="opacity-0 translate-y-1"
									enterTo="opacity-100 translate-y-0"
									leave="transition ease-in duration-150"
									leaveFrom="opacity-100 translate-y-0"
									leaveTo="opacity-0 translate-y-1">
									<Popover.Panel className="   absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
										<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
											<div className="relative grid  bg-white p-7 lg:grid-cols-2">
												{/* <h2 className="font-semibold text-lg text-slate-800">Filters</h2> */}
												<SearchBar handleOnSearch={handleSearchTermChange} query={searchTerm} />
												<AttributeField
													attributes={principles}
													selectedAttributes={selectedPrinciples}
													filteredAttributes={filteredPrinciples}
													handleSelect={handlePrincipleSelect}
												/>

												<ArtisanField
													artisans={artisans}
													selectedArtisans={selectedArtisans}
													handleSelect={handleArtisanSelect}
												/>
											</div>
											<div className="bg-gray-50 p-4">
												<button
													onClick={resetFilters}
													className="w-full bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-700 text-base font-semibold">
													Reset Filters
												</button>
											</div>
										</div>
									</Popover.Panel>
								</Transition>
							</>
						)}
					</Popover>

					<section className="hidden md:flex md:flex-col">
						<h2 className="font-semibold text-lg text-slate-800">Filters</h2>
						<SearchBar handleOnSearch={handleSearchTermChange} query={searchTerm} />
						<AttributeField
							attributes={principles}
							selectedAttributes={selectedPrinciples}
							filteredAttributes={filteredPrinciples}
							handleSelect={handlePrincipleSelect}
						/>

						<ArtisanField artisans={artisans} selectedArtisans={selectedArtisans} handleSelect={handleArtisanSelect} />

						<button
							onClick={resetFilters}
							className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-700 text-base font-semibold">
							Reset Filters
						</button>
					</section>
				</div>
				<div className="flex-grow p-4 md:w-3/4 w-full">
					<h2>Filtered Products {filteredProducts?.length}</h2>
					<div>
						<label htmlFor="sortOption">Sort by:</label>
						<select id="sortOption" value={sortOption} onChange={handleSortOptionChange}>
							<option value="">None</option>

							<option value="atoz">A to Z</option>
							<option value="ztoa">Z to A</option>
							<option value="ai">Keyword with AI</option>
						</select>

						{isAISortVisible && <SortUsingAI fetching={false} handleOnClick={handleSortWithAI} ref={aiSortRef} />}
					</div>
					<div className="flex flex-col md:flex-row md:flex-wrap h-fit">
						{filteredProducts !== null ? (
							filteredProducts.map((product) => (
								<div className="basis-full md:basis-1/2 lg:basis-1/3 flex p-4 " key={product.name}>
									<ProductCard {...product} key={product.craftID} />
								</div>
							))
						) : (
							<div>No products found.</div>
						)}
					</div>
				</div>
			</div>
		</PageContainer>
	);
};

export default ProductsPage;
