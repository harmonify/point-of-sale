export const isNumber = (value: any): value is number => {
  return value != null && typeof value === "number" && !Number.isNaN(value)
}

export const isNumeric = <T extends string | number>(value?: T): value is T => {
  return value != null && value !== "" && !isNaN(Number(value.toString()))
}
