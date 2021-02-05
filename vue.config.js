module.exports = {
	productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  publicPath: '',
	css: { 
		extract: true 
	},
  runtimeCompiler: true
}