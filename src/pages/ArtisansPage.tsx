import ArtisanCard from "@/components/ArtisanCard";
import PageContainer from "@/components/PageContainer";

import { LoadContainer } from "@/layout";
import { fetchArtisans } from "@/middleware/fetching";
import { ArtisanACF } from "@/types";
import { Fragment } from "react";
const ArtisansPage = () => {
	const { artisans, isLoading, isError } = fetchArtisans();

	const pageInfo = {
		title: "Artisans",
		subtitle: "Browse our featured artisans and discover their online stores, profiles, and more",
	};
	return (
		<PageContainer {...pageInfo}>
			<LoadContainer isLoading={isLoading} isError={false}>
				{(isError || (!isLoading && artisans?.length === 0)) && (
					<p className="mt-10 font-normal">
						There seems to be an issue fetching the artisans. Please try refreshing the page, or try again later.
					</p>
				)}

				{artisans?.length > 0 && (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{artisans.map((store: ArtisanACF, index: number) => (
							<Fragment key={index}>
								{store.acf.business.name && (
									<section>
										<ArtisanCard {...store.acf} slug={store.slug} />
									</section>
								)}
							</Fragment>
						))}
					</div>
				)}
			</LoadContainer>
		</PageContainer>
	);
};
export default ArtisansPage;
