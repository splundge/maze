import React from 'react';
import { getMazeTileImage } from './MazeTileConstants';
import './MazeTile.scss';

const MazeTile = ({ mazeTileType }) => {
	return (
		<div className="maze-tile">
			<img src={getMazeTileImage(mazeTileType)} alt="maze tile" />
		</div>
	);
};

export default MazeTile;
