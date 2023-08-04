import { FormattedData } from "@/types";
import { FC } from "react";
import { FaStoreAlt, FaUserAlt } from "react-icons/fa";

interface ICardProps {
	data: FormattedData;
	slug: string;
}

const BusinessCard: FC<ICardProps> = ({ data, slug }) => {
	return (
		<div className="w-full p-4 bg-slate-50 shadow rounded">
			<img src={data?.listing_image_url} alt="" className="aspect-square object-cover" />

			<div className="flex w-full items-center justify-between">
				<div>
					<h3 className="font-semibold text-xl">{data?.biz_name}</h3>
					<p className="font-normal text-slate-500">{data?.biz_name}</p>
				</div>

				<div>
					{data?.about_me && (
						<a
							className="bg-slate-400 text-white p-2 rounded block"
							href={`/artisans/${slug}`}
							aria-label="Head to artisan profile">
							<FaUserAlt />
						</a>
					)}
					{data?.website && (
						<a
							className="bg-slate-500 text-white p-2 rounded block"
							href={data?.website}
							aria-label="Head to artisan profile">
							<FaStoreAlt />
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default BusinessCard;
