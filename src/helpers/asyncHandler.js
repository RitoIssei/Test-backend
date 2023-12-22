function asyncHandler(fn) {
  return (rep, res, next) => {
    fn(rep, res, next).catch(next)
  }
}

module.exports = asyncHandler
