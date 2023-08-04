import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { ChangeEventHandler, FC, forwardRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface IProps {
	query: string;
	handleOnSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<IProps> = ({ handleOnSearch, query }) => {
	return (
		<>
			<>
				<label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 sr-only">
					Search
				</label>
				<div className="relative mt-2 rounded-md shadow-sm">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span className="text-gray-500 sm:text-sm">
							<FaSearch color="gray.300" />
						</span>
					</div>
					<input
						type="text"
						name="search"
						id="search"
						className="block w-full rounded-md border-0 py-1.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="e.g. Dresses"
						value={query}
						onChange={handleOnSearch}
					/>
				</div>
			</>
		</>
	);
};
export default SearchBar;
