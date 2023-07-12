import ArtisanCard from "@/components/Cards/ArtisanCard";
import PageContainer from "@/components/UI/PageContainer";
import useFetchArtisans from "@/hooks/useFetchArtisans";

import { LoadContainer } from "@/layout";

import { FormattedData } from "@/types";
import { Fragment } from "react";

const ArtisansPage = () => {
	const { isLoading, isError, data: artisans } = useFetchArtisans();

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

				{artisans && artisans.length > 0 && (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{artisans.map((artisan: FormattedData, index: number) => (
							<Fragment key={index}>{<ArtisanCard data={artisan} slug={artisan.slug} />}</Fragment>
						))}
					</div>
				)}
			</LoadContainer>
		</PageContainer>
	);
};
export default ArtisansPage;
