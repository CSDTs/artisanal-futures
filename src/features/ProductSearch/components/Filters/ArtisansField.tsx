import { FC } from "react";

interface IProps {
	artisans: Array<string>;
	filteredTags: Array<string>;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ArtisanField: FC<IProps> = ({ artisans, filteredTags, handleChange }) => {
	return (
		<fieldset>
			<legend className="text-sm font-semibold leading-6 text-gray-900">Shop By Artisan</legend>
			<div className="mt-6 space-y-3">
				{artisans &&
					artisans.length > 0 &&
					artisans.map((artisan) => (
						<div className="relative flex gap-x-3">
							<div className="flex h-6 items-center">
								<input
									id={`${artisan}-opt`}
									name={`${artisan}-opt`}
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									onChange={handleChange}
									value={artisan}
									checked={filteredTags.includes(artisan)}
								/>
							</div>
							<div className="text-sm leading-6">
								<label htmlFor={`${artisan}-opt`} className="font-medium text-gray-900">
									{artisan}
								</label>
							</div>
						</div>
					))}
			</div>
		</fieldset>
	);
};

export default ArtisanField;
