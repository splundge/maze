import cloneDeep from 'lodash.clonedeep';

export const solveMazeMatrix = (mazeMatrix) => {
	//we take a copy of the maze, so that we don't mutate the original data structure
	const clonedMaze = cloneDeep(mazeMatrix);

	//todo: find a path some how?
	//hint: takes a look at sampleMazes.js to examine the data structure
	//hint: if you were physically in the maze (in first person), you would only see the surrounding 8 blocks. it doesn't matter how long it takes to solve the maze
	return clonedMaze;
};
