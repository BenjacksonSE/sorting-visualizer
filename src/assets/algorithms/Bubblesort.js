export const Bubblesort = async(array, length) => {
    const swapElems = async (array, index1, index2) => {
      let temp = array[index1];
      array[index1] = array[index2];
      array[index2] = temp;
    };

    let moves = [];
    for(let i = 0 ; i < length-1 ; ++i) {
        for(let j = 0 ; j < length-i-1 ; ++j) {
            if(array[j] > array[j+1]) {
                await swapElems(array, j, j+1);
                moves.push([j, j+1, 1]);
            }
            else {
                moves.push([j, j+1, !1]);
            }
        }
    }
    return moves;
};