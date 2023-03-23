# 🍪 Cookie Util 🍪

一个简单、轻量级的、与平台无关的 JavaScript Cookie 工具类。

**为什么是 Cookie Util？**

- 💡 简单易用，提供直观的 API
- 📦 轻量级，零生产依赖
- 💻 平台无关，适用于浏览器、Node.js 等环境
- 🌈 使用 TypeScript 编写，更安全、更健壮

试试 Cookie Util，让 Cookie 操作轻松愉快，睡个安稳觉！🥳

## 🚀 安装

使用 npm 安装：

```bash
npm install ck-util
```

## 🎉 使用

```javascript
// 🧭 从 ck-util 中引入 CookieUtil 类
const { CookieUtil } = require('ck-util')

// 🔍 解析 Cookie 字符串
const cookies = new CookieUtil('name=Viki%20Moe; age=21; city=Beijing')
console.log(cookies.get('name')) // 输出：'Viki Moe'

// ✏️ 设置 Cookie 字段
cookies.set('country', 'China')
console.log(cookies.get('country')) // 输出：'China'

// 📖 获取 Cookie 字段值
const name = cookies.get('name')
console.log(name) // 输出：'Viki Moe'

// ❌ 删除 Cookie 字段
const deletedValue = cookies.delete('name')
console.log(deletedValue, cookies.get('name')) // 输出：Viki Moe, undefined

// 🧐 检查 Cookie 字段是否存在
const hasName = cookies.has('name')
console.log(hasName) // 输出：false

// 🔄 将 Cookies 对象转换为标准字符串
const cookieStr = cookies.stringify()
console.log(cookieStr) // 输出："age=21; city=Beijing; country=China"
```

## License

- [MIT](LICENSE) License © 2023-PRESENT Viki