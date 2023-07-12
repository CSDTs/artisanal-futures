import AuthService from "@/services/auth.service";

import { NavLink, useNavigate } from "react-router-dom";

import Logo from "@/assets/logo.png";

import DebugButton from "@/components/DebugButton";
import useArtisanData from "@/hooks/useArtisanData";
import useAuth from "@/hooks/useAuth";
import combineTailwindClasses from "@/utils/combineTailwindClasses";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const navigation = [
	{ name: "Artisans", href: "/artisans" },
	{ name: "Products", href: "/products" },
	{ name: "Forums", href: "https://forum.artisanalfutures.org/" },
	{ name: "Tools", href: "/tools" },
];

export default function Navigation() {
	const { artisanData, isLoading: isDataLoading, error: dataError } = useArtisanData();
	const profileImage = artisanData?.profile_image_url || null;

	const navigate = useNavigate();

	const { loading: isAuthLoading, authenticated, logout } = useAuth();

	return (
		<>
			{/* <div className="p-3 bg-red-500 bg-opacity-60 font-semibold ">
				Error: There seems to be an issue logging in to your account. Please try again later. If the issue persists,
				please contact us{" "}
				<a href="/contact" className="font-bold text-red-900">
					here
				</a>
			</div> */}

			<Disclosure as="nav" className="bg-white border-b border-b-slate-100">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:border-b hover:bg-slate-200  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start h-full">
									<div className="flex flex-shrink-0 items-center">
										<a href="/">
											<img className="block h-5 w-auto lg:hidden" src={Logo} alt="Your Company" />
											<img className="hidden h-5 w-auto lg:block" src={Logo} alt="Your Company" />
										</a>
									</div>

									<div className="hidden sm:ml-6 sm:block h-full">
										<div className="flex space-x-4 h-full ">
											{navigation.map((item) => (
												<NavLink
													key={item.name}
													className={({ isActive }) =>
														`p-2 font-medium text-sm text-slate-500 h-full  border-transparent  flex items-center border-2 + ${
															isActive
																? "border-b-2 border-b-indigo-500 text-slate-800 hover:text-slate-800"
																: "text-gray-300 hover:border-b-2 hover:border-b-slate-300 hover:text-slate-800"
														}`
													}
													to={item.href}>
													<span>{item.name}</span>
												</NavLink>
											))}
										</div>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									{/* Profile dropdown */}
									{isDataLoading && !artisanData && (
										<div className="animate-pulse flex ">
											<div className="rounded-full bg-slate-300 h-8 w-8"></div>
										</div>
									)}

									{!isAuthLoading && artisanData && authenticated && (
										<Menu as="div" className="relative ml-3 ">
											<div>
												<Menu.Button className="flex rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-100">
													<span className="sr-only">Open user menu</span>
													<img
														className="h-8 w-8 rounded-full"
														src={
															profileImage
																? profileImage
																: `https://avatars.dicebear.com/api/identicon/${artisanData.username}.svg`
														}
														alt=""
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95">
												<Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
													<p className="block px-4 py-2 text-sm text-gray-700 font-medium">{artisanData?.username}</p>
													<Menu.Item>
														{({ active }) => (
															<a
																href="/profile"
																className={combineTailwindClasses(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Your Profile
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href="#"
																className={combineTailwindClasses(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Settings
															</a>
														)}
													</Menu.Item>
													{import.meta.env.DEV && (
														<Menu.Item>
															{({ active }) => (
																<a
																	href="/welcome"
																	className={combineTailwindClasses(
																		active ? "bg-gray-100" : "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}>
																	Test Welcome Page
																</a>
															)}
														</Menu.Item>
													)}
													<Menu.Item>
														{({ active }) => (
															<button
																onClick={() => logout()}
																className={combineTailwindClasses(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Sign out
															</button>
														)}
													</Menu.Item>{" "}
												</Menu.Items>
											</Transition>
										</Menu>
									)}

									{(!authenticated || dataError) && (
										<div className="md:flex gap-4 hidden">
											<button
												className="font-thin whitespace-nowrap hover:font-normal"
												onClick={() => navigate("/contact")}>
												Become an Artisan
											</button>
											<button
												className="bg-indigo-500 text-white px-3 py-2 font-medium text-sm rounded hover:bg-indigo-700 active:bg-indigo-800"
												onClick={() => navigate("/login")}>
												Sign In
											</button>
										</div>
									)}

									<DebugButton />
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => (
									<NavLink
										key={item.name}
										to={item.href}
										className={({ isActive }) =>
											`p-2 font-medium text-base  h-full  border-transparent  flex items-center border-l-4  ${
												isActive
													? " border-l-indigo-600 bg-indigo-600 bg-opacity-10 text-indigo-600 "
													: " hover:bg-slate-300 hover:text-slate-600 hover:border-l-slate-400 text-slate-500 hover:bg-opacity-20"
											}`
										}>
										{item.name}
									</NavLink>
								))}

								<hr className="my-4 mx-2" />
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</>
	);
}
