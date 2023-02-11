import cloneDeep from 'lodash.clonedeep';
import { mazeTileTypes } from '../MazeTile/MazeTileConstants';

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

const canMove = (direction, currentCoordinates, maze, history) => {
	const newCoordinates = moveCoordinates(direction, currentCoordinates);
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

/**
 * moves you to a new position
 */
const move = (direction, history) => {
	let currentCoordinates = getCurrentCoordinates(history);
	let newCoordinates = moveCoordinates(direction, currentCoordinates);
	history.push(newCoordinates);
}

/**
 * try to go back to the last intersection 
 */
const goBack = (maze, history) => {
	for (let x = history.length - 1; x >= 0; x--) {
		const oldCoordinates = history[x];
		if(canMove(directions.right, oldCoordinates, maze, history)
		|| canMove(directions.down, oldCoordinates, maze, history)
		|| canMove(directions.left, oldCoordinates, maze, history)
		|| canMove(directions.up, oldCoordinates, maze, history)){
			history.push(oldCoordinates);
			return;
		}
	}
}

export const solveMazeMatrix = (mazeMatrix) => {

	const clonedMaze = cloneDeep(mazeMatrix);

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

	const maxAttempts = 1000;

	for(let currentAttempt = 0; currentAttempt < maxAttempts && getMazeTile(clonedMaze, getCurrentCoordinates(stepHistory)) !== mazeTileTypes.end; currentAttempt++){
		const currentCoordinates = getCurrentCoordinates(stepHistory);
		if(canMove(directions.left, currentCoordinates, clonedMaze, stepHistory)){
			console.log('you can move left!');
			move(directions.left, stepHistory);
		} else if(canMove(directions.down, currentCoordinates, clonedMaze, stepHistory)){
			console.log('you can move down!');
			move(directions.down, stepHistory);
		} else if(canMove(directions.right, currentCoordinates, clonedMaze, stepHistory)){
			console.log('you can move right!');
			move(directions.right, stepHistory);
		} else if(canMove(directions.up, currentCoordinates, clonedMaze, stepHistory)){
			console.log('you can move up!');
			move(directions.up, stepHistory);
		} else {
			goBack(clonedMaze, stepHistory);
		}
	}
	
	//now mark each position we visited
	for (let x = 0; x < stepHistory.length; x++) {
		const coordinates = stepHistory[x];
		clonedMaze[coordinates[0]][coordinates[1]] = mazeTileTypes.attempt;
	}

	//I have a starting position but cannot figure out the value of the next position in the array.
	return clonedMaze;
};