import React from 'react';
import Maze from '../../Components/Maze/Maze';
import { sampleMazes } from '../../Components/Maze/sampleMazes';
import './Landing.scss';

const Landing = () => {
	return (
		<div className="landing">
			<Maze matrix={sampleMazes.maze1} solve />
			{/*
				part 1: explore each maze. write an algorithm that solves the maze, using the 'mazeTileTypes.attempt' tile to represent your path
				note, use the 'solve' truthy attribute to determine whether the maze should be solved or unsolved

				<Maze matrix={sampleMazes.maze1} />
				<Maze matrix={sampleMazes.maze1} solve />

				<Maze matrix={sampleMazes.maze2} />
				<Maze matrix={sampleMazes.maze2} solve />

				<Maze matrix={sampleMazes.maze3} />
				<Maze matrix={sampleMazes.maze3} solve />
			*/}
			{/*
				part 2: write an algorithm that generates a maze of custom height/width, and then uses the previous logic to solve it

				<RandomMaze height={8} width={8} />
				<RandomMaze height={12} width={12} />
				<RandomMaze height={32} width={32} />
			*/}
		</div>
	);
};

export default Landing;
