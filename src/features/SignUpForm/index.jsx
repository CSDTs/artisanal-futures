import {
	Avatar,
	Link,
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
	VisuallyHidden,
	chakra,
	Tab,
	TabList,
	Switch,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue,
	useDisclosure,
	FormHelperText,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Textarea,
} from "@chakra-ui/react";
// Custom components
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { FaCube, FaUserAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import ImageUpload from "../../components/ImageUpload";
import AuthService from "../../services/auth.service";
import AccountPanel from "./AccountPanel";
import BusinessPanel from "./BusinessPanel";
import OptInPanel from "./OptInPanel";
import PanelHeading from "./PanelHeading";
import PanelNavigation from "./PanelNavigation";
import ProfilePanel from "./ProfilePanel";
import SummaryPanel from "./SummaryPanel";
import axios from "axios";
import ShopService from "../../services/shop.service";
function SignUpForm({ artisan, isUpdate }) {
	const textColor = useColorModeValue("gray.700", "white");
	const bgPrevButton = useColorModeValue("gray.100", "gray.100");
	const iconColor = useColorModeValue("gray.300", "gray.700");
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [fetchedStore, setFetchedStore] = useState();
	useEffect(() => {
		if (artisan.store)
			ShopService.getShop(artisan.store.ID).then((data) => {
				setFetchedStore(data.acf);
			});
	}, [artisan]);

	useEffect(() => {
		console.log(fetchedStore);
		setBusinessPayload({ ...businessPayload, ...fetchedStore });
	}, [fetchedStore]);

	const [activeBullets, setActiveBullets] = useState({
		about: true,
		business: false,
		account: false,
		address: false,
		summary: false,
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
	const summaryTab = useRef();
	const [accountPayload, setAccountPayload] = useState({
		first_name: "",
		last_name: "",
		username: JSON.parse(localStorage.getItem("user")).user_nicename,
		email: JSON.parse(localStorage.getItem("user")).user_email,
		selectedFile: null,
		preview: null,
	});

	const [businessPayload, setBusinessPayload] = useState({
		business_name: "",
		general_location: "",
		website: "",
		business_and_customer_description: "",
		business_principles: "",
		business_materials: "",
		business_processes: "",
		thumbnail_image: "",
		selectedFile: null,
		preview: null,
	});

	const [profilePayload, setProfilePayload] = useState({
		name: "",
		general_location: businessPayload.general_location,
		website: businessPayload.website,
		profile_information: "",
		misc_information: "",
		business_information: "",
		cover_image: "",
		profile_image: "",
	});
	const setAccountValue = (key, value) => {
		setAccountPayload((data) => {
			return {
				...data,
				[key]: value,
			};
		});
	};

	const setBusinessValue = (key, value) => {
		setBusinessPayload((data) => {
			return {
				...data,
				[key]: value,
			};
		});
	};

	const setProfileValue = (key, value) => {
		setProfilePayload((data) => {
			return {
				...data,
				[key]: value,
			};
		});
	};

	useEffect(() => {
		if (!accountPayload.selectedFile) {
			setAccountValue("preview", null);
			return;
		}

		const objectUrl = URL.createObjectURL(accountPayload.selectedFile);

		setAccountValue("preview", objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [accountPayload.selectedFile]);

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setAccountValue("selectedFile", null);
			return;
		}

		setAccountValue("selectedFile", e.target.files[0]);
	};

	useEffect(() => {
		if (artisan)
			ShopService.getProfile(artisan?.profile?.ID).then((data) => {
				setAccountValue("preview", data.artisan_image);
			});
	}, [artisan]);
	function updateItem() {
		if (accountPayload.selectedFile) {
			var formData = new FormData();
			let file = accountPayload.selectedFile;
			formData.append("file", file);
			formData.append("title", file.name);

			let headers = {};
			headers["Content-Disposition"] = "form-data; filename='" + file.name + "'";
			headers["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
			axios
				.post("https://fourm.artisanalfutures.org/wp-json/wp/v2/media", formData, {
					headers: headers,
				})
				.then(function (resp) {
					AuthService.getUserInformation().then((data) => {
						let artisan_profile = data[0].acf.profile.ID;
						AuthService.updateArtisanInformation(artisan_profile, { fields: { artisan_image: resp.data.source_url } });
					});
				});
		}
	}

	function updateBusinessCover() {
		if (businessPayload.selectedFile) {
			var formData = new FormData();
			let file = businessPayload.selectedFile;
			formData.append("file", file);
			formData.append("title", file.name);

			let headers = {};
			headers["Content-Disposition"] = "form-data; filename='" + file.name + "'";
			headers["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
			axios
				.post("https://fourm.artisanalfutures.org/wp-json/wp/v2/media", formData, {
					headers: headers,
				})
				.then(function (resp) {
					AuthService.getUserInformation().then((data) => {
						let store_profile = data[0].acf.store.ID;
						ShopService.updateShop(store_profile, { fields: { thumbnail_image: resp.data.source_url } });
					});
				});
		}
	}

	async function updateUserInWP() {
		updateItem();
		return AuthService.updateUserInformation(accountPayload);
	}

	async function updateBusinessInWP() {
		updateBusinessCover();
		return ShopService.updateShop(artisan?.store?.ID, businessPayload);
	}

	return (
		<Flex direction="column" minH="100vh" align="center" pt={{ sm: "125px", lg: "75px" }}>
			<Flex direction="column" textAlign="center" mb={{ sm: "25px", md: "45px" }}>
				<Text color={textColor} fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" mb="8px">
					{isUpdate ? "Update" : "Build"} your profile
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
								summary: false,
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
								summary: false,
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
								summary: false,
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
								summary: false,
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
								bg: activeBullets.summary ? textColor : "gray.200",
								left: { sm: "12px", md: "28px" },
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
								Profile
							</Text>
						</Flex>
					</Tab>
					<Tab
						ref={summaryTab}
						_focus="none"
						w={{ sm: "120px", md: "250px", lg: "300px" }}
						onClick={() =>
							setActiveBullets({
								about: true,
								business: true,
								account: true,
								address: true,
								summary: true,
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
								top: { sm: activeBullets.summary ? "6px" : "4px", md: null },
								position: "absolute",
								bottom: activeBullets.summary ? "40px" : "38px",
								zIndex: -1,
								transition: "all .3s ease",
							}}
						>
							<Icon
								as={BsCircleFill}
								color={activeBullets.summary ? textColor : "gray.300"}
								w={activeBullets.summary ? "16px" : "12px"}
								h={activeBullets.summary ? "16px" : "12px"}
								mb="8px"
							/>
							<Text
								color={activeBullets.summary ? { textColor } : "gray.300"}
								fontWeight={activeBullets.summary ? "bold" : "normal"}
								transition="all .3s ease"
								fontSize="sm"
								_hover={{ color: textColor }}
								display={{ sm: "none", md: "block" }}
							>
								Summary
							</Text>
						</Flex>
					</Tab>
				</TabList>
				<TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<PanelHeading
								title={"Let's start with the basic information"}
								subtitle={"This updates your temporary login with your information for future use"}
								textColor={textColor}
							/>
							<Box>
								<Flex direction="column" w="100%">
									<AccountPanel
										accountPayload={accountPayload}
										setAccountPayload={setAccountPayload}
										textColor={textColor}
									/>

									<PanelNavigation
										handleSubmit={() => updateUserInWP()}
										handleNext={() => businessTab.current.click()}
									/>
								</Flex>
							</Box>
						</Box>
					</TabPanel>
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<PanelHeading
								title={"Next, let's get some basic information on your business"}
								subtitle={"Filling this out will add your shop to the site"}
								textColor={textColor}
							/>

							<Box>
								<Flex direction="column" w="100%">
									<BusinessPanel
										businessPayload={businessPayload}
										setBusinessPayload={setBusinessPayload}
										textColor={textColor}
									/>
									<PanelNavigation
										handlePrev={() => aboutTab.current.click()}
										handleNext={() => accountTab.current.click()}
										handleSubmit={updateBusinessInWP}
										prevColor={bgPrevButton}
									/>
								</Flex>
							</Box>
						</Box>
					</TabPanel>
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<PanelHeading
								title={"Opt ins for forms and supply chain"}
								subtitle={
									"These are completely optional, but they would be helpful in improving other tech for the site."
								}
								textColor={textColor}
							/>

							<Box>
								<Flex direction="column" w="100%">
									<OptInPanel checkboxes={checkboxes} setCheckboxes={setCheckboxes} textColor={textColor} />
									<PanelNavigation
										handlePrev={() => businessTab.current.click()}
										handleNext={() => addressTab.current.click()}
										prevColor={bgPrevButton}
									/>
								</Flex>
							</Box>
						</Box>
					</TabPanel>
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<PanelHeading
								title={"Public Profile"}
								subtitle={"This information will create a profile page for others to see"}
								textColor={textColor}
							/>

							<Box>
								<Flex direction="column" w="100%">
									<ProfilePanel
										profilePayload={profilePayload}
										setProfilePayload={setProfilePayload}
										textColor={textColor}
									/>
									<PanelNavigation
										handlePrev={() => accountTab.current.click()}
										handleNext={() => summaryTab.current.click()}
										prevColor={bgPrevButton}
									/>
								</Flex>
							</Box>
						</Box>
					</TabPanel>
					<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
						<Box>
							<PanelHeading
								title={"Summary "}
								subtitle={"This information will create a profile page for others to see"}
								textColor={textColor}
							/>

							<Box>
								<Flex direction="column" w="100%">
									<SummaryPanel account={accountPayload} textColor={textColor} />

									<PanelNavigation
										handlePrev={() => addressTab.current.click()}
										handleNext={() => {
											return;
										}}
										prevColor={bgPrevButton}
										isSubmit={true}
									/>
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
