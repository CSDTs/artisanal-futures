import { forwardRef } from "react";
import { BsFilter } from "react-icons/bs";

interface IProps {
	fetching: boolean;
	handleOnClick: () => void;
}
const SortUsingAI = forwardRef<HTMLInputElement, IProps>(({ fetching, handleOnClick }, ref) => {
	return (
		<div className="mb-6">
			<label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 sr-only md:not-sr-only">
				Term using AI
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<span className="text-gray-500 sm:text-sm">
						<BsFilter color="gray.300" />
					</span>
				</div>
				<input
					type="text"
					name="filter"
					id="filter"
					ref={ref}
					className="block w-full rounded-md border-0 py-1.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder="e.g. Beads"
				/>
				<div className="absolute inset-y-0 right-0 flex items-center">
					{!fetching && (
						<button
							className="h-full px-4 text-white bg-indigo-500 font-semibold text-sm rounded-e w-full"
							onClick={handleOnClick}>
							Sort using AI
						</button>
					)}
					{fetching && (
						<button className="h-full px-4 text-white bg-indigo-300 font-semibold text-sm rounded-e " disabled>
							<svg
								className="animate-spin mx-auto h-5 w-5 text-white o"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span className="sr-only">Loading...</span>
						</button>
					)}
				</div>
			</div>
			<p className="text-xs mt-2 font-medium text-slate-400 hidden md:flex">
				Clear your filters for the best results.{" "}
			</p>
		</div>
	);
});
export default SortUsingAI;
