import React from 'react';
import MazeTile from '../MazeTile/MazeTile';
import './Maze.scss';
import { solveMazeMatrix } from './solveMazeMatrix';

const Maze = ({ matrix, solve }) => {
	const solvedMatrix = solve ? solveMazeMatrix(matrix) : matrix;
	return (
		<div className="maze">
			{solvedMatrix.map((matrixRow) => (
				<div className="maze__row">
					{matrixRow.map((mazeTileType) => (
						<MazeTile mazeTileType={mazeTileType} />
					))}
				</div>
			))}
		</div>
	);
};

export default Maze;
