/*

start: at coordinate === mazeTileType.start
end: at coordinate === mazeTileType.end

global variable position = start; [0,0] for example
global variable moveHistory = [];
global variable isSolvingMaze = true;


//checks if the coordinates have been explored before
function hasBeenExplored(coordinates)
	return moveHistory.contains(coordinates);


//checks if the block in the given direction is a viable path
function canMove(direction)
	if direction is left
		return true if position + [0, -1] is a mazeTileType.path block AND !hasBeenExplored(position + [0, -1])
	if direction is down
		return true if position + [1, 0] is a mazeTileType.path block AND !hasBeenExplored(position + [0, -1])
	if direction is right
		return true if position + [0, 1] is a mazeTileType.path block AND !hasBeenExplored(position + [0, -1])
	if direction is top
		return true if position + [1, 0] is a mazeTileType.path block AND !hasBeenExplored(position + [0, -1])

        
//moves your position in one direction
function step(direction)
	if direction is left
		position += [0, -1]
	if direction is down
		position += [1, 0]
	if direction is right
		position += [0, 1]
	if direction is top
		position += [1, 0]
    moveHistory.push(position);


//checks if there are branching, unexplored paths
function hasBranchingPath(coordinates)
	if (canMove(right)) 
	OR (canMove(down)) 
	OR (canMove(left)) 
	OR (canMove(up)) 
		return true
	else
		return false

//moves back one position
function goBack()
	for x = moveHistory.length; x > 0; x--;
		var previousPosition = moveHistory[x];
		if hasBranchingPath(previousPosition)
			position = previousPosition
			break;


//main loop
let maxAttempts = 10000;
for(let currentAttempt = 0; x < maxAttempts && position !== mazeTileType.end;x++){
    
	if canMove(right)
		step(right)
	else if canMove(down)
		step(down)
	else if canMove(left)
		step(left)
	else if canMove(up)
		move(up) 
	else
		goBack();

}
*/