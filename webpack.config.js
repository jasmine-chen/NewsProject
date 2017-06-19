const webpack = require('webpack'),
	path = require('path');
const	ExtractTextPlugin = require('extract-text-webpack-plugin');
const SRC = path.resolve(__dirname, "src"),
	NODE_MODULES = path.resolve(__dirname, "node_modules");
const pathToReact = path.resolve(NODE_MODULES, 'react/dist/react.min.js');
const pathToReactDOM = path.resolve(NODE_MODULES, 'react-dom/dist/react-dom.min.js');

const config = {
	context: path.resolve(__dirname, "src"),

	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		'./index.js'
	],
	resolve: {
			 alias: {
				//  'react': pathToReact
			 }
	 },

	output: {
		// path: __dirname,
		// filename: "./build/bundle.js"
		filename: 'bundle.js',
		// 输出的打包文件

		path: path.resolve(__dirname,'dist'),
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: SRC,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['react', 'es2015'],
							//添加组件的插件配置
							plugins: [
								["react-html-attrs"]
							]
						}
					}
				]
			},
			// {
			// 	test: /\.css$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: "style-loader",
      //     use: "css-loader"
			// 	})
			// },
			{
				test: /\.css$/,
				include: [
					NODE_MODULES,
					SRC
				],
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpe?g)$/,
				use: ['url-loader?limit=1024&name=img/[name].[ext]']
				// use: ['file-loader?name=img/[name].[ext]']
			}
		],

	},

	plugins: [
		// new ExtractTextPlugin('styles.css'),
		new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};
if(process.env.NODE_ENV !== undefined && process.env.NODE_ENV.trim() === 'production'){
	console.log("prod");
	// config.devtool = 'cheap-module-source-map';
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			// sourceMap: true
		})
	);
	// config.module.noParse = [pathToReact];
	config.resolve.alias['react'] = pathToReact;
	config.resolve.alias['react-dom'] = pathToReactDOM;
}else{
	console.log("dev");
	// 为 webpack-dev-server 的环境打包代码，连接到指定服务器域名与端口
	config.entry.push('webpack-dev-server/client?http://localhost:8080');
	//为热替换(HMR)打包好代码
	// only- 意味着只有成功更新运行代码才会执行热替换(HMR)
	config.entry.push('webpack/hot/only-dev-server');
	// 开启 React 代码的模块热替换(HMR) 在生产环境不使用
	// config.entry.unshift('react-hot-loader/patch');
	// 对于热替换是必须的，让 webpack  知道在哪里载入热更新的模块(chunk)
	config.output.publicPath = '/';
	// config.devtool = 'inline-source-map';
	// config.devtool = 'cheap-module-eval-source-map';
	config.devServer = {
		inline: true,
		hot: true,
		// 开启服务器的模块热替换(HMR)
		contentBase: path.resolve(__dirname, 'dist'),
		// 输出文件的路径
		publicPath: '/'
		// 和上文 output 的"publicPath"值保持一致
	};
	// 开启全局的模块热替换(HMR)
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
	// 当模块热替换时在浏览器控制台输出对用户更友好的模块名字信息
	config.plugins.push(new webpack.NamedModulesPlugin());
}

console.log(config);

module.exports = config;
