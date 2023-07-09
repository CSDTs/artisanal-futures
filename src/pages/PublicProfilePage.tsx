import { useParams } from "react-router-dom";

import { AboutMe, DetailsService, Header, Sidebar } from "../features/ArtisanProfile";

import PageContainer from "@/components/PageContainer";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { LoadContainer } from "../layout";

const PublicProfilePage = () => {
	const { name } = useParams();

	const { artisan, business, profile, profile_image, isLoading, isError } =
		DetailsService.getMemberInformationBySlug(name);

	return (
		<PageContainer>
			<LoadContainer isLoading={isLoading} isError={isError}>
				<div className="flex h-full w-full items-center justify-center aspect-[1.618]">
					<div className="w-10/12 flex items-center">
						<div className="w-8/12 h-full  flex flex-col bg-slate-200 p-4 ">
							<h1 className="font-semibold text-4xl">{artisan?.full_name}</h1>
							<h2 className="text-2xl">{business?.name}</h2>

							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.
							</p>
						</div>

						<img src="/img/hero.jpg" alt="" className="aspect-[3/4] object-cover w-4/12 " />
					</div>
				</div>
			</LoadContainer>
		</PageContainer>
	);
};

export default PublicProfilePage;
