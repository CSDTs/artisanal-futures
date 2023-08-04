import { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AccountData, BusinessData } from "@/types";

import ConfirmAccountModal from "./ConfirmAccountModal";

interface IProps {
	prevAction: () => void;
	nextAction: () => void;
	current: number;
	accountData: AccountData;
	businessData: BusinessData;
}

const OnboardingNavigation: FC<IProps> = ({ prevAction, nextAction, current, accountData, businessData }) => {
	const navigate = useNavigate();

	const backToHomepage = () => navigate("/");
	return (
		<div className="flex flex-row justify-between p-4">
			<button
				className="items-center flex  px-4 py-2 font-semibold text-sm bg-white text-slate-600  rounded-md  shadow-sm hover:bg-opacity-75"
				onClick={backToHomepage}>
				Skip, I'll do this later
			</button>
			<div className="flex gap-10">
				<button
					className=" items-center flex px-4 py-2 font-semibold text-sm  text-indigo-600  rounded-md  shadow-sm border border-indigo-600 hover:bg-white hover:bg-opacity-75 "
					onClick={prevAction}>
					<FaArrowLeft className="inline-block mr-2" />
					Previous
				</button>
				{current < 3 && (
					<button
						className="items-center flex disabled:bg-indigo-300 disabled:cursor-not-allowed px-4 py-2 font-semibold text-sm bg-indigo-600 text-white border border-slate-200 rounded-md  shadow-sm hover:bg-opacity-75"
						onClick={nextAction}
						disabled={accountData.profile_image_file && !accountData.profile_image_url}>
						Next <FaArrowRight className="inline-block ml-2" />
					</button>
				)}

				{current === 3 && <ConfirmAccountModal account={accountData} business={businessData} />}
			</div>
		</div>
	);
};

export default OnboardingNavigation;
