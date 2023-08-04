import { FC } from "react";

interface IProps {
	name: string;
	title: string;
}

const Label: FC<IProps> = ({ name, title }) => {
	return (
		<label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
			{title}
		</label>
	);
};

export default Label;
