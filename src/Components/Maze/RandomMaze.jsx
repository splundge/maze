import React from 'react';
import { createMazeMatrix } from './createMazeMatrix';
import Maze from './Maze';

const RandomMaze = ({ width, height }) => {
	return <Maze matrix={createMazeMatrix(width, height)} />;
};

export default RandomMaze;
