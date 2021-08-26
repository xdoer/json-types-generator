# JSON Types Generator

A Json Types Generator For TypeScript

## Install

```bash
yarn add json-types-generator
```

## Usage

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
    if (key === 'aa') return 'Province'
  },
})
```

## Options

| Options             | Type                                                   | Require | Meaning                             |
| ------------------- | ------------------------------------------------------ | ------- | ----------------------------------- |
| data                | string \| json object                                  | -[x]    | Json string or object               |
| outPutPath          | string                                                 | -[x]    | types file output path              |
| rootInterfaceName   | string                                                 | -[x]    | root interface name you want to get |
| customInterfaceName | (key: string, value: any, data: any) => string \| void | -[ ]    | custom intermediate interface       |

## Test

You can add json file to `test/data` folder, and run `npm test` command, then observe whether the output of `test/output` meets expectations
