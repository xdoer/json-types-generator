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
  rootInterfaceName: 'ChinaRegion',
  customInterfaceName(key, value, data) {
    return key === 'a' ? 'Province' : key
  },
})
```

## 测试

向 `test/data` 文件夹下添加 JSON 文件，运行 `npm test` 后，观察 `test/output` 输出是否符合预期

## 注意事项

> - 数组类型的 JSON 数据，只会解析第一项
> - 数据类型为 null 时，由于不知道具体类型，会填充为 any
