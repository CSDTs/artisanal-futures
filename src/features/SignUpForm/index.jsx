// import React, { useState } from "react";
// import { Steps } from "antd";
// import { Provider } from "./MultiStepFormContext";
// import Details from "./Details";
// import Address from "./Address";
// import Review from "./Review";

// const { Step } = Steps;

// const detailsInitialState = {
// 	name: "",
// 	age: "",
// 	profession: "",
// };

// const addressInitialState = {
// 	address1: "",
// 	address2: "",
// 	city: "",
// };

// const renderStep = (step) => {
// 	switch (step) {
// 		case 0:
// 			return <Details />;
// 		case 1:
// 			return <Address />;
// 		case 2:
// 			return <Review />;
// 		default:
// 			return null;
// 	}
// };

// const MultiStepForm = () => {
// 	const [details, setDetails] = useState(detailsInitialState);
// 	const [address, setAddress] = useState(addressInitialState);
// 	const [currentStep, setCurrentStep] = useState(0);

// 	const next = () => {
// 		if (currentStep === 2) {
// 			setCurrentStep(0);
// 			setDetails(detailsInitialState);
// 			setAddress(addressInitialState);
// 			return;
// 		}
// 		setCurrentStep(currentStep + 1);
// 	};
// 	const prev = () => setCurrentStep(currentStep - 1);
// 	return (
// 		<Provider value={{ details, setDetails, next, prev, address, setAddress }}>
// 			<Steps current={currentStep}>
// 				<Step title={"Fill in your details"} />
// 				<Step title={"Address details"} />
// 				<Step title={"Review and Save"} />
// 			</Steps>
// 			<main>{renderStep(currentStep)}</main>
// 		</Provider>
// 	);
// };
// export default MultiStepForm;
// Chakra imports
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Icon,
	Input,
	Stack,
	Tab,
	TabList,
	Switch,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React, { useRef, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { FaCube } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

function SignUpForm() {
	const textColor = useColorModeValue("gray.700", "white");
	const bgPrevButton = useColorModeValue("gray.100", "gray.100");
	const iconColor = useColorModeValue("gray.300", "gray.700");
	const [activeBullets, setActiveBullets] = useState({
		about: true,
		business: false,
		account: false,
		address: false,
	});

	const [checkboxes, setCheckboxes] = useState({
		design: false,
		code: false,
		develop: false,
		other: false,
	});

	const aboutTab = useRef();
	const businessTab = useRef();
	const accountTab = useRef();
	const addressTab = useRef();

	return (
		<Flex direction="column" minH="100vh" align="center" pt={{ sm: "125px", lg: "75px" }}>
			<Flex direction="column" textAlign="center" mb={{ sm: "25px", md: "45px" }}>
				<Text color={textColor} fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" mb="8px">
					Build your profile
				</Text>
				<Text color="gray.400" fontWeight="normal" fontSize={{ sm: "sm", md: "lg" }}>
					This information will let us know more about you.
				</Text>
			</Flex>
			<Tabs variant="unstyled" mt="24px" display="flex" flexDirection="column">
				<TabList display="flex" align="center" alignSelf="center" justifySelf="center">
					<Tab
						ref={aboutTab}
						_focus="none"
						w={{ sm: "120px", md: "250px", lg: "300px" }}
						onClick={() =>
							setActiveBullets({
								about: true,
								business: false,
								account: false,

								address: false,
							})
						}
					>
						<Flex
							direction="column"
							justify="center"
							align="center"
							position="relative"
							_before={{
								content: "''",
								width: { sm: "120px", md: "250px", lg: "300px" },
								height: "3px",
								bg: activeBullets.business ? textColor : "gray.200",
								left: { sm: "12px", md: "26px" },
								top: { sm: activeBullets.about ? "6px" : "4px", md: null },
								position: "absolute",
								bottom: activeBullets.about ? "40px" : "38px",
								zIndex: -1,
								transition: "all .3s ease",
							}}
						>
							<Icon
								as={BsCircleFill}
								color={activeBullets.about ? textColor : "gray.300"}
								w={activeBullets.about ? "16px" : "12px"}
								h={activeBullets.about ? "16px" : "12px"}
								mb="8px"
							/>
							<Text
								color={activeBullets.about ? { textColor } : "gray.300"}
								fontWeight={activeBullets.about ? "bold" : "normal"}
								display={{ sm: "none", md: "block" }}
								fontSize="sm"
							>
								About
							</Text>
						</Flex>
					</Tab>
					<Tab
						ref={businessTab}
						_focus="none"
						w={{ sm: "120px", md: "250px", lg: "300px" }}
						onClick={() =>
							setActiveBullets({
								about: true,
								business: true,
								account: false,
								address: false,
							})
						}
					>
						<Flex
							direction="column"
							justify="center"
							align="center"
							position="relative"
							_before={{
								content: "''",
								width: { sm: "120px", md: "250px", lg: "300px" },
								height: "3px",
								bg: activeBullets.account ? textColor : "gray.200",
								left: { sm: "12px", md: "28px" },
								top: { sm: activeBullets.business ? "6px" : "4px", md: null },
								position: "absolute",
								bottom: activeBullets.business ? "40px" : "38px",
								zIndex: -1,
								transition: "all .3s ease",
							}}
						>
							<Icon
								as={BsCircleFill}
								color={activeBullets.business ? textColor : "gray.300"}
								w={activeBullets.business ? "16px" : "12px"}
								h={activeBullets.business ? "16px" : "12px"}
								mb="8px"
							/>
							<Text
								color={activeBullets.business ? { textColor } : "gray.300"}
								fontWeight={activeBullets.business ? "bold" : "normal"}
								transition="all .3s ease"
								fontSize="sm"
								_hover={{ color: textColor }}
								display={{ sm: "none", md: "block" }}
							>
								Business
							</Text>
						</Flex>
					</Tab>
					<Tab
						ref={accountTab}
						_focus="none"
						w={{ sm: "120px", md: "250px", lg: "300px" }}
						onClick={() =>
							setActiveBullets({
								about: true,
								business: true,
								account: true,
								address: false,
							})
						}
					>
						<Flex
							direction="column"
							justify="center"
							align="center"
							position="relative"
							_before={{
								content: "''",
								width: { sm: "120px", md: "250px", lg: "300px" },
								height: "3px",
								bg: activeBullets.address ? textColor : "gray.200",
								left: { sm: "12px", md: "28px" },
								top: { sm: activeBullets.account ? "6px" : "4px", md: null },
								position: "absolute",
								bottom: activeBullets.account ? "40px" : "38px",
								zIndex: -1,
								transition: "all .3s ease",
							}}
						>
							<Icon
								as={BsCircleFill}
								color={activeBullets.account ? textColor : "gray.300"}
								w={activeBullets.account ? "16px" : "12px"}
								h={activeBullets.account ? "16px" : "12px"}
								mb="8px"
							/>
							<Text
								color={activeBullets.account ? { textColor } : "gray.300"}
								fontWeight={activeBullets.account ? "bold" : "normal"}
								transition="all .3s ease"
								fontSize="sm"
								_hover={{ color: textColor }}
								display={{ sm: "none", md: "block" }}
							>
								Opt-ins
							</Text>
						</Flex>
					</Tab>
					<Tab
						ref={addressTab}
						_focus="none"
						w={{ sm: "120px", md: "250px", lg: "300px" }}
						onClick={() =>
							setActiveBullets({
								about: true,
								business: true,
								account: true,
								address: true,
							})
						}
					>
						<Flex
							direction="column"
							justify="center"
							align="center"
							position="relative"
							_before={{
								content: "''",
								width: { sm: "120px", md: "250px", lg: "300px" },
								height: "3px",
								// bg: activeBullets.profile ? textColor : "gray.200",
								left: { sm: "12px", md: "32px" },
								top: { sm: activeBullets.address ? "6px" : "4px", md: null },
								position: "absolute",
								bottom: activeBullets.address ? "40px" : "38px",
								zIndex: -1,
								transition: "all .3s ease",
							}}
						>
							<Icon
								as={BsCircleFill}
								color={activeBullets.address ? textColor : "gray.300"}
								w={activeBullets.address ? "16px" : "12px"}
								h={activeBullets.address ? "16px" : "12px"}
								mb="8px"
							/>
							<Text
								color={activeBullets.address ? { textColor } : "gray.300"}
								fontWeight={activeBullets.address ? "bold" : "normal"}
								transition="all .3s ease"
								fontSize="sm"
								_hover={{ color: textColor }}
								display={{ sm: "none", md: "block" }}
							>
								Agreement
							</Text>
						</Flex>
					</Tab>
				</TabList>
				<TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<Flex mb="40px">
								<Flex direction="column" align="center" justify="center" textAlign="center" w="80%" mx="auto">
									<Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
										Let's start with the basic information
									</Text>
									<Text color="gray.400" fontWeight="normal" fontSize="sm">
										Let us know your name and email address. Use an address you don't mind other users contacting you at
									</Text>
								</Flex>
							</Flex>
							<Box>
								<Flex direction="column" w="100%">
									<Flex direction={{ sm: "column", md: "row" }} w="100%" mb="24px">
										<Box
											position="relative"
											minW={{ sm: "110px", xl: "150px" }}
											h={{ sm: "110px", xl: "150px" }}
											mx={{ sm: "auto", md: "40px", xl: "85px" }}
											mb={{ sm: "25px" }}
										>
											<Avatar w="100%" h="100%" borderRadius="12px" />
										</Box>
										<Stack direction="column" spacing="20px" w="100%">
											<FormControl>
												<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
													First Name
												</FormLabel>
												<Input borderRadius="15px" placeholder="eg. Michael" fontSize="xs" />
											</FormControl>
											<FormControl>
												<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
													Last Name
												</FormLabel>
												<Input borderRadius="15px" placeholder="eg. Jackson" fontSize="xs" />
											</FormControl>
											<FormControl>
												<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
													Email Address
												</FormLabel>
												<Input borderRadius="15px" placeholder="eg. example@address.com" fontSize="xs" />
											</FormControl>
										</Stack>
									</Flex>
									<Button
										variant="no-hover"
										bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
										alignSelf="flex-end"
										mt="24px"
										w={{ sm: "75px", lg: "100px" }}
										h="35px"
										onClick={() => businessTab.current.click()}
									>
										<Text fontSize="xs" color="#fff" fontWeight="bold">
											NEXT
										</Text>
									</Button>
								</Flex>
							</Box>
						</Box>
					</TabPanel>
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<Flex mb="40px">
								<Flex direction="column" align="center" justify="center" textAlign="center" w="80%" mx="auto">
									<Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
										Next, let's get some basic information on your business
									</Text>
									<Text color="gray.400" fontWeight="normal" fontSize="sm">
										This will help us map out INSERT_REASON_HERE
									</Text>
								</Flex>
							</Flex>
							<Box>
								<Flex direction="column" w="100%">
									<Stack direction="column" spacing="20px" w="100%">
										<FormControl>
											<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
												Business Name
											</FormLabel>
											<Input borderRadius="15px" placeholder="eg. Artisanal Futures" fontSize="xs" />
										</FormControl>
										<FormControl>
											<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
												Do you have a business website? If so, please provide a link:
											</FormLabel>
											<Input borderRadius="15px" placeholder="eg. https://www.google.com" fontSize="xs" />
										</FormControl>
										<FormControl>
											<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
												Briefly describe your business and customers
											</FormLabel>
											<Input borderRadius="15px" placeholder="eg. My business consists of..." fontSize="xs" />
										</FormControl>
										<FormControl>
											<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
												What principles do you adhere to in your work?
											</FormLabel>
											<Input borderRadius="15px" placeholder="eg. My business consists of..." fontSize="xs" />
										</FormControl>
										<FormControl>
											<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
												What materials are common in your work?
											</FormLabel>
											<Input borderRadius="15px" placeholder="eg. My business consists of..." fontSize="xs" />
										</FormControl>
										<FormControl>
											<FormLabel color={textColor} fontSize="xs" fontWeight="bold">
												What processes are common in your work?
											</FormLabel>
											<Input borderRadius="15px" placeholder="eg. My business consists of..." fontSize="xs" />
										</FormControl>
									</Stack>

									<Flex justify="space-between">
										<Button
											variant="no-hover"
											bg={bgPrevButton}
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
											onClick={() => aboutTab.current.click()}
										>
											<Text fontSize="xs" color="gray.700" fontWeight="bold">
												PREV
											</Text>
										</Button>
										<Button
											variant="no-hover"
											bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
											onClick={() => accountTab.current.click()}
										>
											<Text fontSize="xs" color="#fff" fontWeight="bold">
												NEXT
											</Text>
										</Button>
									</Flex>
								</Flex>
							</Box>
						</Box>
					</TabPanel>
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<Flex mb="40px">
								<Flex direction="column" align="center" justify="center" textAlign="center" w="80%" mx="auto">
									<Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
										Opt ins for forms and supply chain
									</Text>
									<Text color="gray.400" fontWeight="normal" fontSize="sm">
										These are completely optional, but they would be helpful in improving other tech for the site.
									</Text>
								</Flex>
							</Flex>
							<Box>
								<Flex direction="column" w="100%">
									<Text color="gray.600" fontWeight="normal" fontSize="sm" mb={4}>
										ArtisanalFutures includes a forum for discussion with other businesses and customers like you.
										Please indicate the kinds of forums you are interested in joining:
									</Text>
									<Stack
										direction={{ sm: "column", md: "row" }}
										spacing={{ sm: "20px", lg: "35px" }}
										alignSelf="center"
										justifySelf="center"
										mb="24px"
									>
										<Flex direction="column" align="center">
											<FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
												<Flex
													w="100%"
													h="100%"
													borderRadius="12px"
													justify="center"
													transition=".5s all ease"
													border="1px solid lightgray"
													align="center"
													bg={checkboxes.design ? "teal.300" : "#fff"}
													_hover={{ opacity: "0.8" }}
												>
													<Checkbox
														onChange={() =>
															setCheckboxes((prevCheckboxes) => {
																return {
																	...prevCheckboxes,
																	design: !prevCheckboxes.design,
																};
															})
														}
														display="none"
													/>
													<Icon as={AiFillSetting} w="54px" h="54px" color={checkboxes.design ? "#fff" : iconColor} />
												</Flex>
											</FormLabel>
											<Text color={textColor} fontWeight="bold" fontSize="md">
												Unmonitored, publicly visible and open to the public
											</Text>
										</Flex>
										<Flex direction="column" align="center">
											<FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
												<Flex
													w="100%"
													h="100%"
													borderRadius="12px"
													justify="center"
													transition=".5s all ease"
													border="1px solid lightgray"
													align="center"
													bg={checkboxes.code ? "teal.300" : "#fff"}
													_hover={{ opacity: "0.8" }}
												>
													<Checkbox
														onChange={() =>
															setCheckboxes((prevCheckboxes) => {
																return {
																	...prevCheckboxes,
																	code: !prevCheckboxes.code,
																};
															})
														}
														display="none"
													/>
													<Icon as={FaCube} w="54px" h="54px" color={checkboxes.code ? "#fff" : iconColor} />
												</Flex>
											</FormLabel>
											<Text color={textColor} fontWeight="bold" fontSize="md">
												Monitored, publicly visible, and open to the public
											</Text>
										</Flex>
										<Flex direction="column" align="center">
											<FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
												<Flex
													w="100%"
													h="100%"
													borderRadius="12px"
													justify="center"
													transition=".5s all ease"
													border="1px solid lightgray"
													align="center"
													bg={checkboxes.develop ? "teal.300" : "#fff"}
													_hover={{ opacity: "0.8" }}
												>
													<Checkbox
														onChange={() =>
															setCheckboxes((prevCheckboxes) => {
																return {
																	...prevCheckboxes,
																	develop: !prevCheckboxes.develop,
																};
															})
														}
														display="none"
													/>
													<Icon w="54px" h="54px" color={checkboxes.develop ? "#fff" : iconColor} />
												</Flex>
											</FormLabel>
											<Text color={textColor} fontWeight="bold" fontSize="md">
												Privately visible and open to approved members only
											</Text>
										</Flex>
										<Flex direction="column" align="center">
											<FormLabel w="150px" h="150px" cursor="pointer" mb="16px">
												<Flex
													w="100%"
													h="100%"
													borderRadius="12px"
													justify="center"
													transition=".5s all ease"
													border="1px solid lightgray"
													align="center"
													bg={checkboxes.other ? "teal.300" : "#fff"}
													_hover={{ opacity: "0.8" }}
												>
													<Checkbox
														onChange={() =>
															setCheckboxes((prevCheckboxes) => {
																return {
																	...prevCheckboxes,
																	other: !prevCheckboxes.other,
																};
															})
														}
														display="none"
													/>
													<Icon w="54px" h="54px" color={checkboxes.other ? "#fff" : iconColor} />
												</Flex>
											</FormLabel>
											<Text color={textColor} fontWeight="bold" fontSize="md">
												Invisible and open to invited members only
											</Text>
										</Flex>
									</Stack>
									<Text color="gray.600" fontWeight="normal" fontSize="sm" mb={4}>
										Supply chains provide materials and resources critical for your work. We want to use collective
										bargaining by identifying alternative and multiple sources and help network you and other
										businesses. To do this we need more supply chain conversations. To help do this we need periodic
										input from you. If you agree, then from time to time we will ask you to mention what supplies and
										materials you are currently using. Our AI technology will help suggest materials and processes
										upfront to save you time and effort. What the AI technology learns helps us identify outside price
										dips for groups of materials useful to groups of ArtisanalFutures businesses. It also helps us
										identify alternative and new sources.
									</Text>
									<FormControl display="flex" alignItems="center">
										<FormLabel htmlFor="email-alerts" mb="0">
											I agree to be a part of our supply chain conversations service
										</FormLabel>
										<Switch id="email-alerts" />
									</FormControl>
									<Flex justify="space-between">
										<Button
											variant="no-hover"
											bg={bgPrevButton}
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
											onClick={() => businessTab.current.click()}
										>
											<Text fontSize="xs" color="gray.700" fontWeight="bold">
												PREV
											</Text>
										</Button>
										<Button
											variant="no-hover"
											bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
											onClick={() => addressTab.current.click()}
										>
											<Text fontSize="xs" color="#fff" fontWeight="bold">
												NEXT
											</Text>
										</Button>
									</Flex>
								</Flex>
							</Box>
						</Box>
					</TabPanel>
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<Flex mb="40px">
								<Flex direction="column" align="center" justify="center" textAlign="center" w="80%" mx="auto">
									<Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
										Artisanal Futures Collective Agreement
									</Text>
									<Text color="gray.400" fontWeight="normal" fontSize="sm">
										INSERT_REASON_HERE
									</Text>
								</Flex>
							</Flex>
							<Box>
								<Flex direction="column" w="100%">
									<Stack direction="column" spacing="20px">
										<FormControl>
											<Checkbox isDisabled>
												Please read and agree to our Terms of Service here ArtisanalFutures supports collective efforts.
											</Checkbox>
										</FormControl>
										<FormControl>
											<Checkbox defaultChecked>
												Please read and agree to our ArtisanalFutures’ Collective Agreement here (document in progress).
											</Checkbox>
										</FormControl>
									</Stack>
									<Flex justify="space-between">
										<Button
											variant="no-hover"
											bg={bgPrevButton}
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
											onClick={() => accountTab.current.click()}
										>
											<Text fontSize="xs" color="gray.700" fontWeight="bold">
												PREV
											</Text>
										</Button>
										<Button
											variant="no-hover"
											bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
										>
											<Text fontSize="xs" color="#fff" fontWeight="bold">
												SEND
											</Text>
										</Button>
									</Flex>
								</Flex>
							</Box>
						</Box>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
}

export default SignUpForm;
