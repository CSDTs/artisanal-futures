import ArtisanCard from "@/components/ArtisanCard";
import PageContainer from "@/components/PageContainer";
import BusinessCard from "@/features/Artisans/components/ArtisanCard";
import { Fragment } from "react";
import { ArtisanService } from "../features/Artisans";
import { LoadContainer } from "../layout";
export default function ArtisansPage() {
	const { artisans, isLoading, isError } = ArtisanService.fetchArtisans();

	const pageInfo = {
		title: "Artisans",
		subtitle: "Browse our featured artisans and discover their online stores, profiles, and more",
	};
	return (
		<PageContainer {...pageInfo}>
			{/* <ArtisanListings artisans={artisans} /> */}
			<LoadContainer isLoading={isLoading} isError={false}>
				{(isError || (!isLoading && artisans?.length === 0)) && (
					<p className="mt-10 font-normal">
						There seems to be an issue fetching the artisans. Please try refreshing the page, or try again later.
					</p>
				)}

				{artisans?.length > 0 && (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{artisans.map((store, index: number) => (
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
}
