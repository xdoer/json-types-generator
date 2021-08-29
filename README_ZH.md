# JSON Types Generator

一个 JSON 数据的 TypeScript 类型生成器

## 安装

```base
yarn add json-types-generator
```

## 使用

```ts
import jsonTypesGenerator from 'json-types-generator'

const jsonStr = `
{
  "date": "2021-08-28",
  "season": "ordinary",
  "season_week": 21,
  "celebrations": [
    {
      "title": "Saint Augustine of Hippo, bishop and doctor of the Church",
      "colour": "white",
      "rank": "memorial",
      "rank_num": 3.1
    }
  ],
  "weekday": "saturday"
}
`

jsonTypesGenerator({
  // Json 字符串或对象
  data: jsonStr,

  // 输出路径
  outPutPath: '/User/xdoer/types.ts',

  // 导出的根 interface 名称
  rootInterfaceName: 'ChinaRegion',

  // 自定义中间产物类型名称
  customInterfaceName(key, value, data) {
    // 如果 key 是 aa, 且值为对象类型，则 interface 的 name 为 Province。默认为 key 的 upFirst 值 Aa
    if (key === 'aa') return 'Province'
  },
})
```

## 参数

| 名称                | 类型                                                   | 必填 | 含义                             |
| ------------------- | ------------------------------------------------------ | ---- | -------------------------------- |
| data                | string \| json object                                  | -[x] | Json 字符串或对象                |
| outPutPath          | string                                                 | -[x] | 类型文件输出路径                 |
| rootInterfaceName   | string                                                 | -[x] | 导出的根 interface 名称          |
| overwrite           | boolean, default is true                               | -[ ] | 当 outPutPath 有文件，则覆写文件 |
| customInterfaceName | (key: string, value: any, data: any) => string \| void | -[ ] | 自定义中间产物 interface         |

## 测试

向 `test/data` 文件夹下添加 JSON 文件，运行 `npm test` 后，观察 `test/output` 输出是否符合预期

## 注意事项

> - 数组类型的 JSON 数据，只会解析第一项
> - 数据类型为 null 时，由于不知道具体类型，会填充为 any

## 其他

如何在 Restful-API 中使用类型生成？请看[这里](https://github.com/xdoer/PreQuest/tree/main/packages/response-types-generator)
