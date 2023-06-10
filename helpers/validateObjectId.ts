import { isValidObjectId } from "mongoose"

const validateObjectId = (id: unknown) => {
  if (isValidObjectId(id)) return true

  return false
}

export default validateObjectId
