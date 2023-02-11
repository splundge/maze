const mazeTileTypes = {
	path: 0,
	wall: 1,
	start: 2,
	end: 3,
	attempt: 4,
};

const directions = {
	left: 0,
	down: 1,
	right: 2,
	up: 3,
};


const directionToString = direction => {
	switch (direction) {
		case directions.left:
			return 'left';
		case directions.down:
			return 'down';
		case directions.right:
			return 'right';
		case directions.up:
			return 'up';
		default:
			throw new Error(`unknown direction '${direction}'`);
	}
}

const originalMaze = [
	[0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
	[0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
	[1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
	[0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	[0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
	[0, 0, 2, 1, 1, 1, 0, 1, 0, 3]
];

console.log(originalMaze[9][9]);

/**
 * given coordinates A and coordinates B, this function checks to see if A and B are equal
 * @param {[number, number]} a
 * @param {[number, number]} b
 */
const coordinatesAreEqual = ([x1, y1], [x2, y2]) => {
	return x1 === x2 && y1 === y2;
}

//adds two matrices together
const addMatrix = (a, b) => [a[0] + b[0], a[1] + b[1]];

//given a direction, move the coordinates
const moveCoordinates = (direction, coordinates) => {
	if (coordinates?.length !== 2) {
		throw new Error(
			`position must have a length of 2, [y, x]. instead its ${coordinates}`
		);
	}
	switch (direction) {
		case directions.left:
			return addMatrix(coordinates, [0, -1]);
		case directions.down:
			return addMatrix(coordinates, [1, 0]);
		case directions.right:
			return addMatrix(coordinates, [0, 1]);
		case directions.up:
			return addMatrix(coordinates, [-1, 0]);
		default:
			throw new Error(`unknown direction '${direction}'`);
	}
};
// does not work. only lets the program run when there is not boundry near it. 
//checks to see if the given coordinates exist within a maze. we dont want the coordinates to be out of bounds, like  [-1,-1], or [11,11]
const isWithinBoundsOfMatrix = (maze, [coordinatesY, coordinatesX]) => {
	const mazeBoundaryY = maze.length;
	const mazeBoundaryX = maze[0].length;
	return coordinatesY >= 0 && coordinatesY < mazeBoundaryY
		&& coordinatesX >= 0 && coordinatesX < mazeBoundaryX
};

//checks to see if history contains your coordinates
const historyContains = (history, coordinates) => {
	for(let x = 0; x < history.length; x++){
		const pastCoordinates = history[x];
		if(coordinatesAreEqual(pastCoordinates, coordinates)){
			return true;
		}
	}
	return false;
}

const canMove = (direction, maze, history) => {
	const lastCoordinates = getCurrentCoordinates(history);
	const newCoordinates = moveCoordinates(direction, lastCoordinates);
    const mazeTile = getMazeTile(maze, newCoordinates);

    if(!isWithinBoundsOfMatrix(maze, newCoordinates)){
        console.log(`cant move ${directionToString(direction)} (`, newCoordinates, '), its out of bounds');
    } else if(historyContains(history, newCoordinates)){
        console.log(`cant move ${directionToString(direction)} (`, newCoordinates, '), it has already been visited');
    } else if(mazeTile !== mazeTileTypes.path && mazeTile !== mazeTileTypes.end){
        console.log(`cant move ${directionToString(direction)} (`, newCoordinates, '), is not a path! it might be a wall');
    }
	return (
		isWithinBoundsOfMatrix(maze, newCoordinates) &&
		!historyContains(history, newCoordinates) &&
		mazeTile === mazeTileTypes.path || mazeTile === mazeTileTypes.end
	);
};

//finds the block passed through and saves the value to an X & Y array
const getCoordinatesByTileType = (maze, tileType) =>{
    for(let y = 0; y < maze.length; y++){
        for(let x = 0; x < maze[y].length; x++){
            if (maze[y][x] === tileType) {
                return [y, x];
            };
        };
    };
    throw new Error(`couldnt find tile type '${tileType}'`);
};

const getCurrentCoordinates = (history) => {
    if(history.length === 0){
        throw new Error('no history');
    }
    return history[history.length - 1];
}

//finds the value of a position in the maze 
const getMazeTile = (maze, coordinates) => {
    const y = coordinates[0];
    const x = coordinates[1];
	if(!isWithinBoundsOfMatrix(maze, coordinates)){
		return null;
	}
    return maze[y][x];
};

const solveMazeMatrix = (mazeMatrix) => {
	const clonedMaze = [...mazeMatrix];

	//finds the start of the maze
	const startCoordinates = getCoordinatesByTileType(clonedMaze, mazeTileTypes.start);

	//finds the end of the maze
	const endCoordinates = getCoordinatesByTileType(clonedMaze, mazeTileTypes.end);

	const stepHistory = [];

	//put your starting position in the maze
	stepHistory.push(startCoordinates);

	//finds the currentlocation based on the final value of x & y array 
	const currentCoordinates = getCurrentCoordinates(stepHistory);
	console.log('your current position is ', currentCoordinates);
	console.log('your current maze tile is', getMazeTile(clonedMaze, currentCoordinates));

	if(canMove(directions.left, clonedMaze, stepHistory)){
		console.log('you can move left!');
	}
	if(canMove(directions.down, clonedMaze, stepHistory)){
		console.log('you can move down!');
	}
	if(canMove(directions.right, clonedMaze, stepHistory)){
		console.log('you can move right!');
	}
	if(canMove(directions.up, clonedMaze, stepHistory)){
		console.log('you can move up!');
	}

	//I have a starting position but cannot figure out the value of the next position in the array.
	return clonedMaze;
};

solveMazeMatrix(originalMaze);