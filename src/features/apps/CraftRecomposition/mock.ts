import { sha256 } from "crypto-hash";

const processImage = async (image: string) => {
	// Convert the image to a unique identifier (mocking the image processing)
	const seed = await generateUniqueIdentifier(image);

	// Generate a list of unique materials and processes (mocking the response)
	const materials = generateUniqueMaterials(seed);
	const processes = generateUniqueProcesses(seed);

	return {
		materials,
		processes,
	};
};

//Create a seed from the image data
const generateUniqueIdentifier = async (imageData: string): Promise<string> => {
	const hash = sha256(imageData);
	return hash;
};

// Helper function to generate a random list of unique materials given a seed
const generateUniqueMaterials = (seed: string): string[] => {
	const materialsMapping = {
		Wood: ["Cutting", "Sanding"],
		Metal: ["Welding", "Polishing"],
		Glass: ["Cutting", "Etching"],
		Plastic: ["Molding", "Painting"],
		Fabric: ["Sewing", "Embroidery"],
	};

	// Use the hash to retrieve materials from the mapping
	const materialKeys = Object.keys(materialsMapping);
	const materialIndex = parseInt(seed, 16) % materialKeys.length;
	const materialKey = materialKeys[materialIndex];
	const materials = materialsMapping[materialKey as keyof typeof materialsMapping] || [];

	// Return the list of unique materials
	return materials;
};

// Helper function to generate a random list of unique processes given a seed
const generateUniqueProcesses = (seed: string): string[] => {
	const processesMapping = {
		Cutting: ["Sawing", "Laser Cutting"],
		Sanding: ["Sanding Paper", "Power Sander"],
		Welding: ["MIG Welding", "TIG Welding"],
		Polishing: ["Buffing", "Sanding"],
		Etching: ["Acid Etching", "Laser Etching"],
		Molding: ["Injection Molding", "Blow Molding"],
		Painting: ["Spray Painting", "Brush Painting"],
		Sewing: ["Machine Sewing", "Hand Stitching"],
		Embroidery: ["Free-motion Embroidery", "Cross-stitch"],
	};

	// Use the hash to retrieve processes from the mapping
	const processKeys = Object.keys(processesMapping);
	const processIndex = parseInt(seed, 16) % processKeys.length;
	const processKey = processKeys[processIndex];
	const processes = processesMapping[processKey as keyof typeof processesMapping] || [];

	// Return the list of unique processes
	return processes;
};

export default processImage;
