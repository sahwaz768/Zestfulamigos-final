export function containsWord(array, inputString) {
  return array.some((word) => inputString.toLocaleLowerCase().includes(word));
}
