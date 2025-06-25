// module.exports = {
//   /* fix https://github.com/vuejs/vue-cli/issues/3678 */
//   presets: [["@vue/app", { useBuiltIns: "entry" }]]
// }

module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        'syntax-jsx',          // 解析 JSX 语法
        'transform-vue-jsx'    // 把 JSX 转成 render 函数
    ]
}

