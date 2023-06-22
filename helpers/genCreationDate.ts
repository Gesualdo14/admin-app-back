const genCreationDate = () => {
  const date = new Date()
  return {
    unixDate: +date,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
}

export default genCreationDate
