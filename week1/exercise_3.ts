console.clear();
const generic = <T>(arr: T[]): T | undefined => {
  return arr.length > 0 ? arr[0] : undefined;
};

const result = generic<number>([0, 1, 2, 4]);

console.log(result);