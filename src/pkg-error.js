export default class PkgError extends Error {
  constructor (msg) {
    super(msg)
    this.name = this.constructor.name
  }
}
