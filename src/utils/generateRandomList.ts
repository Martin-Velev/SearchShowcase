export function generateRandomList(length: number): number[] {
  let list: number[] = new Array(length);
  for(let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * (100 + 1));
    list[i] = rand;
  }
  return list
}
