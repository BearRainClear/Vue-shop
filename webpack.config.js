const path = require('path')
//这个配置文件，起始就是一个js文件，通过node中的模块操作，向外暴露了一个配置对象
const webpack = require("webpack")
const htmlWebpackPlugin = require('html-webpack-plugin')
//导入在内存中生成html页面的插件
//只要是插件 都一定要放到plugins节点中去
//这个插件的两个作用
//1.自动在内存中根据指定页面生成一个内存的页面
//2.自动，把打包好的bundle。js追加到页面中去
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports ={
  //入口，表示，要使用webpack打包哪个文件
  entry:path.join(__dirname,'./src/main.js'),
  //输出文件相关配置
  output:{
    path:path.join(__dirname,'./dist'),//指定打包好的文件，输出到哪个目录中去
    filename:'bundle.js'//这是指定 输出的文件的名称
  },
    plugins:[//配置插件的节点
        new htmlWebpackPlugin({
            //创建一个在内存中生成html页面的插件
            template:path.join(__dirname,'./src/index.html'),//指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename:'index.html'//指定生成页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{
        //这个节点，用于配置所有第三方模块加载器
        rules:[
            //所有第三方模块的匹配规则
            { test: /\.css$/,use:['style-loader','css-loader']  },//配置处理.css 文件的第三方loader规则
            { test: /\.(jpg|png)$/,use:'url-loader'},
            { test: /\.(ttf|edt|svg|woff|woff2)$/,use:'url-loader'},
            { test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve:{
        alias:{//修改vue被导入时候的包的路径
            "vue$":"vue/dist/vue.js"
        }
    }

}

//当我们在控制台，直接输入webpack命令执行的时候webpack做了一下几步
//1.首先，webpack发现，我们并没有通过命令的形式，给他指定入口和出口
//2.webpack 就会去项目的根目录中，查找一个叫做"webpack.config.js"的配置文件
//3.当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行完配置文件后，就得到了配置文件中导出的配置文件对象
//4.当webpack拿到配置对象后，就拿到了配置对象中，指定的入口和出口 进行打包构建

//使用webpack-dev-server这个工具，来实现自动打包编译的功能
//1.运行npm i webpack-dev-server -D把这个工具安装到项目的本地开发依赖
//安装完毕后，这个工具的用法，和webpack命令的用法完全一样
//由于我们是在项目中，本地安装的 所以无法把他当作脚本命令，在powershell终端之间运行，只有那些安装到全局-g的工具才能
//4.注意 webpack-dev-server 这个工具，如果想要正常运行，要求，在本地项目中，必须安装webpack
//5.webpack-dev-server帮我们打包生成的bundle.js文件并没有存放到实际的物理磁盘上；而实直接托管到了电脑的内存中，所以我们在项目根目录中，根本找不到这个打包好的bundle.js
//我们可以认为webpack-dev-server把打包好的文件以一种虚拟的形式托管到了咱们的项目的根目录中虽然我们看不见他 但是可以认为和dist 评级，有一个看不见的文件叫做boundle。js
