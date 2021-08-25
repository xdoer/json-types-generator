import { OptionalKind, PropertySignatureStructure } from 'ts-morph'
import { createProject, saveProject, upFirst, elementType } from './util'
import { JsonEleType } from './enum'

interface Opt {
  data: string | Record<string, any> | Record<string, any>[]
  interfaceName: string
  outPutPath: string
}

export default function(opt: Opt) {
  const { data, outPutPath, interfaceName } = opt
  const sourceFile = createProject(outPutPath)

  const baseData =
    elementType(data) === JsonEleType.string ? JSON.parse(data as any) : data
  const json =
    elementType(baseData) === JsonEleType.array ? baseData[0] : baseData

  function handleJsonObj(json: Record<string, any>, name: string) {
    const properties: OptionalKind<PropertySignatureStructure>[] = []

    for (const key in json) {
      const value = json[key]
      const valueType = elementType(value)

      if (valueType === JsonEleType.array) {
        properties.push({
          name: key,
          type: `${handleJsonArray(value, upFirst(key))}[]`,
        })
        continue
      }

      if (valueType === JsonEleType.object) {
        properties.push({ name: key, type: handleJsonObj(value, upFirst(key)) })
        continue
      }

      properties.push({ name: key, type: typeof value })
    }

    sourceFile.addInterface({ name, properties }).setIsExported(true)

    return name
  }

  // 处理数组类型
  function handleJsonArray(json: any[], name: string): any {
    const data = json[0]
    const dataType = elementType(data)
    const baseTypes: string[] = [
      JsonEleType.string,
      JsonEleType.number,
      JsonEleType.boolean,
    ]

    if (baseTypes.includes(dataType)) return dataType

    if (dataType === JsonEleType.array) {
      return `${handleJsonArray(data, name)}[]`
    }

    return handleJsonObj(data, name)
  }

  handleJsonObj(json, interfaceName)

  return saveProject(sourceFile)
}
