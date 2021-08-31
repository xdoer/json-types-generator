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
  data: jsonStr,
  outPutPath: '/User/xdoer/types.ts',
  rootInterfaceName: 'ChinaRegion',
  customInterfaceName(key, value, data) {
    if (key === 'celebrations') return 'Province'
    return key
  },
})
```

## Options

| Options             | Type                                           | Require | Meaning                             |
| ------------------- | ---------------------------------------------- | ------- | ----------------------------------- |
| data                | string \| json object                          | -[x]    | Json string or object               |
| outPutPath          | string                                         | -[x]    | types file output path              |
| rootInterfaceName   | string                                         | -[x]    | root interface name you want to get |
| overwrite           | boolean, default is true                       | -[ ]    | rewrite file when file is exist     |
| customInterfaceName | (key: string, value: any, data: any) => string | -[ ]    | custom intermediate interface       |

## Test

You can add json file to `test/data` folder, and run `npm test` command, then observe whether the output of `test/output` meets expectations

## Other

How to use this in Restful-API ? See [here](https://github.com/xdoer/PreQuest/tree/main/packages/response-types-generator)
