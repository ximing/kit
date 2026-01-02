# @rabjs/kit 技术方案

## 1. 方案概述

### 1.1 项目定位

`@rabjs/kit` 是一个类似 lodash 的 TypeScript 工具库，提供常用的工具函数集合，支持现代前端和 Node.js 环境。

### 1.2 核心特性

- **TypeScript 实现**：提供完整的类型定义，增强开发体验
- **Tree-shaking 友好**：支持按需引入，减少打包体积
- **高测试覆盖率**：单测覆盖率 >= 90%
- **多模块格式**：同时支持 CommonJS 和 ESM
- **广泛兼容性**：支持 Node.js、Webpack、Vite 等主流构建工具
- **现代浏览器支持**：目标环境 Chrome >= 70, Safari >= 12

### 1.3 技术栈

- **开发语言**：TypeScript 4.9.5
- **构建工具**：esbuild
- **测试框架**：Jest + ts-jest
- **代码质量**：ESLint + Prettier + Husky
- **包管理**：pnpm

## 2. 方案细节

### 2.1 项目结构

```
kit/
├── src/                          # 源代码目录
│   ├── array/                    # 数组工具函数
│   │   ├── chunk.ts
│   │   ├── compact.ts
│   │   ├── flatten.ts
│   │   ├── uniq.ts
│   │   ├── difference.ts
│   │   ├── intersection.ts
│   │   ├── union.ts
│   │   └── index.ts
│   ├── object/                   # 对象工具函数
│   │   ├── clone.ts
│   │   ├── merge.ts
│   │   ├── pick.ts
│   │   ├── omit.ts
│   │   ├── get.ts
│   │   ├── set.ts
│   │   ├── has.ts
│   │   └── index.ts
│   ├── string/                   # 字符串工具函数
│   │   ├── camelCase.ts
│   │   ├── kebabCase.ts
│   │   ├── snakeCase.ts
│   │   ├── capitalize.ts
│   │   ├── trim.ts
│   │   ├── truncate.ts
│   │   └── index.ts
│   ├── function/                 # 函数工具
│   │   ├── debounce.ts
│   │   ├── throttle.ts
│   │   ├── once.ts
│   │   ├── memoize.ts
│   │   ├── curry.ts
│   │   └── index.ts
│   ├── number/                   # 数字工具函数
│   │   ├── clamp.ts
│   │   ├── random.ts
│   │   ├── round.ts
│   │   ├── sum.ts
│   │   ├── mean.ts
│   │   └── index.ts
│   ├── is/                       # 类型判断函数
│   │   ├── isArray.ts
│   │   ├── isObject.ts
│   │   ├── isString.ts
│   │   ├── isNumber.ts
│   │   ├── isFunction.ts
│   │   ├── isBoolean.ts
│   │   ├── isNull.ts
│   │   ├── isUndefined.ts
│   │   ├── isNil.ts
│   │   ├── isEmpty.ts
│   │   ├── isPlainObject.ts
│   │   ├── isPromise.ts
│   │   └── index.ts
│   ├── date/                     # 日期工具函数
│   │   ├── format.ts
│   │   ├── parse.ts
│   │   ├── addDays.ts
│   │   ├── diffDays.ts
│   │   └── index.ts
│   ├── promise/                  # Promise 工具函数
│   │   ├── delay.ts
│   │   ├── retry.ts
│   │   ├── timeout.ts
│   │   ├── parallel.ts
│   │   ├── series.ts
│   │   └── index.ts
│   ├── collection/               # 集合操作
│   │   ├── groupBy.ts
│   │   ├── keyBy.ts
│   │   ├── sortBy.ts
│   │   ├── partition.ts
│   │   └── index.ts
│   ├── math/                     # 数学工具
│   │   ├── max.ts
│   │   ├── min.ts
│   │   ├── maxBy.ts
│   │   ├── minBy.ts
│   │   └── index.ts
│   ├── types/                    # 类型定义
│   │   └── index.ts
│   └── index.ts                  # 主入口文件
├── test/                         # 测试用例目录
│   ├── array/
│   ├── object/
│   ├── string/
│   ├── function/
│   ├── number/
│   ├── is/
│   ├── date/
│   ├── promise/
│   ├── collection/
│   └── math/
├── specs/                        # 技术方案文档目录
│   └── technical-design.md
├── dist/                         # 构建输出目录
│   ├── cjs/                      # CommonJS 格式
│   ├── esm/                      # ES Module 格式
│   └── types/                    # TypeScript 类型声明
├── scripts/                      # 构建脚本
│   └── build.js
├── package.json
├── tsconfig.json
├── tsconfig.prod.cjs.json
├── tsconfig.prod.esm.json
├── tsconfig.prod.types.json
├── esbuild.config.js
└── jest.config.js
```

### 2.2 实现的工具函数

#### 2.2.1 数组工具 (Array)

1. **chunk(array, size)** - 将数组分割成指定大小的块
2. **compact(array)** - 移除数组中的假值元素
3. **flatten(array, depth)** - 展平数组
4. **flattenDeep(array)** - 深度展平数组
5. **uniq(array)** - 数组去重
6. **uniqBy(array, iteratee)** - 根据条件去重
7. **difference(array, ...arrays)** - 获取差集
8. **intersection(...arrays)** - 获取交集
9. **union(...arrays)** - 获取并集
10. **zip(...arrays)** - 压缩多个数组
11. **take(array, n)** - 获取前 n 个元素
12. **drop(array, n)** - 移除前 n 个元素
13. **findIndex(array, predicate)** - 查找元素索引
14. **remove(array, predicate)** - 移除符合条件的元素

#### 2.2.2 对象工具 (Object)

1. **clone(obj)** - 浅拷贝对象
2. **cloneDeep(obj)** - 深拷贝对象
3. **merge(target, ...sources)** - 合并对象
4. **mergeDeep(target, ...sources)** - 深度合并对象
5. **pick(obj, keys)** - 选取对象属性
6. **omit(obj, keys)** - 排除对象属性
7. **get(obj, path, defaultValue)** - 安全获取深层属性
8. **set(obj, path, value)** - 设置深层属性
9. **has(obj, path)** - 判断是否存在属性
10. **keys(obj)** - 获取对象键数组
11. **values(obj)** - 获取对象值数组
12. **entries(obj)** - 获取键值对数组
13. **mapKeys(obj, iteratee)** - 映射对象的键
14. **mapValues(obj, iteratee)** - 映射对象的值
15. **invert(obj)** - 键值互换

#### 2.2.3 字符串工具 (String)

1. **camelCase(str)** - 转换为驼峰命名
2. **kebabCase(str)** - 转换为短横线命名
3. **snakeCase(str)** - 转换为下划线命名
4. **pascalCase(str)** - 转换为帕斯卡命名
5. **capitalize(str)** - 首字母大写
6. **upperFirst(str)** - 首字母转大写
7. **lowerFirst(str)** - 首字母转小写
8. **trim(str, chars)** - 去除空白字符
9. **trimStart(str, chars)** - 去除开头空白
10. **trimEnd(str, chars)** - 去除结尾空白
11. **truncate(str, options)** - 截断字符串
12. **padStart(str, length, chars)** - 左侧填充
13. **padEnd(str, length, chars)** - 右侧填充
14. **repeat(str, n)** - 重复字符串
15. **template(str, data)** - 字符串模板替换

#### 2.2.4 函数工具 (Function)

1. **debounce(func, wait, options)** - 防抖函数
2. **throttle(func, wait, options)** - 节流函数
3. **once(func)** - 只执行一次的函数
4. **memoize(func, resolver)** - 缓存函数结果
5. **curry(func, arity)** - 柯里化函数
6. **partial(func, ...args)** - 偏函数应用
7. **bind(func, thisArg, ...args)** - 绑定函数上下文
8. **negate(predicate)** - 取反函数
9. **compose(...funcs)** - 函数组合（从右到左）
10. **pipe(...funcs)** - 函数管道（从左到右）

#### 2.2.5 数字工具 (Number)

1. **clamp(number, lower, upper)** - 限制数字范围
2. **random(lower, upper, floating)** - 生成随机数
3. **round(number, precision)** - 四舍五入
4. **ceil(number, precision)** - 向上取整
5. **floor(number, precision)** - 向下取整
6. **sum(numbers)** - 求和
7. **mean(numbers)** - 求平均值
8. **median(numbers)** - 求中位数
9. **range(start, end, step)** - 生成数字序列
10. **inRange(number, start, end)** - 判断是否在范围内

#### 2.2.6 类型判断 (Is)

1. **isArray(value)** - 判断是否为数组
2. **isObject(value)** - 判断是否为对象
3. **isPlainObject(value)** - 判断是否为纯对象
4. **isString(value)** - 判断是否为字符串
5. **isNumber(value)** - 判断是否为数字
6. **isBoolean(value)** - 判断是否为布尔值
7. **isFunction(value)** - 判断是否为函数
8. **isNull(value)** - 判断是否为 null
9. **isUndefined(value)** - 判断是否为 undefined
10. **isNil(value)** - 判断是否为 null 或 undefined
11. **isEmpty(value)** - 判断是否为空
12. **isDate(value)** - 判断是否为日期
13. **isRegExp(value)** - 判断是否为正则
14. **isError(value)** - 判断是否为错误对象
15. **isPromise(value)** - 判断是否为 Promise
16. **isSymbol(value)** - 判断是否为 Symbol
17. **isMap(value)** - 判断是否为 Map
18. **isSet(value)** - 判断是否为 Set
19. **isWeakMap(value)** - 判断是否为 WeakMap
20. **isWeakSet(value)** - 判断是否为 WeakSet

#### 2.2.7 日期工具 (Date)

1. **format(date, formatStr)** - 格式化日期
2. **parse(dateStr, formatStr)** - 解析日期字符串
3. **addDays(date, amount)** - 增加天数
4. **addMonths(date, amount)** - 增加月数
5. **addYears(date, amount)** - 增加年数
6. **diffDays(date1, date2)** - 计算天数差
7. **diffMonths(date1, date2)** - 计算月数差
8. **diffYears(date1, date2)** - 计算年数差
9. **startOfDay(date)** - 获取当天开始时间
10. **endOfDay(date)** - 获取当天结束时间

#### 2.2.8 Promise 工具 (Promise)

1. **delay(ms, value)** - 延迟执行
2. **retry(fn, options)** - 重试函数
3. **timeout(promise, ms, message)** - Promise 超时
4. **parallel(tasks, concurrency)** - 并行执行任务
5. **series(tasks)** - 串行执行任务
6. **map(array, mapper, concurrency)** - 异步 map
7. **filter(array, predicate, concurrency)** - 异步 filter
8. **reduce(array, reducer, initial)** - 异步 reduce

#### 2.2.9 集合操作 (Collection)

1. **groupBy(collection, iteratee)** - 分组
2. **keyBy(collection, iteratee)** - 键值化
3. **sortBy(collection, iteratees)** - 排序
4. **orderBy(collection, iteratees, orders)** - 多条件排序
5. **partition(collection, predicate)** - 分区
6. **countBy(collection, iteratee)** - 计数
7. **sample(collection)** - 随机取一个
8. **sampleSize(collection, n)** - 随机取 n 个
9. **shuffle(collection)** - 随机打乱

#### 2.2.10 数学工具 (Math)

1. **max(numbers)** - 最大值
2. **min(numbers)** - 最小值
3. **maxBy(array, iteratee)** - 根据条件获取最大值
4. **minBy(array, iteratee)** - 根据条件获取最小值
5. **sumBy(array, iteratee)** - 根据条件求和
6. **meanBy(array, iteratee)** - 根据条件求平均值

### 2.3 构建配置

#### 2.3.1 esbuild 配置

创建 `scripts/build.js` 用于构建：

```javascript
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// 获取所有源文件
function getEntryPoints() {
  const srcDir = path.join(__dirname, '../src');
  const entries = {};

  function walk(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath, prefix + file + '/');
      } else if (file.endsWith('.ts')) {
        const name = prefix + file.replace('.ts', '');
        entries[name] = fullPath;
      }
    });
  }

  walk(srcDir);
  return entries;
}

async function build() {
  const entryPoints = getEntryPoints();

  // Build ESM
  await esbuild.build({
    entryPoints,
    outdir: 'dist/esm',
    format: 'esm',
    target: ['chrome70', 'safari12'],
    platform: 'neutral',
    sourcemap: true,
    splitting: true,
    treeShaking: true,
  });

  // Build CJS
  await esbuild.build({
    entryPoints,
    outdir: 'dist/cjs',
    format: 'cjs',
    target: ['chrome70', 'safari12'],
    platform: 'node',
    sourcemap: true,
    treeShaking: true,
  });

  console.log('Build completed!');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

#### 2.3.2 TypeScript 配置

更新 `package.json` 的构建脚本：

```json
{
  "scripts": {
    "build": "npm run build:clean && npm run build:bundle && npm run build:types",
    "build:clean": "rimraf dist",
    "build:bundle": "node scripts/build.js",
    "build:types": "tsc --project tsconfig.prod.types.json"
  },
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./array": {
      "import": "./dist/esm/array/index.js",
      "require": "./dist/cjs/array/index.js",
      "types": "./dist/types/array/index.d.ts"
    },
    "./object": {
      "import": "./dist/esm/object/index.js",
      "require": "./dist/cjs/object/index.js",
      "types": "./dist/types/object/index.d.ts"
    }
  }
}
```

### 2.4 测试策略

#### 2.4.1 单元测试

每个工具函数都需要有对应的测试文件，测试覆盖率要求 >= 90%。

测试文件位置：`test/{module}/{functionName}.spec.ts`

测试文件命名规范：`{functionName}.spec.ts`

测试内容包括：

- 基本功能测试
- 边界条件测试
- 异常情况测试
- 类型测试（TypeScript）

#### 2.4.2 Jest 配置

保持现有的 `jest.config.js`，确保覆盖率要求：

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts', '!src/**/*.interface.ts', '!src/types/**'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
};
```

### 2.5 代码质量

#### 2.5.1 ESLint 配置

确保代码风格一致，使用严格的 TypeScript 规则。

#### 2.5.2 Prettier 配置

统一代码格式化。

#### 2.5.3 Husky + lint-staged

提交前自动检查和格式化代码。

### 2.6 文档

#### 2.6.1 API 文档

每个工具函数都需要：

- JSDoc 注释
- 参数说明
- 返回值说明
- 使用示例
- 复杂度分析

#### 2.6.2 README.md

包括：

- 安装方法
- 快速开始
- API 列表
- 使用示例
- 贡献指南

## 3. TODO 列表

### 阶段一：基础设施（预计 1 天）

- [x] 更新 package.json 配置
  - [x] 更新 description 和 tags
  - [x] 配置 exports 字段支持子路径导出
  - [x] 更新构建脚本
- [x] 创建 TypeScript 配置文件
  - [x] tsconfig.prod.cjs.json
  - [x] tsconfig.prod.esm.json
  - [x] 更新 tsconfig.prod.types.json
- [x] 创建构建脚本 scripts/build.js
- [x] 更新 esbuild.config.js 适配新需求
- [x] 更新 jest.config.js 添加覆盖率阈值
- [x] 创建 src 目录结构

### 阶段二：类型判断工具（预计 1 天）

- [x] 实现 is 模块（20个函数）
  - [x] isArray, isObject, isPlainObject
  - [x] isString, isNumber, isBoolean
  - [x] isFunction, isNull, isUndefined, isNil
  - [x] isEmpty, isDate, isRegExp, isError
  - [x] isPromise, isSymbol
  - [x] isMap, isSet, isWeakMap, isWeakSet
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段三：数组工具（预计 2 天）

- [x] 实现 array 模块（14个函数）
  - [x] chunk, compact, flatten, flattenDeep
  - [x] uniq, uniqBy
  - [x] difference, intersection, union
  - [x] zip, take, drop
  - [x] findIndex, remove
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段四：对象工具（预计 2 天）

- [x] 实现 object 模块（15个函数）
  - [x] clone, cloneDeep
  - [x] merge, mergeDeep
  - [x] pick, omit
  - [x] get, set, has
  - [x] keys, values, entries
  - [x] mapKeys, mapValues, invert
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段五：字符串工具（预计 1-2 天）

- [x] 实现 string 模块（15个函数）
  - [x] camelCase, kebabCase, snakeCase, pascalCase
  - [x] capitalize, upperFirst, lowerFirst
  - [x] trim, trimStart, trimEnd
  - [x] truncate, padStart, padEnd
  - [x] repeat, template
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段六：函数工具（预计 2 天）

- [x] 实现 function 模块（10个函数）
  - [x] debounce, throttle
  - [x] once, memoize
  - [x] curry, partial, bind
  - [x] negate, compose, pipe
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段七：数字和数学工具（预计 1 天）

- [x] 实现 number 模块（10个函数）
  - [x] clamp, random
  - [x] round, ceil, floor
  - [x] sum, mean, median
  - [x] range, inRange
- [x] 实现 math 模块（6个函数）
  - [x] max, min
  - [x] maxBy, minBy
  - [x] sumBy, meanBy
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段八：日期工具（预计 1 天）

- [x] 实现 date 模块（10个函数）
  - [x] format, parse
  - [x] addDays, addMonths, addYears
  - [x] diffDays, diffMonths, diffYears
  - [x] startOfDay, endOfDay
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段九：Promise 工具（预计 1-2 天）

- [x] 实现 promise 模块（8个函数）
  - [x] delay, retry, timeout
  - [x] parallel, series
  - [x] map, filter, reduce
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段十：集合操作（预计 1 天）

- [x] 实现 collection 模块（9个函数）
  - [x] groupBy, keyBy
  - [x] sortBy, orderBy
  - [x] partition, countBy
  - [x] sample, sampleSize, shuffle
- [x] 编写测试用例（覆盖率 >= 90%）
- [x] 编写 API 文档

### 阶段十一：集成和优化（预计 1-2 天）

- [x] 创建主入口文件 src/index.ts
- [x] 创建各模块的 index.ts
- [x] 运行完整构建流程测试
- [x] 验证 Tree-shaking 效果
- [x] 验证 CJS 和 ESM 输出
- [x] 性能优化
- [x] 包体积优化

### 阶段十二：文档和发布（预计 1 天）

- [ ] 编写完整的 README.md
- [ ] 编写贡献指南
- [ ] 更新 CI/CD 配置
- [ ] 发布 npm 包
- [ ] 创建 GitHub Release

## 4. 验证列表

### 4.1 功能验证

- [ ] 所有工具函数正常工作
- [ ] TypeScript 类型定义正确
- [ ] 测试覆盖率达到 90% 以上
- [ ] 所有测试用例通过

### 4.2 构建验证

- [ ] esbuild 构建成功
- [ ] 生成正确的 CJS 格式输出
- [ ] 生成正确的 ESM 格式输出
- [ ] 生成正确的类型声明文件
- [ ] 目标环境为 chrome>=70 safari>=12

### 4.3 兼容性验证

- [ ] Node.js 环境测试
  - [ ] CommonJS 导入测试
  - [ ] ES Module 导入测试
- [ ] Webpack 项目测试
  - [ ] 完整导入测试
  - [ ] 按需导入测试
  - [ ] Tree-shaking 效果验证
- [ ] Vite 项目测试
  - [ ] 完整导入测试
  - [ ] 按需导入测试
  - [ ] Tree-shaking 效果验证
- [ ] 浏览器环境测试
  - [ ] Chrome 70+ 测试
  - [ ] Safari 12+ 测试

### 4.4 Tree-shaking 验证

创建测试项目验证 Tree-shaking：

```javascript
// 只导入部分函数
import { chunk, debounce } from '@rabjs/kit';
// 或者
import chunk from '@rabjs/kit/array/chunk';
import debounce from '@rabjs/kit/function/debounce';

// 验证打包后只包含使用的函数代码
```

### 4.5 性能验证

- [ ] 与 lodash 性能对比测试
- [ ] 大数据量场景测试
- [ ] 内存使用测试
- [ ] 包体积对比

### 4.6 代码质量验证

- [ ] ESLint 检查通过（0 warnings）
- [ ] Prettier 格式化通过
- [ ] TypeScript 类型检查通过
- [ ] 所有 PR 自动化检查通过

### 4.7 文档验证

- [ ] API 文档完整准确
- [ ] 示例代码可运行
- [ ] README 说明清晰
- [ ] CHANGELOG 记录完整

### 4.8 发布验证

- [ ] npm 包可正常安装
- [ ] 包含所有必要文件
- [ ] package.json 配置正确
- [ ] 版本号符合语义化版本规范

## 5. 预期成果

完成本方案后，将得到：

1. **功能完整的工具库**：包含 10+ 个分类，117 个工具函数
2. **高质量代码**：TypeScript 实现，测试覆盖率 >= 90%
3. **优秀的开发体验**：完整的类型定义，清晰的文档
4. **优化的打包体积**：支持 Tree-shaking，按需引入
5. **广泛的兼容性**：支持主流构建工具和运行环境
6. **持续的维护**：完善的 CI/CD，规范的版本管理

## 6. 风险和挑战

1. **兼容性问题**：不同环境下的测试需要充分
2. **性能优化**：需要与 lodash 等库进行性能对比
3. **Tree-shaking**：需要确保打包工具能正确识别副作用
4. **类型定义**：复杂的泛型定义需要仔细设计
5. **测试覆盖率**：某些边界情况可能难以测试

## 7. 后续规划

1. **性能监控**：建立性能基准测试
2. **持续优化**：根据使用反馈持续优化
3. **功能扩展**：根据需求添加更多工具函数
4. **社区建设**：鼓励社区贡献
5. **文档完善**：建立在线文档站点