import { FC } from "react";
import { FaStoreAlt, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Business = {
	name: string;
	website: string;
	thumbnail_image: string;
};

type Profile = {
	name: string;
};
interface ICardProps {
	business: Business;
	profile: Profile;
	slug: string;
}

const ArtisanCard: FC<ICardProps> = ({ business, profile, slug }) => {
	const navigate = useNavigate();

	const handleProfileClick = () => (window.location.href = `/artisans/${slug}`);
	const handleStoreClick = () => window.open(business.website, "_blank").focus();

	return (
		<div className="cursor-pointer ">
			<div className="flex flex-col items-center w-10/12 mx-auto my-3 overflow-hidden transition-all duration-200 rounded-lg shadow-lg md:max-w-s lg:max-w-xs group-hover:bg-slate-500 group-active:shadow-lg group-active:shadow-blue-200">
				<img
					className="object-cover w-full h-64 transition-all duration-200 group-hover:contrast-75"
					src={business.thumbnail_image}
					alt={`Cover for ${business.name}`}
					onError={({ currentTarget }) => {
						currentTarget.src = "https://via.placeholder.com/300x200.png?text=No+Image+Found";
					}}
				/>
				<div className="w-full px-4 py-2 ">
					<h1 className="text-xl font-semibold text-gray-700 transition-all duration-200 group-hover:text-white">
						{business.name}
					</h1>
					<div className="flex w-full gap-5 py-2">
						{profile && (
							<button className="bg-[#004d50] text-white p-2 rounded" onClick={handleProfileClick}>
								<FaUserAlt />
							</button>
						)}
						{business.website && (
							<button className="bg-[#DAA520] text-white p-2 rounded" onClick={handleStoreClick}>
								<FaStoreAlt />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArtisanCard;
