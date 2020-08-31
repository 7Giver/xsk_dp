const webpack = require("webpack");
const path = require("path");
const proxy = require('http-proxy-middleware');
const isProduction = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}
// let baseApi = "'http://pc.aisspc.cn/api'"
let baseApi = "'http://h5.yingku866.com'";
let baseFile = "'http://h5.yingku866.com/Public/Qiniu'";

module.exports = {
  publicPath: "/Public/Activity/dist",
  outputDir: "dist",
  productionSourceMap: false,
  // devServer: {
  //   host: 'localhost',//target host
  //   port: 8080,
  //   proxy:{
  //       '/api':{
  //           target: 'http://h5.yingku866.com',//代理地址，这里设置的地址会代替axios中设置的baseURL
  //           changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
  //           //ws: true, // proxy websockets
  //           //pathRewrite方法重写url
  //           pathRewrite: {
  //               '^/api': '' 
  //               //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
  //               //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
  //          }
  //   }}
  // },
  chainWebpack: (config) => {
    config
      .entry("index")
      .add("babel-polyfill")
      .end();
    config.resolve.symlinks(true);
    config.plugin("define").tap((args) => {
      const argv = process.argv;
      const mode = argv[argv.indexOf("--project-mode") + 1];
      args[0]["process.env"].MODE = `"${mode}"`;
      baseFile =
        mode === "dev"
          ? "'http://localhost:8080/Qiniu'"
          : "'http://h5.yingku866.com/Public/Qiniu'";
      args[0]["process.env"].BASE_API = baseApi;
      args[0]["process.env"].BASE_File = baseFile;
      return args;
    });

    if (isProduction) {
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all",
      });
    }

    config.resolve.alias
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"));
  },

};
