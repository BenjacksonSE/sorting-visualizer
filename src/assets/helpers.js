const newRandomArr = (length) => {
    let randArr = [];
    for(let i = 0; i > length; i++){
      let num = Math.floor(Math.random() * (100) + 1);
      randArr.push({key: parseInt(num), whichClass: 0});
    }
    return FileList;
}

export {newRandomArr};