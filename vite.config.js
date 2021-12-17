/**
 * @author <dutianhe@ruubypay.com>
 * @date 2021-12-13 18:39:03
 * @description 配置 vite2 多环境打包
 * @param
 * @return
 */
import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
import rollupPluginGenerate from "ruubypay-rollup-plugin-generate-deployment-config"
import pak from "./package.json"
const envResolve = (mode, env) => loadEnv(mode, process.cwd())[env];

export default ({command,mode}) => {
  let options = {
    plugins: [vue(),rollupPluginGenerate({
      env: mode,
      projectName: pak.name,
      outDir:envResolve(mode,"VITE_APP_OUTPUTDIR")
    })],
    base:envResolve(mode,"VITE_APP_BASEURL"),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server:{
      host:'0.0.0.0'
    }
  }
  if(command != 'serve'){
    options = {
      ...options,
      build:{
        outDir:envResolve(mode,"VITE_APP_OUTPUTDIR"),
        assetsDir:'static',
        cssCodeSplit:true,
        rollupOptions:{
          output:{
            chunkFileNames:"static/js/[name].[hash].js",
            entryFileNames:"static/js/[name].[hash].js",
            assetFileNames:"static/[ext]/[name].[hash].[ext]",
          }
        }
      }
    }
  }
  return defineConfig(options)
}
