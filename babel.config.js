// babel-preset-taro 更多选项和默认值：
// eslint-disable-next-line import/no-commonjs
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      hot: false,
      ts: true
    }]
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "@taroify/core",
        libraryDirectory: "",
        style: true,
      },
      "@taroify/core",
    ],
    [
      "import",
      {
        libraryName: "@taroify/icons",
        libraryDirectory: "",
        camel2DashComponentName: false,
        style: () => "@taroify/icons/style",
        customName: (name) => name === "Icon" ? "@taroify/icons/van/VanIcon" : `@taroify/icons/${name}`,
      },
      "@taroify/icons",
    ],
  ],
}
