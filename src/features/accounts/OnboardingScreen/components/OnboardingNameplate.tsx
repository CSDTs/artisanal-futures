import { FC } from "react";

interface IProps {
	title: string;
	description: string;
}

const OnboardingNameplate: FC<IProps> = ({ title, description }) => {
	return (
		<div className="pt-10 ">
			<h1 className="mb-3 text-3xl font-bold leading-3 text-slate-900 ">{title}</h1>

			<p className="mb-5 text-slate-500 text-lg">{description}</p>
		</div>
	);
};

export default OnboardingNameplate;
