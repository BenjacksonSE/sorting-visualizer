export const quickSort = async(array, length) => {
    let moves = [];
    await divider(moves, array, 0, length-1);
    return moves;
};

const swapElems = async (array, index1, index2) => {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
};

const divider = async(moves, array, start, end) => {
    if(start < end) {
        let pivot = await partition(moves, array, start, end);
        await divider(moves, array, start, pivot-1);
        await divider(moves, array, pivot+1, end);
    }
};

const partition = async(moves, array, start, end) => {
    let prevIndex = start - 1;
    for(let index = start ; index < end ; ++index) {
        if(index !== end) {
            moves.push([index, end, !1]);
        }
        if(array[index] < array[end]) {
            ++prevIndex;
            await swapElems(array, index, prevIndex);
            moves.push([index, prevIndex, 1]);
        }
    }
    await swapElems(array, prevIndex+1, end);
    moves.push([end, prevIndex+1, 1]);
    return prevIndex+1;
};