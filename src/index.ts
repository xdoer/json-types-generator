import { OptionalKind, PropertySignatureStructure } from 'ts-morph'
import { createProject, saveProject, upFirst, elementType, formatName } from './util'
import { JsonEleType } from './enum'
import { CommonObj, Opt } from './types'

export type Options = Opt

export default function (opt: Opt) {
  const { data, outPutPath, rootInterfaceName, customInterfaceName } = opt
  const sourceFile = createProject(outPutPath)

  const baseData = elementType(data) === JsonEleType.string ? JSON.parse(data as string) : data
  const baseDataType = elementType(baseData)

  baseDataType === JsonEleType.array ? handleJsonArray(baseData, rootInterfaceName) : handleJsonObj(baseData, rootInterfaceName)

  function handleJsonObj(json: CommonObj, name: string) {
    const properties: OptionalKind<PropertySignatureStructure>[] = []

    if (elementType(json) === JsonEleType.null) return ''

    for (const key in json) {
      const value = json[key]
      const valueType = elementType(value)
      const interfaceType = customInterfaceName?.(key, value, json) || upFirst(key)

      if (valueType === JsonEleType.array) {
        properties.push({
          name: key,
          type: `${handleJsonArray(value, interfaceType)}[]`,
        })
        continue
      }

      if (valueType === JsonEleType.object) {
        properties.push({ name: key, type: handleJsonObj(value, interfaceType) })
        continue
      }

      if (valueType === JsonEleType.null) {
        properties.push({ name: key, type: 'any' })
        continue
      }

      properties.push({ name: key, type: elementType(value) })
    }

    sourceFile.addInterface({ name: formatName(name), properties }).setIsExported(true)

    return formatName(name)
  }

  function handleJsonArray(json: any[], name: string): string {
    const data = json[0]
    const dataType = elementType(data)
    const baseTypes: string[] = [JsonEleType.string, JsonEleType.number, JsonEleType.boolean]

    if (baseTypes.includes(dataType)) return dataType

    if (dataType === JsonEleType.array) return `${handleJsonArray(data, name)}[]`

    return handleJsonObj(data, name)
  }

  return saveProject(sourceFile)
}
