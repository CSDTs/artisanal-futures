import PageContainer from "@/components/UI/PageContainer";
import { ArmLengthManipulator, MeasurementBox } from "@/features/apps/PatternGenerator";
import combineTailwindClasses from "@/utils/combineTailwindClasses";
import { Tab } from "@headlessui/react";
const PatternGenerator = () => {
	const pageInfo = {
		title: "Pattern Generator",
		subtitle: "Generate a clothing pattern for your next project",
	};
	return (
		<PageContainer {...pageInfo}>
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
					<Tab
						className={({ selected }) =>
							combineTailwindClasses(
								"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
								selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
							)
						}>
						Measurement Box
					</Tab>{" "}
					<Tab
						className={({ selected }) =>
							combineTailwindClasses(
								"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
								selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
							)
						}>
						Arm Length Manipulator
					</Tab>
				</Tab.List>
				<Tab.Panels className="mt-2">
					<Tab.Panel
						className={combineTailwindClasses(
							"rounded-xl bg-white p-3",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
						)}>
						<MeasurementBox />
					</Tab.Panel>
					<Tab.Panel
						className={combineTailwindClasses(
							"rounded-xl bg-white p-3",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
						)}>
						<ArmLengthManipulator />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</PageContainer>
	);
};

export default PatternGenerator;
