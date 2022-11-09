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
import { useState } from "react";
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

	return (
		<Container maxW={"6xl"} mt={6}>
			<Heading mb={6}>Craft Recomposition</Heading>
			<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
				Break down an image into its bill of materials, remix the results
			</Text>
			<Text>
				To help imagine and re-imagine your craft, please choose what groups and kinds of materials could play a role.
				Groups include Artisanal Futures associated collectives, regional businesses, and minority businesses. New kinds
				of materials include other metals, fabrics, adhesives, and so forth. Try our example to learn more!
			</Text>

			<Flex alignItems={"center"}>
				<Box flex={1} p={5}>
					<form onChange={handleImageUpload} onSubmit={handleImageSubmit}>
						<FormControl display="flex" flexDir={"column"}>
							<FormLabel htmlFor="file">Upload Image</FormLabel>
							<Input type="file" name="file" id="file" placeholder="Import an image" py={5} w={"100%"} h={"100%"} />
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
		</Container>
	);
};
export default Remix;
