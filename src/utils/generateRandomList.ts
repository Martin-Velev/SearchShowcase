export function generateRandomList(length: number): number[] {
  let list: number[] = new Array(length);
  for(let i = 0; i < length; i++) {
    let rand
    rand = Math.floor(Math.random() * (100 + 1));
    while (list.filter(num => num === rand).length > 0) {
      rand = Math.floor(Math.random() * (100 + 1));
    }
    list[i] = rand;
  }
  return list
}
