import { FC } from "react";

interface IProps {
	attributes: Array<string>;
	filteredTags: Array<string>;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const AttributeField: FC<IProps> = ({ attributes, filteredTags, handleChange }) => {
	return (
		<fieldset>
			<legend className="text-sm font-semibold leading-6 text-gray-900">Shop By Store Attributes</legend>
			<div className="mt-6 space-y-3">
				{attributes &&
					attributes.length > 0 &&
					attributes.map((principle) => (
						<div className="relative flex gap-x-3">
							<div className="flex h-6 items-center">
								<input
									id={`${principle}-opt`}
									name={`${principle}-opt`}
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									onChange={handleChange}
									value={principle}
									checked={filteredTags.includes(principle)}
								/>
							</div>
							<div className="text-sm leading-6">
								<label htmlFor={`${principle}-opt`} className="font-medium text-gray-900 capitalize">
									{principle}
								</label>
							</div>
						</div>
					))}
			</div>
		</fieldset>
	);
};

export default AttributeField;
