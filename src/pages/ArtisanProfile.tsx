import { useParams } from "react-router-dom";

import { AboutMe, DetailsService, Header, Sidebar } from "../features/ArtisanProfile";

import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { LoadContainer } from "../layout";

export default function ArtisanProfile() {
	const { name } = useParams();

	const { artisan, business, profile, profile_image, isLoading, isError } =
		DetailsService.getMemberInformationBySlug(name);

	useEffect(() => {
		console.log(artisan);
		console.log(isLoading);
		console.log(isError);
		console.log(business);
	}, [artisan, business, isLoading, isError]);
	return (
		<LoadContainer isLoading={isLoading} isError={isError}>
			{/* <div className="main-content">
				<Header />
				<div className="container-fluid mt--7">
					{artisan && (
						<div className="row">
							<Sidebar artisan={artisan} profile_image={profile_image} business={business} profile={profile} />
							<AboutMe profile={profile} />
						</div>
					)}
				</div>
			</div> */}
			<div className="flex h-full w-full items-center justify-center aspect-[1.618]">
				<div className="w-10/12 flex items-center">
					<div className="w-8/12 h-full  flex flex-col bg-slate-200 p-4 ">
						<h1 className="font-semibold text-4xl">{artisan?.full_name}</h1>
						<h2 className="text-2xl">{business?.name}</h2>

						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum. Lorem
							ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum. Lorem ipsum
							dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.
						</p>

						<div className="flex ">
							<FaUser />
							<FaUser />
							<FaUser />
							<FaUser />
							<FaUser />
						</div>
					</div>

					<img src="/img/hero.jpg" alt="" className="aspect-[3/4] object-cover w-4/12 " />
				</div>
			</div>
		</LoadContainer>
	);
}
