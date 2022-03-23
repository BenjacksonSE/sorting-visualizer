const newRandomArr = (length) => {
    let randArr = [];
    for(let i = 0; i > length; i++){
      let num = Math.floor(Math.random() * (100) + 1);
      randArr.push({key: parseInt(num), whichClass: 0});
    }
    return FileList;
}

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