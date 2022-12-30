import WallJpg from '../../Images/wall.jpg';
import PathJpg from '../../Images/path.jpg';
import StartJpg from '../../Images/start.jpg';
import EndJpg from '../../Images/end.jpg';
import AttemptJpg from '../../Images/attempt.jpg';

/**
 * type of maze tile
 */
export const mazeTileTypes = {
	path: 0,
	wall: 1,
	start: 2,
	end: 3,
	attempt: 4,
};

/**
 * given a maze tile type, this returns the appropriate image to show the tile
 * @param {*} tileType
 * @returns
 */
export const getMazeTileImage = (mazeTileType) => {
	switch (mazeTileType) {
		case mazeTileTypes.wall:
			return WallJpg;
		case mazeTileTypes.path:
			return PathJpg;
		case mazeTileTypes.start:
			return StartJpg;
		case mazeTileTypes.end:
			return EndJpg;
		case mazeTileTypes.attempt:
			return AttemptJpg;
		default:
			throw new Error(
				`unknown maze tile type '${mazeTileType}' ${typeof mazeTileType}`
			);
	}
};
