import fs from "freesewing";
const Path = fs.Path;
const Curve = fs.Curve;
const Point = fs.Point;

// Converts absolute path to freesewing Path
export function svgStringToPath(svgString: string): typeof Path {
	const path = new Path();
	let currentPoint: typeof Point | null = null;
	let lastControlPoint: typeof Point | null = null;
	let command = "";
	let args: number[] = [];

	const parseCommand = () => {
		switch (command) {
			case "M":
				currentPoint = new Point(args[0], args[1]);
				path.move(currentPoint);
				break;
			case "L":
				const linePoint = new Point(args[0], args[1]);
				path.line(linePoint);
				currentPoint = linePoint;
				break;
			case "C":
				const controlPoint1 = new Point(args[0], args[1]);
				const controlPoint2 = new Point(args[2], args[3]);
				const endPoint = new Point(args[4], args[5]);
				path.curve(controlPoint1, controlPoint2, endPoint);
				currentPoint = endPoint;
				lastControlPoint = controlPoint2;
				break;
			case "S":
				console.log("what the heck is S?");
			// Handle other SVG commands as needed
			// ...
			default:
				break;
		}
	};

	const parseArguments = (argString: string): number[] => {
		return argString
			.trim()
			.split(/\s*,\s*|\s+/)
			.map(parseFloat);
	};

	const tokens = svgString.split(/(?=[A-Za-z])/);

	tokens.forEach((token) => {
		const commandMatch = token.match(/[A-Za-z]/);
		if (commandMatch) {
			command = commandMatch[0];
		}
		const argString = token.substring(command.length);
		args = parseArguments(argString);
		parseCommand();
	});

	return path;
}

// Absolutes relative SVG paths
// Should replace with the better working
//    https://codepen.io/leaverou/full/RmwzKv, use snap.svg
export function convertRelativePathToAbsolute(svgPath: string): string {
	let x = 0;
	let y = 0;
	let absolutePath = "";

	const commands = svgPath.match(/[A-Za-z][^A-Za-z]*/g);
	if (!commands) return svgPath;

	commands.forEach((command) => {
		const type = command[0];
		const args = command
			.substring(1)
			.trim()
			.split(/[,\s]+/)
			.map(parseFloat);

		switch (type) {
			case "M":
				x = args[0];
				y = args[1];
				absolutePath += `M${x},${y} `;
				break;
			case "m":
				x += args[0];
				y += args[1];
				absolutePath += `M${x},${y} `;
				break;
			case "L":
				x = args[0];
				y = args[1];
				absolutePath += `L${x},${y} `;
				break;
			case "l":
				x += args[0];
				y += args[1];
				absolutePath += `L${x},${y} `;
				break;
			case "H":
				x = args[0];
				absolutePath += `H${x} `;
				break;
			case "h":
				x += args[0];
				absolutePath += `H${x} `;
				break;
			case "V":
				y = args[0];
				absolutePath += `V${y} `;
				break;
			case "v":
				y += args[0];
				absolutePath += `V${y} `;
				break;
			case "C":
				const c1x = args[0];
				const c1y = args[1];
				const c2x = args[2];
				const c2y = args[3];
				x = args[4];
				y = args[5];
				absolutePath += `C${c1x},${c1y},${c2x},${c2y},${x},${y} `;
				break;
			case "c":
				const relC1x = args[0];
				const relC1y = args[1];
				const relC2x = args[2];
				const relC2y = args[3];
				const relX = args[4];
				const relY = args[5];
				const absC1x = x + relC1x;
				const absC1y = y + relC1y;
				const absC2x = x + relC2x;
				const absC2y = y + relC2y;
				x += relX;
				y += relY;
				absolutePath += `C${absC1x},${absC1y},${absC2x},${absC2y},${x},${y} `;
				break;
			case "S":
				const SprevCommand = absolutePath[absolutePath.length - 2];
				const SprevX =
					SprevCommand === "C" || SprevCommand === "S" ? parseFloat(absolutePath[absolutePath.length - 4]) : x;
				const SprevY =
					SprevCommand === "C" || SprevCommand === "S" ? parseFloat(absolutePath[absolutePath.length - 3]) : y;
				const Ssc1x = 2 * x - SprevX; // Calculate the reflection control point
				const Ssc1y = 2 * y - SprevY;
				const Ssc2x = args[0];
				const Ssc2y = args[1];
				x = args[2];
				y = args[3];
				absolutePath += `C${Ssc1x},${Ssc1y},${Ssc2x},${Ssc2y},${x},${y} `;
				break;

			case "s":
				const sprevCommand = absolutePath[absolutePath.length - 2];
				const sprevX =
					sprevCommand === "C" || sprevCommand === "S" ? parseFloat(absolutePath[absolutePath.length - 4]) : x;
				const sprevY =
					sprevCommand === "C" || sprevCommand === "S" ? parseFloat(absolutePath[absolutePath.length - 3]) : y;
				const srelC1x = args[0];
				const srelC1y = args[1];
				const ssc1x = 2 * x - sprevX + srelC1x; // Calculate the reflection control point
				const ssc1y = 2 * y - sprevY + srelC1y;
				const srelC2x = args[2];
				const srelC2y = args[3];
				const ssc2x = x + srelC2x;
				const ssc2y = y + srelC2y;
				x += args[4];
				y += args[5];
				absolutePath += `C${ssc1x},${ssc1y},${ssc2x},${ssc2y},${x},${y} `;
				break;

			default:
				absolutePath += command + " ";
				break;
		}
	});

	return absolutePath.trim();
}
