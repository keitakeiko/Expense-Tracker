module.exports = {
  isEqual: (a, b, options) =>
    String(a) === String(b) ? options.fn(this) : options.inverse(this)
}
