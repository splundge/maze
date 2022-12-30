import { mazeTileTypes } from '../MazeTile/MazeTileConstants';

const isCoordinates = (a, b) => a[0] === b[0] && a[1] === b[1];

const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

const getRandomTile = () => {
	return Math.floor(Math.random() * 2);
};

const getRandomCoordinates = (minCoordinates, maxCoordinates) => [
	getRandomNumber(minCoordinates[0], maxCoordinates[0]),
	getRandomNumber(minCoordinates[1], maxCoordinates[1]),
];

const createEmptyMatrix = (width, height) => {
	const matrix = [];
	for (let y = 0; y < height; y++) {
		const row = [];
		for (let x = 0; x < width; x++) {
			row.push(0);
		}
		matrix.push(row);
	}
	return matrix;
};

export const createMazeMatrix = (width, height) => {
	//populate
	const matrix = createEmptyMatrix(width, height);

	const startCoordinate = getRandomCoordinates([0, 0], [width - 1, 0]);

	const endCoordinate = getRandomCoordinates(
		[0, height - 1],
		[width - 1, height - 1]
	);

	//set the start/end coordinates
	matrix[startCoordinate[0]][startCoordinate[1]] = mazeTileTypes.start;
	matrix[endCoordinate[0]][endCoordinate[1]] = mazeTileTypes.end;

	//todo: create paths in the maze

	return matrix;
};
