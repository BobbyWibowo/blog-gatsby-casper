module.exports = {
  plugins: [
    require('autoprefixer'),
    require('stylelint')({
      fix: true
    })
  ]
}
