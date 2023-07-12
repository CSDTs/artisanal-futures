import fs from "freesewing";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { convertRelativePathToAbsolute, svgStringToPath } from "../utils/converter";

const ArmLengthManipulator: React.FC = () => {
	const [pathLength, setPathLength] = useState<number>(0);
	const [originalPathLength, setOriginalPathLength] = useState<number>(0);
	const [fsPath, setFsPath] = useState<any>(null); // replace 'any' with the type of fsPath if available
	const pathElement = useRef<SVGPathElement>(null);

	useEffect(() => {
		let theFsPath = makeNewFsPath();
		setFsPath(theFsPath);
		updateSvgWith(theFsPath);
		setOriginalPathLength(theFsPath.length());
	}, []);

	const makeNewFsPath = () => {
		const path = svgStringToPath(
			convertRelativePathToAbsolute("M0,0C36.23,27.27,90.23,129.67,60.29,208.18C60.29,208.18,24.74,304.84,24.74,304.84")
		).translate(100, 0);
		return path;
	};

	const updateSvgWith = (thePath: any) => {
		// replace 'any' with the type of thePath if available
		if (pathElement.current) {
			pathElement.current.setAttribute("d", makeAttr(thePath));
			pathElement.current.style.strokeWidth = "6";
		}
		setPathLength(thePath.length());
	};

	const makeAttr = (thePath: any): string => {
		// replace 'any' with the type of thePath if available
		return thePath.asPathstring();
	};

	const extend = (by: number): void => {
		let theFsPath = makeNewFsPath();
		if (by === 1) {
			updateSvgWith(theFsPath);
			console.log("(1) NORMAL LENGTH OF ARM SLEEVE");
		} else if (by < 1) {
			let theTrimPoint = theFsPath.shiftFractionAlong(by);
			let headTailPaths = theFsPath.split(theTrimPoint);
			updateSvgWith(headTailPaths[0]);
			console.log("(2) ARM SLEEVE TRIMMED BY 30%");
		} else if (by > 1) {
			let angle = tangentAtEnd(theFsPath);
			let [end] = theFsPath.ops.slice(-1);
			theFsPath.line(end.to.shift(angle, originalPathLength * 0.1));
			console.log("(3) ARM SLEEVE EXTENDED 10%");
			updateSvgWith(theFsPath);
		}
		setFsPath(theFsPath);
	};

	const tangentAtEnd = (path: any): number => {
		// replace 'any' with the type of path if available
		let [end, secondToEnd] = path.ops.slice(-2).reverse();
		let angle = secondToEnd.to.angle(end.to);
		return angle;
	};

	return (
		<section className="flex w-full flex-col">
			<div className="flex gap-3">
				<button
					className="px-4 py-2 font-medium text-base rounded bg-indigo-500 hover:bg-indigo-400 transition-all text-white"
					onClick={() => extend(1)}>
					Original Arm length
				</button>
				<button
					className="px-4 py-2 font-medium text-base rounded bg-indigo-500 hover:bg-indigo-400 transition-all text-white"
					onClick={() => extend(1.1)}>
					Arm length extends 10%
				</button>
				<button
					className="px-4 py-2 font-medium text-base rounded bg-indigo-500 hover:bg-indigo-400 transition-all text-white"
					onClick={() => extend(0.7)}>
					Arm length shrinks 30%
				</button>
			</div>
			<br />
			<p className="text-lg font-medium text-slate-500">Arm Length {pathLength} cm</p>

			<br />
			<div className=" w-96 border border-slate-400 p-4">
				<svg width="300" height="500">
					<rect width="100%" height="100%" fill="white" />
					<path ref={pathElement} d="" fill="none" stroke="black" />
				</svg>
			</div>
		</section>
	);
};

export default ArmLengthManipulator;
