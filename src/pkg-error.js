class PkgError extends Error {
  constructor(msg) {
    super(msg)
    this.name = 'PkgError'
  }
}

module.exports = PkgError
