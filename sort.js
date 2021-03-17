const arr = [23, 16, 1, 5,22,7];
function bubbleSort(arr){
  const tmpArr = [...arr];
  for(let i = 0; i < tmpArr.length -1; i++){
    for(let j = 0; j< tmpArr.length -1 - i; j ++){
      if(tmpArr[j] > tmpArr[j+1]){
        [tmpArr[j], tmpArr[j+1]] = [tmpArr[j+1], tmpArr[j]];
      }
    }
  }
  return tmpArr;
}
console.log(arr, bubbleSort(arr));

function quickSort(arr){
  const tmpArr = [...arr];
  if(tmpArr.length < 2){
    return tmpArr;
  }
  const midIndex = Math.floor(tmpArr.length/2);
  const midValue = tmpArr.splice(midIndex, 1)[0];
  const leftArr = [];
  const rightArr = [];
  for(let i = 0; i < tmpArr.length ; i++){
    if(tmpArr[i] < midValue){
      leftArr.push(tmpArr[i])
    }else{
      rightArr.push(tmpArr[i])
    }
  }
  return quickSort(leftArr).concat([midValue]).concat(quickSort(rightArr));
}

console.log(arr, quickSort(arr));

function insertSort(arr){
  const tmpArr = [...arr];
  if(tmpArr.length <= 1){
    return tmpArr;
  }
  const handle = [arr[0]];
  for(let i = 1; i < tmpArr.length; i++){
    for(let j = handle.length -1; j >= 0; j--){
      if(tmpArr[i] > handle[j]){
        handle.splice(j+1, 0 , tmpArr[i])
        break;
      }
      if(j === 0){
        handle.unshift(tmpArr[i]);
      }
    }
  }
  return handle;
}
console.log(arr, insertSort(arr));