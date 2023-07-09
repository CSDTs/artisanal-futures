import { Dispatch, FC, SetStateAction, useEffect, useId, useRef, useState } from "react";

import { FaHammer, FaTshirt, FaUserAlt } from "react-icons/fa";
import { MdLocalGasStation, MdNewReleases, MdOutlineElectricalServices, MdOutlineHomeWork } from "react-icons/md";
import { Ri24HoursFill } from "react-icons/ri";
import FormInput from "../Form/FormInput";

type Field = {
	icon: string;
	name: string;
};
interface IProps {
	title?: string;
	text?: string;
	hint?: string;
	fields?: Array<Field>;
	additional?: boolean;
	handleCost: any;
	includesHours: Dispatch<SetStateAction<number>> | null;
}

const iconList = {
	MdOutlineHomeWork,
	MdLocalGasStation,
	MdOutlineElectricalServices,
	FaHammer,
	FaTshirt,
	FaUserAlt,
	MdNewReleases,
};

const handleFieldIcon = (data: keyof typeof iconList) => {
	return iconList[data] || MdNewReleases;
};

const CostPanel: FC<IProps> = ({ title, text, fields, handleCost, includesHours }) => {
	const [total, setTotal] = useState(0);
	const refForm = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (handleCost) handleCost(total);
	}, [total]);

	const recalculateTotal = () => {
		let total = 0;
		let product = 1;

		if (!refForm.current) return;

		for (let elem of refForm.current.elements) {
			if (elem instanceof HTMLInputElement) {
				if (title === "Labor Costs") product = product * parseFloat(elem.value);
				else total = total + parseFloat(elem.value || "0");
			}
		}
		if (title === "Labor Costs") total = product || 0;

		setTotal(total);
	};

	return (
		<>
			<div className="flex flex-col gap-4 mt-4">
				<h2 className="text-2xl font-semibold leading-5 text-slate-800 sm:text-3xl md:text-4xl">{title}</h2>
				<p className="text-base text-slate-500">{text}</p>
			</div>

			<form className="mt-10" ref={refForm} onChange={recalculateTotal}>
				<div className="flex flex-col gap-4">
					{fields &&
						fields.map((field) => (
							<FormInput Icon={handleFieldIcon(field.icon as keyof typeof iconList)} title={field.name} key={useId()} />
						))}
					{includesHours && (
						<FormInput title="Number of hours (est.)" Icon={Ri24HoursFill} handleHours={includesHours} />
					)}
				</div>
			</form>
		</>
	);
};

export default CostPanel;
