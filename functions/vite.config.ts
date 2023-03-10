import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
    plugins: [
        ...VitePluginNode({
            appPath: './src/index.ts',
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            adapter: () => {},
            tsCompiler: 'swc',
            swcOptions: {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                    },
                    target: 'es5',
                },
            },
        }),
    ],
    build: {
        target: 'es5',
        rollupOptions: {
            treeshake: false,
            output: {
                inlineDynamicImports: true,
                entryFileNames: '[name].js',
                assetFileNames: '[name].ext',
                format: 'cjs',
            },
        },
    },
})
