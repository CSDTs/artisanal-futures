import LoadingIndicator from "@/components/UI/LoadingIndicator";
import { FC, ReactNode } from "react";

interface IProps {
	isLoading: boolean;
	isError: boolean;
	errorMsg?: string;
	children: ReactNode;
}
const LoadContainer: FC<IProps> = ({
	isLoading,
	children,
	isError,
	errorMsg = "There seems to be an issue connecting to the server. Please try again later.",
}) => {
	return (
		<>
			<LoadingIndicator isLoading={isLoading} />
			{!isLoading && <>{children}</>}
			{isError && <p>{errorMsg}</p>}
		</>
	);
};

export default LoadContainer;
