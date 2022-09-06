import { PuffLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "0 auto",
};

export default function Loading({ isLoading }) {
	return <PuffLoader color={"#000000"} loading={isLoading} cssOverride={override} size={150} />;
}
