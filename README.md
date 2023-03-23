# 🍪 Cookie Utils 🍪

一个简单、轻量级的、与平台无关的 JavaScript Cookie 工具类，让你在不同环境中处理 Cookie 变得更简单！🌟

**✨ 为什么选择 Cookie Utils？**

- 💡 简单易用，提供直观的 API
- 📦 轻量级，零生产依赖
- 💻 平台无关，适用于浏览器、Node.js 等环境
- 🌈 使用 TypeScript 编写，更安全、更健壮

现在开始使用 Cookie Utils，让你的 Cookie 操作更轻松愉快！🥳

## 🚀 安装

使用 npm 安装：

```bash
npm install ck-util
```

## 🎉 使用

首先，导入 `CookieUtils` 类：

```js
import { CookieUtils } from 'ck-util'
```

然后，创建一个新的 `CookieUtils` 实例，传入一个可选的 cookie 字符串：

```js
const cookieUtils = new CookieUtils('name=John%20Doe; age=25; city=New%20York')
```

## 📖 示例

### 1️⃣ 解析 Cookie 字符串

```js
const cookies = new CookieUtils('name=John%20Doe; age=25; city=New%20York')
console.log(cookies.get('name')) // 输出：'John Doe'
```

### 2️⃣ 设置 Cookie

```js
cookies.set('country', 'USA')
console.log(cookies.get('country')) // 输出：'USA'
```

### 3️⃣ 获取 Cookie 值

```js
const name = cookies.get('name')
console.log(name) // 输出：'John Doe'
```

### 4️⃣ 删除 Cookie

```js
cookies.delete('name')
console.log(cookies.get('name')) // 输出：null
```

### 5️⃣ 检查 Cookie 是否存在

```js
const hasName = cookies.has('name')
console.log(hasName) // 输出：false
```

### 6️⃣ 将 Cookies 对象转换为标准字符串

```js
const cookieStr = cookies.stringify()
console.log(cookieStr) // 输出："age=25; city=New%20York; country=USA"
```
