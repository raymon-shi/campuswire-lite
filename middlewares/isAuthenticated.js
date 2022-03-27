const isAuthenticated = (req, res, next) => {
  const { session } = req
  const { username, password } = session
  if (username && password) {
    next()
  } else {
    next(new Error(`The user is not logged in!`))
  }
}

module.exports = {
  isAuthenticated,
}
