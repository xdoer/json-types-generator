# JSON Types Generator

一个 JSON 数据的 typescript 类型生成器

## 安装

```base
yarn add json-types-generator
```

## 使用

```ts
import jsonTypesGenerator from 'json-types-generator'

const jsonStr = `
 [
  {
    "province": "北京市",
    "city": ["北京市"],
    "counties": [
      [
        "东城区",
        "西城区",
        "朝阳区",
      ]
    ]
  }
]
`

jsonTypesGenerator({
  data: jsonStr,
  outPutPath: '/User/xdoer/types.ts',
  interfaceName: 'ChinaRegion',
})
```
