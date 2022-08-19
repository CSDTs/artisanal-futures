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
import ProfileService from "../../services/profile.service";
import { useNavigate } from "react-router-dom";
import PanelTab from "./PanelTab";
function SignUpForm({ artisan, isUpdate }) {
	const textColor = useColorModeValue("gray.700", "white");
	const bgPrevButton = useColorModeValue("gray.100", "gray.100");
	const iconColor = useColorModeValue("gray.300", "gray.700");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [checkboxes, setCheckboxes] = useState({
		unmonitored: false,
		monitored: false,
		private: false,
		invisible: false,
	});

	const [fetchedStore, setFetchedStore] = useState();
	useEffect(() => {
		if (artisan.store)
			ShopService.getShop(artisan.store.ID).then((data) => {
				setFetchedStore(data.acf);
			});
		if (artisan.description) {
			setMiscPayload(JSON.parse(artisan.description));
			setCheckboxes(JSON.parse(artisan.description).formType);
		}

		if (artisan) {
			setAccountPayload({ ...accountPayload, ...{ first_name: artisan.first_name, last_name: artisan.last_name } });
		}

		if (artisan.profile) {
			ProfileService.getProfile(artisan.profile.ID).then((data) => {
				console.log(data);
				setProfilePayload({ ...profilePayload, ...data.acf });
			});
		}
	}, [artisan]);

	useEffect(() => {
		// console.log(fetchedStore);
		setBusinessPayload({ ...businessPayload, ...fetchedStore });
	}, [fetchedStore]);

	const [activeBullets, setActiveBullets] = useState({
		about: true,
		business: false,
		account: false,
		address: false,
		summary: false,
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
		description: "User has not agreed to the TOS and Collective Agreement.",
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

	const [miscPayload, setMiscPayload] = useState({
		tos: false,
		agreement: false,
		formType: [],
		supplyChain: false,
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
		selectedFile: null,
		preview: null,
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

	const navigate = useNavigate();
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
			let formData = new FormData();
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
						ShopService.updateShop(store_profile, { thumbnail_image: resp.data.source_url });
					});
				});
		}
	}

	function updateProfileCover() {
		if (profilePayload.selectedFile) {
			let formData = new FormData();
			let file = profilePayload.selectedFile;
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
						let profile_id = data[0].acf.profile.ID || "";

						ProfileService.updateProfile({ cover_image: resp.data.source_url }, profile_id);
					});
				});
		}
	}

	async function updateUserInWP() {
		updateItem();
		return AuthService.updateUserInformation(accountPayload).then(() =>
			AuthService.updateUserInformation({ description: JSON.stringify(miscPayload) }).then(() =>
				AuthService.updateUserInformation({ name: `${accountPayload.first_name} ${accountPayload.last_name}` })
			)
		);
	}

	async function updateOptInsInWP() {
		// updateItem();
		return AuthService.updateUserInformation({ description: JSON.stringify(miscPayload) });
	}

	async function updateBusinessInWP() {
		updateBusinessCover();
		return ShopService.updateShop(artisan?.store?.ID, businessPayload);
	}

	async function updateProfileInWP() {
		updateProfileCover();
		console.log(profilePayload);
		return ProfileService.updateProfile(profilePayload, artisan?.profile?.ID || "");
	}
	async function submitWPData() {
		await updateUserInWP();
		await updateBusinessInWP();
		await updateOptInsInWP();
		await updateProfileInWP();
		await ShopService.publishShop(artisan?.store?.ID);
		await ProfileService.publishProfile(artisan?.profile?.ID);
		navigate("/stores");
	}

	return (
		<Flex direction="column" minH="100vh" align="center" pt={{ sm: "125px", lg: "75px" }}>
			<Flex direction="column" textAlign="center" mb={{ sm: "25px", md: "45px" }}>
				<Text color={textColor} fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" mb="8px">
					Welcome back, {artisan.first_name}! {isUpdate ? "Update" : "Build"} your profile
				</Text>
				<Text color="gray.400" fontWeight="normal" fontSize={{ sm: "sm", md: "lg" }}>
					This information will let us know more about you.
				</Text>
			</Flex>
			<Tabs variant="unstyled" mt="24px" display="flex" flexDirection="column">
				<TabList display="flex" align="center" alignSelf="center" justifySelf="center">
					<PanelTab
						tabRef={aboutTab}
						next={activeBullets.business}
						current={activeBullets.about}
						title={"About"}
						textColor={textColor}
						handleClick={() =>
							setActiveBullets({
								about: true,
								business: false,
								account: false,
								address: false,
								summary: false,
							})
						}
					/>

					<PanelTab
						tabRef={businessTab}
						next={activeBullets.account}
						current={activeBullets.business}
						title={"Business"}
						textColor={textColor}
						handleClick={() =>
							setActiveBullets({
								about: true,
								business: true,
								account: false,
								address: false,
								summary: false,
							})
						}
					/>
					<PanelTab
						tabRef={accountTab}
						next={activeBullets.address}
						current={activeBullets.account}
						title={"Opt-ins"}
						textColor={textColor}
						handleClick={() =>
							setActiveBullets({
								about: true,
								business: true,
								account: true,
								address: false,
								summary: false,
							})
						}
					/>
					<PanelTab
						tabRef={addressTab}
						next={activeBullets.summary}
						current={activeBullets.address}
						title={"Profile"}
						textColor={textColor}
						handleClick={() =>
							setActiveBullets({
								about: true,
								business: true,
								account: true,
								address: true,
								summary: false,
							})
						}
					/>
					<PanelTab
						tabRef={summaryTab}
						isLast={true}
						current={activeBullets.summary}
						title={"Summary"}
						textColor={textColor}
						handleClick={() =>
							setActiveBullets({
								about: true,
								business: true,
								account: true,
								address: true,
								summary: true,
							})
						}
					/>
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
										miscPayload={miscPayload}
										setMiscPayload={setMiscPayload}
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
									<OptInPanel
										checkboxes={checkboxes}
										setCheckboxes={setCheckboxes}
										textColor={textColor}
										optInPayload={miscPayload}
										setOptInPayload={setMiscPayload}
									/>
									<PanelNavigation
										handlePrev={() => businessTab.current.click()}
										handleNext={() => addressTab.current.click()}
										handleSubmit={() => updateOptInsInWP()}
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
										handleSubmit={updateProfileInWP}
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
									<SummaryPanel
										account={accountPayload}
										business={businessPayload}
										optional={miscPayload}
										profile={profilePayload}
										textColor={textColor}
									/>

									<PanelNavigation
										handlePrev={() => addressTab.current.click()}
										handleNext={() => {
											return;
										}}
										prevColor={bgPrevButton}
										isSubmit={true}
										handleSubmit={submitWPData}
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
