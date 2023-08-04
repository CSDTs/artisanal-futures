import { BusinessData } from "@/types";
import { FC } from "react";

interface IProps {
	data: BusinessData;
}

const BusinessCard: FC<IProps> = ({ data }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<div className="flex items-center mb-4">
				<img src={data.listing_image_url} alt="Business Logo" className="w-12 h-12 mr-4" />
				<h2 className="text-xl font-semibold">{data.biz_name}</h2>
			</div>
			<div className="mb-2">
				<p className="text-gray-600 mb-1">{data.location}</p>
				<p className="text-gray-600">{data.phone}</p>
				<p className="text-gray-600">{data.biz_email}</p>
			</div>
		</div>
	);
};
export default BusinessCard;
