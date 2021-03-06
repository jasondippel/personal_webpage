module.exports = (ctx) => {
  // //   Use webpack's mode as ctx.env is undefined and mode is pretty much the same
  //   const NODE_ENV = ctx.webpack.mode // https://github.com/postcss/postcss-loader/issues/368#issuecomment-518492725

  return {
    parser: 'postcss-scss',
    plugins: [require('postcss-preset-env'), require('autoprefixer')],
  }
}
