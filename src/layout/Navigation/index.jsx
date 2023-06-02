import {
	Box,
	Button,
	Collapse,
	Container,
	Flex,
	Icon,
	IconButton,
	Image,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	useBreakpointValue,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserDropdown from "./components/UserDropdown";

import { Prompt } from "../../features/LogInPrompt/";
export default function Navigation() {
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const [currentUser, setCurrentUser] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		setCurrentUser(AuthService.getCurrentUser());
	}, []);

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}>
				<Container maxW={"6xl"} flexDir={"row"} alignItems={"center"} display={"flex"}>
					<Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
						<IconButton
							onClick={onToggle}
							icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
							variant={"ghost"}
							aria-label={"Toggle Navigation"}
						/>
					</Flex>
					<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
						{/* <Text
							textAlign={useBreakpointValue({ base: "center", md: "left" })}
							fontFamily={"heading"}
							color={useColorModeValue("gray.800", "white")}
							onClick={() => navigate("/")}
						>
							Artisanal Futures
						</Text> */}
						<Image src={"img/logo.png"} h={5} onClick={() => navigate("/")} />

						<Flex display={{ base: "none", md: "flex" }} ml={10}>
							<DesktopNav />
						</Flex>
					</Flex>
					<Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
						{!currentUser?.token && (
							<>
								<Button
									as={"a"}
									display={{ base: "none", md: "inline-flex" }}
									fontSize={"sm"}
									fontWeight={400}
									variant={"link"}
									onClick={() => navigate("/registration")}>
									Become an Artisan
								</Button>

								<Button
									display={{ base: "none", md: "inline-flex" }}
									fontSize={"sm"}
									fontWeight={600}
									color={"white"}
									bg={"blue.400"}
									onClick={() => navigate("/login")}
									_hover={{
										bg: "pink.300",
									}}>
									Sign In
								</Button>
							</>
						)}

						{currentUser?.token && <UserDropdown username={currentUser.user_nicename} />}

						<Button onClick={toggleColorMode} hidden>
							{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
						</Button>
					</Stack>{" "}
				</Container>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");
	const navigate = useNavigate();
	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Link
								p={2}
								// href={navItem.href ?? "#"}
								onClick={() => {
									if (navItem.href === "https://forum.artisanalfutures.org/") {
										window.location.href = "https://forum.artisanalfutures.org/";
										return;
									}

									navigate(navItem.href ?? "#");
								}}
								fontSize={"sm"}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent border={0} boxShadow={"xl"} bg={popoverContentBgColor} p={4} rounded={"xl"} minW={"sm"}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	const navigate = useNavigate();
	return (
		<Link
			// href={href}
			onClick={() => navigate(href)}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("pink.50", "gray.900") }}>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text transition={"all .3s ease"} _groupHover={{ color: "pink.400" }} fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
					justify={"flex-end"}
					align={"center"}
					flex={1}>
					<Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	const [currentUser, setCurrentUser] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		setCurrentUser(AuthService.getCurrentUser());
	}, []);
	return (
		<Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}

			{!currentUser?.token && (
				<>
					<Stack spacing={4} onClick={() => navigate("/registration")}>
						<Flex
							py={2}
							as={Link}
							justify={"space-between"}
							align={"center"}
							_hover={{
								textDecoration: "none",
							}}>
							<Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
								Become an Artisan
							</Text>
						</Flex>
					</Stack>

					<Stack spacing={4} onClick={() => navigate("/login")}>
						<Flex
							py={2}
							as={Link}
							justify={"space-between"}
							align={"center"}
							_hover={{
								textDecoration: "none",
							}}>
							<Text
								px={"8"}
								py={"2"}
								borderRadius={"5"}
								fontWeight={600}
								color={useColorModeValue("gray.50", "gray.600")}
								bg={"blue.400"}
								_hover={{
									bg: "pink.300",
								}}>
								Sign In
							</Text>
						</Flex>
					</Stack>
				</>
			)}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();
	const navigate = useNavigate();
	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				onClick={() => {
					if (href === "https://forum.artisanalfutures.org/") {
						window.location.href = "https://forum.artisanalfutures.org/";
						return;
					}

					navigate(href ?? "#");
				}}
				// href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}>
				<Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={"solid"}
					borderColor={useColorModeValue("gray.200", "gray.700")}
					align={"start"}>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	// {
	// 	label: "Stores",
	// 	children: [
	// 		{
	// 			label: "Explore Design Work",
	// 			subLabel: "Trending Design to inspire you",
	// 			href: "#",
	// 		},
	// 		{
	// 			label: "New & Noteworthy",
	// 			subLabel: "Up-and-coming Designers",
	// 			href: "#",
	// 		},
	// 	],
	// },
	// {
	// 	label: "Products",
	// 	children: [
	// 		{
	// 			label: "Job Board",
	// 			subLabel: "Find your dream design job",
	// 			href: "#",
	// 		},
	// 		{
	// 			label: "Freelance Projects",
	// 			subLabel: "An exclusive list for contract work",
	// 			href: "#",
	// 		},
	// 	],
	// },
	{
		label: " Artisans",
		href: "/artisans",
	},

	{
		label: "Products",
		href: "/products",
	},
	{
		label: "Forums",
		href: "https://forum.artisanalfutures.org/",
	},
	{
		label: "Tools",
		href: "/tools",
	},
];
