import { useParams } from "react-router-dom";

import PageContainer from "@/components/UI/PageContainer";
import axios from "axios";

import { useQuery } from "react-query";

import ProfileCard from "@/components/Cards/ProfileCard";
import { LoadContainer } from "../layout";

const getMemberInformationBySlug = (slug: string) => {
	const address = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_ARTISAN_ENDPOINT}`;

	const fetcher = async () => {
		const response = await axios.get(address, { params: { slug: slug } });
		return response.data[0].acf;
	};

	const { data, error, isLoading, isError } = useQuery(["member", slug], fetcher, {
		refetchOnWindowFocus: true, // auto refetch when the window is focused
	});

	return {
		data,

		isLoading,
		isError,
	};
};

const PublicProfilePage = () => {
	const { name } = useParams();

	const { data, isLoading, isError } = getMemberInformationBySlug(name as string);
	console.log(data);
	return (
		<PageContainer>
			<LoadContainer isLoading={isLoading} isError={isError}>
				<div className="flex h-full w-full items-center justify-center aspect-[1.618]">
					<ProfileCard data={data} />
				</div>
			</LoadContainer>
		</PageContainer>
	);
};

export default PublicProfilePage;
