console.clear();
let numberArray = [1, 2, 3, 4, 5];

function tinhTongMangSoNguyen(arr: number[]) {
  let tong: number = 0;

  for (let i = 0; i < arr.length; i++) {
    tong += arr[i];
  }

  // const tong = arr.reduce((sum, currentValue) => sum + currentValue, 0);
  return tong;
}

let ketQua = tinhTongMangSoNguyen(numberArray);

console.log(`Tổng của mảng là: ${ketQua}`);