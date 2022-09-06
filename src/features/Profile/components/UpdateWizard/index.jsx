import {
	Avatar,
	Box,
	Button,
	chakra,
	Checkbox,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	Icon,
	Image,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Switch,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
	VisuallyHidden,
} from "@chakra-ui/react";
// Custom components
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import AuthService from "../../../../services/auth.service";

import AccountPanel from "./AccountPanel";
import BusinessPanel from "./BusinessPanel";
import OptInPanel from "./OptInPanel";
import PanelHeading from "./PanelHeading";
import PanelNavigation from "./PanelNavigation";
import PanelTab from "./PanelTab";
import ProfilePanel from "./ProfilePanel";
import SummaryPanel from "./SummaryPanel";

import MemberService from "../../../../services/member.service";

export default function UpdateWizard() {
	const { user, isLoading, isError } = MemberService.getMemberInformationACF(
		JSON.parse(localStorage.getItem("user")).membership_id,
		true
	);

	const userID = JSON.parse(localStorage.getItem("user")).membership_id;
	const textColor = useColorModeValue("gray.700", "white");
	const bgPrevButton = useColorModeValue("gray.100", "gray.100");
	const iconColor = useColorModeValue("gray.300", "gray.700");

	const [checkboxes, setCheckboxes] = useState({
		unmonitored: false,
		monitored: false,
		privately_visible: false,
		invisible: false,
	});

	useEffect(() => {
		if (user?.user)
			setAccountPayload({
				...accountPayload,
				...{ first_name: user.user.user_firstname, last_name: user.user.user_lastname },
			});
		if (user?.business) setBusinessPayload({ ...businessPayload, ...user.business });
		if (user?.profile) setProfilePayload({ ...businessPayload, ...user.profile });
		if (user?.modifiers) {
			setMiscPayload({ ...miscPayload, ...user.modifiers });
			setCheckboxes(user.modifiers.fourm);
		}

		if (user?.profile_image)
			setAccountPayload((data) => {
				return {
					...data,
					preview: user.profile_image,
				};
			});
		// if (user) userID = JSON.parse(localStorage.getItem("user")).membership_id;

		console.log(userID);
	}, [user]);

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
		name: "",
		email: "",
		phone_number: "",
		address: "",
		website: "",
		business_and_customer_description: "",
		principles: "",
		materials: "",
		processes: "",
		thumbnail_image: "",
		selectedFile: null,
		preview: null,
	});

	const [miscPayload, setMiscPayload] = useState({
		terms_of_service: false,
		collective_agreement: false,
		formType: [],
		fourm: {
			unmonitored: false,
			monitored: false,
			privately_visible: false,
			invisible: false,
		},
		supply_chain: false,
	});

	const [profilePayload, setProfilePayload] = useState({
		about_me: "",
		business_information: "",
		misc_information: "",
		cover_image: "",
		selectedFile: null,
		preview: null,
	});

	const navigate = useNavigate();

	const uploadMedia = (payload, callback) => {
		if (!payload.selectedFile) return;

		let formData = new FormData();
		let file = payload.selectedFile;
		formData.append("file", file);
		formData.append("title", file.name);

		let headers = {};
		headers["Content-Disposition"] = "form-data; filename='" + file.name + "'";
		headers["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
		axios
			.post("https://fourm.artisanalfutures.org/wp-json/wp/v2/media", formData, {
				headers: headers,
			})
			.then((res) => callback(res));
	};

	async function updateUserInWPMembership() {
		uploadMedia(accountPayload, (resp) => {
			MemberService.postMembershipData(userID, { profile_image: resp.data.source_url });
		});

		await updateOptInsInWPMembership();
		return AuthService.updateUserInformation({
			...accountPayload,
			name: accountPayload.first_name + " " + accountPayload.last_name,
			nickname: accountPayload.first_name + " " + accountPayload.last_name,
		}).then(() =>
			MemberService.postMembershipData(userID, {
				full_name: accountPayload.first_name + " " + accountPayload.last_name,
			})
		);
	}

	async function updateBusinessInWPMembership() {
		uploadMedia(businessPayload, (resp) => {
			MemberService.postMembershipData(userID, { business: { thumbnail_image: resp.data.source_url } });
		});

		return MemberService.postMembershipData(userID, { business: businessPayload });
	}

	async function updateProfileInWPMembership() {
		uploadMedia(profilePayload, (resp) => {
			MemberService.postMembershipData(userID, { profile: { cover_image: resp.data.source_url } });
		});
		return MemberService.postMembershipData(userID, { profile: profilePayload });
	}

	async function updateOptInsInWPMembership() {
		return MemberService.postMembershipData(userID, { modifiers: miscPayload });
	}
	async function updateStatusInWPMembership() {
		return MemberService.postMembershipData(userID, { first_time_setup: true });
	}

	async function submitWPData() {
		await updateStatusInWPMembership();
		await updateUserInWPMembership();
		await updateBusinessInWPMembership();
		await updateOptInsInWPMembership();
		await updateProfileInWPMembership();
		await MemberService.publishMembershipData(userID);

		navigate("/profile");
		window.location.reload();
	}

	return (
		<Flex direction="column" minH="100vh" align="center" pt={{ sm: "125px", lg: "75px" }}>
			<Flex direction="column" textAlign="center" mb={{ sm: "25px", md: "45px" }}>
				{user?.user.user_firstname ? (
					<Text color={textColor} fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" mb="8px">
						Welcome back, {user?.user.user_firstname}! Let's update your profile
					</Text>
				) : (
					<Text color={textColor} fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" mb="8px">
						Welcome to Artisanal Futures! Let's create your profile
					</Text>
				)}

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
										handleSubmit={() => updateUserInWPMembership()}
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
										handleSubmit={updateBusinessInWPMembership}
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
										handleSubmit={() => updateOptInsInWPMembership()}
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
										handleSubmit={updateProfileInWPMembership}
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
