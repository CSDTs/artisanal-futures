import combineTailwindClasses from "@/utils/combineTailwindClasses";
import { FC, forwardRef } from "react";

interface IProps {
	hasLabel: boolean;
	name: string;
	title: string;
	value: string;
	autoComplete?: string;
}
const TextInput = forwardRef<HTMLInputElement, IProps>(({ hasLabel, name, title, value }, ref) => {
	return (
		<>
			<label
				htmlFor={name}
				className={combineTailwindClasses(
					hasLabel ? "not-sr-only" : "sr-only",
					"block text-sm font-medium leading-6 text-gray-900"
				)}>
				{title}
			</label>

			<div className="mt-2">
				<input
					type="text"
					name={name}
					id={name}
					ref={ref}
					defaultValue={value}
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</>
	);
});
export default TextInput;
