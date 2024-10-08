export default defineAppConfig({
  "entryPagePath": "pages/category/index",
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/my/index',
    "pages/login/index",
  ],
  window: {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#f3514f",
    "navigationBarTitleText": "慕尚花坊",
    "navigationBarTextStyle": "white"
  },
  tabBar: {
    "color": "#252933",
    "selectedColor": "#FF734C",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "assets/tabbar/index.png",
        "selectedIconPath": "assets/tabbar/index-active.png"
      },
      {
        "pagePath": "pages/category/index",
        "text": "分类",
        "iconPath": "assets/tabbar/cate.png",
        "selectedIconPath": "assets/tabbar/cate-active.png"
      },
      {
        "pagePath": "pages/cart/index",
        "text": "购物车",
        "iconPath": "assets/tabbar/cart.png",
        "selectedIconPath": "assets/tabbar/cart-active.png"
      },
      {
        "pagePath": "pages/my/index",
        "text": "我的",
        "iconPath": "assets/tabbar/my.png",
        "selectedIconPath": "assets/tabbar/my-active.png"
      }
    ]
  },
  subPackages: [
    {
      "root": "modules/settingModule",
      "name": "settingModule",
      "pages": [
        "pages/setting/index",
        "pages/profile/index"
      ]
    },
    {
      "root": "modules/goodModule",
      "name": "goodModule",
      "pages": [
        "pages/goods/list/index",
        "pages/goods/detail/index"
      ]
    },
  ],
  "preloadRule": {
    "pages/my/index": {
      "network": "all",
      "packages": ["settingModule"]
    },
    "pages/category/index": {
      "network": "all",
      "packages": ["goodModule"]
    },
  },
})
