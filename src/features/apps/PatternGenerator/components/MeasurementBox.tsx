import combineTailwindClasses from "@/utils/combineTailwindClasses";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment, MouseEvent, useEffect, useRef, useState } from "react";
interface PathSegment {
	path: string;
	scaler?: string;
}

const MeasurementBox: React.FC = () => {
	const svgRef = useRef<SVGSVGElement>(null);
	const [bicep, setBicep] = useState<number>(4);
	const [wrist, setWrist] = useState<number>(4);
	const [shoulder, setShoulder] = useState<number>(12);
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);
	const [currentSegment, setCurrentSegment] = useState<string>("");
	const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
	const [selectedOption, setSelectedOption] = useState<string>("wrist");
	const options = ["wrist", "shoulder to wrist", "bicep"];
	const height = 500;
	const pathWidth = 2;

	useEffect(() => {
		if (selectedSegment !== null) {
			const updatedSegments = [...pathSegments];
			updatedSegments[selectedSegment].scaler = selectedOption;
			setPathSegments(updatedSegments);
		}
	}, [selectedOption, selectedSegment]);

	const addSegment = (event: MouseEvent<SVGSVGElement>) => {
		setCurrentSegment(` M${event.nativeEvent.offsetX} ${event.nativeEvent.offsetY}`);
		setIsDrawing(true);
	};

	const addLineSegment = (event: MouseEvent<SVGSVGElement>) => {
		if (!isDrawing) return;
		setCurrentSegment((prev) => `${prev} L${event.nativeEvent.offsetX} ${event.nativeEvent.offsetY}`);
	};

	const endSegment = () => {
		if ((currentSegment.match(/L/g) || []).length > 4) {
			setPathSegments((prev) => [...prev, { path: currentSegment }]);
		} else {
			console.log("didn't add that!");
		}
		setCurrentSegment("");
		setIsDrawing(false);
	};

	const selectSegment = (event: MouseEvent<SVGSVGElement>) => {
		const targetIndex = event.currentTarget.getAttribute("data-index");
		if (targetIndex) {
			setSelectedSegment(Number(targetIndex));
		}
	};

	const handleOptionSelect = (event: string) => {
		setSelectedOption(event);
	};

	const dumpScaledSvgPaths = () => {
		console.log("<svg path data...>", pathSegments);
	};

	const clearPaths = () => {
		setPathSegments([]);
	};

	return (
		<section className="flex  justify-around mb-10">
			<div className="border-black border w-[500px] h-[500px]">
				{" "}
				<svg
					viewBox="0 0 500 500"
					onMouseDown={addSegment}
					onMouseUp={endSegment}
					onMouseMove={addLineSegment}
					onMouseOver={selectSegment}
					ref={svgRef}
					className="w-[500px] h-[500px]">
					<defs>
						<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
							<polygon points="0 0, 10 3, 0 6" />
						</marker>
					</defs>

					{/* <!-- Shoulder to wrist --> */}
					<line x1="20" y1="220" x2="20" y2={height / 2 + shoulder / 2 + 120} stroke="black" />

					<text x="20" y="220" fontSize="10" fontFamily="Arial" className="select-none">
						0 inches
					</text>

					<text x="20" y={shoulder / 2 + height / 2 + 130} fontSize="10" fontFamily="Arial" className="select-none">
						{shoulder} inches
					</text>

					<path strokeWidth={"2"} stroke="#333" fill="none" />

					<g transform="translate(5, 220)">
						<text
							x="0"
							y="0"
							fontSize="12"
							fontWeight="bold"
							textAnchor="start"
							transform="rotate(90)"
							className="select-none">
							Shoulder to wrist
						</text>
					</g>

					{/* <!-- wrist circumference --> */}
					<line x1={250 + wrist} y1="440" x2={250 - wrist} y2="440" stroke="black" strokeWidth="1" />
					<text
						x="250"
						y="430"
						fontSize="12"
						fill="black"
						fontWeight="bold"
						textAnchor="middle"
						transform="rotate(0 250 440)"
						fontFamily="Arial"
						className="select-none">
						Wrist Circumference
					</text>
					<text x={210 + wrist} y={450} fontSize="10" fontFamily="Arial" className="select-none">
						{wrist} inches
					</text>

					{/* <!-- bicep circumference --> */}
					<line x1={250 + bicep} y1="180" x2={250 - bicep} y2="180" stroke="black" strokeWidth="1" />
					<text
						x="250"
						y="170"
						fontSize="12"
						fill="black"
						fontWeight="bold"
						textAnchor="middle"
						transform="rotate(0 250 440)"
						fontFamily="Arial"
						className="select-none">
						Bicep Circumference
					</text>
					<text x={200 + bicep} y={190} fontSize="10" fontFamily="Arial" className="select-none">
						{bicep} inches
					</text>
					{/* <!-- ... we draw any new lines --> */}
					<path d={currentSegment} stroke="black" fill="none" />

					{/* <!-- ... and also persist any prior lines -->	 */}
					{pathSegments.map((segment, index) => (
						<path
							key={index}
							d={segment.path}
							fill="none"
							stroke={index === selectedSegment ? "red" : "black"}
							strokeWidth={index === selectedSegment ? pathWidth * 2 : pathWidth}
							data-index={index}
						/>
					))}
				</svg>
			</div>
			<div className="p-4 flex flex-col">
				<div className="flex justify-around flex-col  gap-4 py-4 my-5 items-center">
					<div className="w-full">
						<Listbox value={selectedOption} onChange={handleOptionSelect}>
							{({ open }) => (
								<>
									<Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Scale by:</Listbox.Label>
									<div className="relative mt-2">
										<Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
											<span className="flex items-center">
												<span className="ml-3 block truncate">{selectedOption}</span>
											</span>
											<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
												<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
											</span>
										</Listbox.Button>

										<Transition
											show={open}
											as={Fragment}
											leave="transition ease-in duration-100"
											leaveFrom="opacity-100"
											leaveTo="opacity-0">
											<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
												{options.map((option, idx) => (
													<Listbox.Option
														key={idx}
														className={({ active }) =>
															combineTailwindClasses(
																active ? "bg-indigo-600 text-white" : "text-gray-900",
																"relative cursor-default select-none py-2 pl-3 pr-9"
															)
														}
														value={option}>
														{({ selected, active }) => (
															<>
																<div className="flex items-center">
																	<span
																		className={combineTailwindClasses(
																			selected ? "font-semibold" : "font-normal",
																			"ml-3 block truncate"
																		)}>
																		{option}
																	</span>
																</div>

																{selected ? (
																	<span
																		className={combineTailwindClasses(
																			active ? "text-white" : "text-indigo-600",
																			"absolute inset-y-0 right-0 flex items-center pr-4"
																		)}>
																		<CheckIcon className="h-5 w-5" aria-hidden="true" />
																	</span>
																) : null}
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</>
							)}
						</Listbox>
					</div>
					<div className="flex flex-col w-full ">
						<label htmlFor="wrist" className="block mb-2 text-sm font-medium text-gray-900 ">
							Wrist
						</label>
						<input
							id="wrist"
							type="range"
							value={wrist}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
							onChange={(e) => setWrist(Number(e.target.value))}
							min="4"
							max="20"
							step="1"
						/>
					</div>{" "}
					<div className="flex flex-col w-full">
						<label htmlFor="bicep" className="block mb-2 text-sm font-medium text-gray-900">
							Bicep
						</label>
						<input
							id="bicep"
							type="range"
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
							onChange={(e) => setBicep(Number(e.target.value))}
							value={bicep}
							min="4"
							max="40"
							step="1"
						/>
					</div>{" "}
					<div className="flex flex-col w-full">
						<label htmlFor="shoulder" className="block mb-2 text-sm font-medium text-gray-900">
							Shoulder to Wrist
						</label>
						<input
							id="shoulder"
							type="range"
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
							onChange={(e) => setShoulder(Number(e.target.value))}
							value={shoulder}
							min="12"
							max="44"
							step="1"
						/>
					</div>
				</div>{" "}
				<div className="flex flex-row  gap-4 justify-end py-4 my-5 ">
					<button
						onClick={clearPaths}
						className="text-sm font-semibold leading-6 text-gray-900 lg:col-span-auto lg:w-auto w-full hover:bg-gray-200 border border-gray-200 rounded-md px-3 py-2 transition-all">
						Clear
					</button>
					<button
						onClick={dumpScaledSvgPaths}
						className="lg:w-auto w-full lg:col-span-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Export as FreeSewing Design
					</button>
				</div>
			</div>
		</section>
	);
};

export default MeasurementBox;
