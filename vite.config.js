/**
 * @author <dutianhe@ruubypay.com>
 * @date 2021-12-13 18:39:03
 * @description 配置 vite2 多环境打包
 * @param
 * @return
 */
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
import rollupPluginGenerate from "ruubypay-rollup-plugin-generate-deployment-config"
import pak from "./package.json"
import legacy from '@vitejs/plugin-legacy'
const envResolve = (mode, env) => loadEnv(mode, process.cwd())[env];

export default ({command, mode}) => {
    let base = "";
    switch (mode) {
        case "debug":
            base = "//static-cs.ruubypay.com";
            break;
        case "test":
            base = "//static-ft.ruubypay.com"
            break;
        case "release":
            base = "//static.ruubypay.com"
            break;
    }

    let options = {
        plugins: [vue(), rollupPluginGenerate({
            env: mode,
            projectName: pak.name,
            outDir: `target/${mode}/${pak.name}`
        }),legacy({
            targets: ['> 1%, last 1 version, ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
        })],
        base: `${base}/${pak.name}`,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        server: {
            host: '0.0.0.0'
        }
    }
    if (command != 'serve') {
        options = {
            ...options,
            build: {
                outDir: `target/${mode}/${pak.name}`,
                assetsDir: 'static',
                cssCodeSplit: true,
                rollupOptions: {
                    output: {
                        chunkFileNames: "static/js/[name].[hash].js",
                        entryFileNames: "static/js/[name].[hash].js",
                        assetFileNames: "static/[ext]/[name].[hash].[ext]",
                    }
                }
            }
        }
    }
    return defineConfig(options)
}
