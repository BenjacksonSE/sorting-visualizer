const newRandomArr = (length) => {
    let newArr = [];
    for (let i = 0; i < length ; i++) {
        let num = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        newArr.push({key: parseInt(num), classType: 0});
    }
    return newArr;
};


const arrOfKeys = async(arr, length) => {
  let newArr = [];
  for(let i = 0 ; i < length ; ++i) {
        newArr.push(Number(arr[i].key));
    }
    return newArr;
}

const speedControl = async(speed) => {
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve();
    }, 300/speed)
  })
}

export {newRandomArr, arrOfKeys, speedControl};