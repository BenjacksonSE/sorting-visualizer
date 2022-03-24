export const selectionSort = async(array, length) => {
    let moves = [];
    const swapElems = async (array, index1, index2) => {
      let temp = array[index1];
      array[index1] = array[index2];
      array[index2] = temp;
    };

    for(let i = 0 ; i < length-1 ; ++i) {
        let minIndex = i;
        for(let j = i+1 ; j < length ; ++j) {
            if(array[j] < array[minIndex]) {
                minIndex = j;
            }
            moves.push([j, minIndex, !1]);
        }
        await swapElems(array, i, minIndex);
        moves.push([i, minIndex, 1]);
    }
    return moves;
};