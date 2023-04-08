import {
	AspectRatio,
	Box,
	Button,
	chakra,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Input,
	shouldForwardProp,
	SimpleGrid,
	Spacer,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useRef, useState } from "react";
const ChakraBox = chakra(motion.div, {
	/**
	 * Allow motion props and non-Chakra props to be forwarded.
	 */
	shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});
const Remix = () => {
	const [imageSrc, setImageSrc] = useState();
	const [uploadData, setUploadData] = useState();
	const [remixData, setRemixData] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const [isEditingRemix, setIsEditingRemix] = useState(false);
	const [isEditingMaterials, setIsEditingMaterials] = useState(false);
	const handleImageUpload = (e) => {
		const reader = new FileReader();

		reader.onload = (onLoadEvt) => {
			setImageSrc(onLoadEvt.target.result);
			setUploadData(undefined);
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	const handleImageSubmit = async (event) => {
		event.preventDefault();
		setIsUploading(true);

		const form = event.currentTarget;
		const fileInput = Array.from(form.elements).find(({ name }) => name === "file");

		const formData = new FormData();

		for (const file of fileInput.files) {
			formData.append("file", file);
		}

		// formData.append("upload_preset", "my-uploads");

		const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0", {
			method: "GET",
			// body: formData,
		}).then((r) => r.json());

		const remixData = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
			method: "GET",
			// body: formData,
		}).then((r) => r.json());

		// setImageSrc(data.secure_url);
		setUploadData(data);

		setRemixData(remixData);

		setIsUploading(false);
	};

	const handleDragAndDrop = (event) => {
		event.preventDefault();
		console.log(event.target);
	};

	// drag state
	const [dragActive, setDragActive] = useState(false);
	// ref
	const inputRef = useRef(null);

	// handle drag events
	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	// triggers when file is dropped
	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			// handleFiles(e.dataTransfer.files);
		}
	};

	// triggers when file is selected with click
	const handleChange = function (e) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			// handleFiles(e.target.files);
		}
	};

	// triggers the input when the button is clicked
	const onButtonClick = () => {
		inputRef.current.click();
	};
	return (
		<section className=" max-w-6xl mx-auto mt-6">
			<Heading mb={6}>Craft Recomposition</Heading>
			<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
				Break down an image into its bill of materials, remix the results
			</Text>
			<p className="text-base font-normal ">
				To help imagine and re-imagine your craft, please choose what groups and kinds of materials could play a role.
				Groups include Artisanal Futures associated collectives, regional businesses, and minority businesses. New kinds
				of materials include other metals, fabrics, adhesives, and so forth. Try our example to learn more!
			</p>

			<div className="grid grid-cols-2 gap-2">
				<form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
					<input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
					<label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
						<div>
							<p>Drag and drop your file here or</p>
							<button className="upload-button" onClick={onButtonClick}>
								Upload a file
							</button>
						</div>
					</label>
					{dragActive && (
						<div
							id="drag-file-element"
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}></div>
					)}
				</form>
				<form
					className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center aspect-square"
					onDragEnter={handleDrag}
					onSubmit={(e) => e.preventDefault()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
							clip-rule="evenodd"
						/>
					</svg>
					<p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
						<span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
					</p>
					<input id="hidden-input" type="file" multiple className="hidden" />
					<button
						id="button"
						className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
						Upload a file
					</button>
				</form>
			</div>

			<Flex alignItems={"center"}>
				<Box flex={1} p={5}>
					<form onChange={handleImageUpload} onSubmit={handleImageSubmit}>
						<FormControl display="flex" flexDir={"column"}>
							<FormLabel htmlFor="file">Upload Image</FormLabel>
							<div className="h-80 w-80 bg-slate-200"></div>
							<Input
								type="file"
								name="file"
								id="file"
								placeholder="Import an image"
								py={5}
								w={"100%"}
								h={"100%"}
								hidden
							/>
							{imageSrc && (
								<AspectRatio w="100%" h="500px" ratio={1} mx="auto">
									<img src={imageSrc ?? ""} alt="" />
								</AspectRatio>
							)}
							<Button type="submit" isDisabled={!imageSrc}>
								{" "}
								Generate
							</Button>
						</FormControl>
					</form>
				</Box>

				<Box p={5} flex={1}>
					{isUploading && (
						<Flex w="100%">
							<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" mx={"auto"} />
						</Flex>
					)}
					{uploadData && remixData && (
						<Tabs>
							<TabList>
								<Tab>Bill of Materials</Tab>
								<Tab>Craft Remix</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									{uploadData && (
										<Box shadow={"base"} p={5} bgColor={"gray.100"} my={5}>
											<Flex w="100%" justifyContent={"space-between"} mb="4">
												<Heading my={3} fontSize={"lg"}>
													Bill of Materials Results
												</Heading>
												<ChakraBox
													initial={{ opacity: 0, scale: 0.5 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{
														duration: 0.8,
														delay: 0.5,
														ease: [0, 0.71, 0.2, 1.01],
													}}
													py="2"
													px="4"
													display="flex"
													justifyContent="center"
													alignItems="center"
													// width="100px"
													bgColor={isEditingMaterials ? "green.500" : "blue.500"}
													// height="100px"
													rounded="md"
													onClick={() => setIsEditingMaterials(!isEditingMaterials)}
													textColor={"white"}
													fontWeight="500"
													_hover={{
														bgColor: "blue.600",
														transition: "background 0.1s linear",
													}}>
													{isEditingMaterials ? "Finished" : "Edit"}
												</ChakraBox>
											</Flex>
											<Box overflow="scroll" maxH={"450px"}>
												<code>
													{!isEditingMaterials && <pre>{JSON.stringify(uploadData, null, 2)}</pre>}
													{isEditingMaterials && (
														<pre>
															<Textarea
																defaultValue={JSON.stringify(uploadData, null, 2)}
																w="100%"
																h="100%"
																rows="20"
																bgColor="white"
															/>
														</pre>
													)}
												</code>
											</Box>
										</Box>
									)}
								</TabPanel>
								<TabPanel>
									{remixData && (
										<Box shadow={"base"} p={5} bgColor={"gray.100"} my={5}>
											<Flex w="100%" justifyContent={"space-between"} mb="4">
												<Heading my={3} fontSize={"lg"}>
													Craft Remix Results
												</Heading>
												<ChakraBox
													initial={{ opacity: 0, scale: 0.5 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{
														duration: 0.8,
														delay: 0.5,
														ease: [0, 0.71, 0.2, 1.01],
													}}
													py="2"
													px="4"
													display="flex"
													justifyContent="center"
													alignItems="center"
													// width="100px"
													bgColor={isEditingRemix ? "green.500" : "blue.500"}
													// height="100px"
													rounded="md"
													textColor={"white"}
													fontWeight="500"
													onClick={() => setIsEditingRemix(!isEditingRemix)}
													_hover={{
														bgColor: "blue.600",
														transition: "background 0.1s linear",
													}}>
													{isEditingRemix ? "Finished" : "Edit"}
												</ChakraBox>
											</Flex>
											<Box overflow="scroll" maxH={"450px"}>
												<code>
													{!isEditingRemix && <pre>{JSON.stringify(remixData, null, 2)}</pre>}
													{isEditingRemix && (
														<pre>
															<Textarea
																defaultValue={JSON.stringify(remixData, null, 2)}
																w="100%"
																h="100%"
																rows="20"
																bgColor="white"
															/>
														</pre>
													)}
												</code>
											</Box>
										</Box>
									)}
								</TabPanel>
							</TabPanels>
						</Tabs>
					)}
					<Box bgColor={"gray.100"} p={5} rounded="md" shadow={"base"}>
						<Text fontSize="md" fontWeight={400}>
							{!isUploading && uploadData && remixData ? (
								<>
									Not quite what you had in mind? Update our guess of what materials and processes make your craft. User
									your expert knowledge to help our artisanal futures technology become more useful for you and other
									members.
								</>
							) : (
								<>Upload your product image to see an AI generated Bill of Materials and Remix Data</>
							)}
						</Text>
					</Box>
				</Box>
			</Flex>
		</section>
	);
};
export default Remix;
