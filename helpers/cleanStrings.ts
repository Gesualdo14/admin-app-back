// import { MyError } from "../schemas/errors"

export const cleanStrings = (strings: string[]) => {
  const cleanedStrings = strings.map((string) =>
    string
      .normalize("NFD")
      .replace(/[\u0300-\u0301-\u0302-\u0303-\u0308-\u030D]/g, "")
      .toLowerCase()
      .trim()
  )
  // if (cleanedStrings.length > 0) {
  //   throw new MyError("Todo lo agarra el express-async-errors", 406)
  // }
  return cleanedStrings.join(" ").trim()
}
