//a function for calculating the shortest distance it takes a knight to move from one square on a chess board to another

function knightMoves(start, end) {
    let currentNode = {
        position: start,
        parent: null,
    }
    let visitedNodes = []; 
    let queue = [currentNode];

    while(queue.length !== 0) {
        currentNode = queue.shift();
        visitedNodes.push(currentNode.position); 

        //get valid moves
        let moves = getValidKnightMoves(currentNode.position);

        //ignore visited nodes
        let possibleMoves = moves.filter(move => 
            !visitedNodes.some(node => JSON.stringify(move) === JSON.stringify(node))
        );

        if (JSON.stringify(currentNode.position) === JSON.stringify(end)) {
            let path = [currentNode.position];
            while (currentNode.parent !== null) {
                path.push(currentNode.parent.position);
                currentNode = currentNode.parent;
            }
            path = path.reverse();
            console.log(`You made it in ${path.length -1} moves! Here's your path:`);
            console.log(JSON.stringify(path));
            return;
        };

        possibleMoves.forEach(move => {
            queue.push({
                position: move,
                parent: currentNode,
            })
        });
    }
    return console.error("Invalid coordinates");
}


function getValidKnightMoves(start) {
    const moves = [
        [-1, -2], [-2, -1], [-2, 1], [1, -2], 
        [2, -1], [-1, 2], [1, 2], [2, 1]
    ];
    let validMoves = [];
    let tempMove = [];
    moves.forEach(move => {
        tempMove = [move[0] + start[0], move[1] + start[1]];

        if ((tempMove[0] <= 7 && tempMove[0] >= 0) && (tempMove[1] <= 7 && tempMove[1] >= 0)) {
            validMoves.push(tempMove);
        }
    });
    return validMoves;
}

knightMoves([0,0], [6,7])
knightMoves([0,0], [3,3])