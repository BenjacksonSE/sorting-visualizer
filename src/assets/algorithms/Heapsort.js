
export const Heapsort = async(array, length) => {
    let moves = [];

    for(let index = Math.ceil(length/2)-1 ; index >= 0 ; --index) {
        await heapify(moves, array, length, index);
    }
    for(let index = length-1 ; index >= 0 ; --index) {
        moves.push([index, 0, 1]);
        await swapElems(array, index, 0);
        await heapify(moves, array, index, 0);
    }
    return moves;
};

const swapElems = async (array, index1, index2) => {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};



const heapify = async(moves, array, length, index) => {
    let largest = index;
    let left = 2*index + 1, right = 2*index + 2;
    
    if(left < length && array[left] > array[largest]) {
        largest = left;
    }
    if(right < length && array[right] > array[largest]) {
        largest = right;
    }

    if(largest !== index) {
        moves.push([index, largest, 1]);
        await swapElems(array, index, largest);
        await heapify(moves, array, length, largest);
    }
};