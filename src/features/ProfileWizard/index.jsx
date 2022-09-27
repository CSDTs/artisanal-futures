import { Box, Flex, Heading, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";

import { AccountPanel, BusinessPanel, OptInPanel, ProfilePanel, SummaryPanel } from "./components/Panels";
import { PanelHeading, PanelNavigation, PanelTab } from "./layouts/";

import AuthService from "../../services/auth.service";
import WizardService from "./services/wizard.service";

export default function ProfileWizard() {
	const { user, business, profile, modifiers, profile_image, isLoading, isError } = WizardService.getProfileData();

	const [accountPayload, setAccountPayload] = useState({
		first_name: "",
		last_name: "",

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

	const textColor = useColorModeValue("gray.700", "white");
	const bgPrevButton = useColorModeValue("gray.100", "gray.100");

	const [checkboxes, setCheckboxes] = useState({
		unmonitored: false,
		monitored: false,
		privately_visible: false,
		invisible: false,
	});

	useEffect(() => {
		if (isError && !AuthService.getCurrentUser()) navigate("/login");
	}, [isError]);

	useEffect(() => {
		if (user)
			setAccountPayload({
				...accountPayload,
				...{ first_name: user.user_firstname, last_name: user.user_lastname },
			});
		if (business) setBusinessPayload({ ...businessPayload, ...business });
		if (profile) setProfilePayload({ ...businessPayload, ...profile });
		if (modifiers) {
			setMiscPayload({ ...miscPayload, ...modifiers });
			setCheckboxes(modifiers.fourm);
		}

		if (profile_image)
			setAccountPayload((data) => {
				return {
					...data,
					preview: profile_image,
				};
			});
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

	const navigate = useNavigate();

	const labelProps = {
		color: textColor,
		fontSize: "xs",
		fontWeight: "bold",
	};

	const inputProps = {
		borderRadius: "15px",
		fontSize: "xs",
	};

	async function submitWPData() {
		await WizardService.updateProfileData({ first_time_setup: true });

		if (accountPayload.selectedFile)
			await WizardService.uploadMedia(accountPayload)
				.then((res) => {
					console.log(res);
					WizardService.uploadAvatar(accountPayload, res.data.source_url);
				})
				.catch((err) => console.log(err));
		else await WizardService.updateAccountData(accountPayload);

		if (businessPayload.selectedFile)
			await WizardService.uploadMedia(businessPayload)
				.then((res) => {
					Object.assign(businessPayload, { thumbnail_image: res.data.source_url });
					WizardService.updateProfileData({ business: businessPayload });
				})
				.catch((err) => console.log(err));
		else WizardService.updateProfileData({ business: businessPayload });

		await WizardService.updateProfileData({ modifiers: miscPayload });

		if (profilePayload.selectedFile)
			await WizardService.uploadMedia(profilePayload)
				.then((res) => {
					Object.assign(profilePayload, { cover_image: res.data.source_url });
					WizardService.updateProfileData({ profile: profilePayload });
				})
				.catch((err) => console.log(err));
		else WizardService.updateProfileData({ profile: profilePayload });

		await WizardService.publishMembershipData(AuthService.getCurrentUser().membership_id).then((res) => {
			if (res.status === 200) {
				navigate("/profile");
				window.location.reload();
			} else {
				// TODO: Add error alert to notify user to try again later
				throw new Error("User was unsuccessful with updating information.");
			}
		});
	}

	return (
		<>
			<Loading isLoading={isLoading} />

			{isError && !isLoading && (
				<Flex direction="column" align="center" pt={{ sm: "125px", lg: "75px" }}>
					<Heading>
						There was an error with loading the profile wizard. Please refresh your page, or try again later.
					</Heading>
				</Flex>
			)}
			{!isError && !isLoading && (
				<Flex direction="column" minH="100vh" align="center" pt={{ sm: "125px", lg: "75px" }}>
					<Flex direction="column" textAlign="center" mb={{ sm: "25px", md: "45px" }}>
						{user?.user_firstname ? (
							<Text color={textColor} fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" mb="8px">
								Welcome back, {user?.user_firstname}! Let&apos;s update your profile
							</Text>
						) : (
							<Text color={textColor} fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" mb="8px">
								Welcome to Artisanal Futures! Let&apos;s create your profile
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
												labelProps={labelProps}
												inputProps={inputProps}
											/>

											<PanelNavigation handleNext={() => businessTab.current.click()} />
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
												labelProps={labelProps}
												inputProps={inputProps}
											/>
											<PanelNavigation
												handlePrev={() => aboutTab.current.click()}
												handleNext={() => accountTab.current.click()}
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
												labelProps={labelProps}
												inputProps={inputProps}
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
			)}
		</>
	);
}
