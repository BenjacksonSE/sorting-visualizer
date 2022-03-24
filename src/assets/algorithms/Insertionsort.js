export const insertionSort = async(array, length) => {
    let moves = [];

    const swapElems = async (array, index1, index2) => {
      let temp = array[index1];
      array[index1] = array[index2];
      array[index2] = temp;
    };

    for(let i = 0 ; i < length-1 ; ++i) {
        let j = i;
        while(j >= 0 && array[j] > array[j+1]) {
            await swapElems(array, j, j+1);
            moves.push([j, j+1, 1]);
            --j;
        }
    }
    return moves;
};