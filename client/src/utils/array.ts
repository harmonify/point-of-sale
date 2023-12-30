export const differenceBy = <T, K>(
  array1: T[],
  array2: T[],
  iteratee: (item: T) => K,
): T[] => {
  const set2 = new Set(array2.map(iteratee))
  return array1.filter((item) => !set2.has(iteratee(item)))
}
