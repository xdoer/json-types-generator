import { OptionalKind, PropertySignatureStructure } from 'ts-morph'
import { createProject, saveProject, upFirst, elementType, formatName } from './util'
import { JsonEleType } from './enum'
import { Opt, PassOptions } from './types'

export type Options = Opt

const baseTypes: string[] = [JsonEleType.string, JsonEleType.number, JsonEleType.boolean]

export default function (opt: Opt) {
  const { data, outPutPath, rootInterfaceName, customInterfaceName, overwrite } = opt
  const baseData = elementType(data) === JsonEleType.string ? JSON.parse(data as string) : data
  const baseDataType = elementType(baseData)

  if (baseTypes.includes(baseDataType) || baseDataType === JsonEleType.null) return Promise.resolve()

  const sourceFile = createProject(outPutPath, overwrite)
  const passOptions: PassOptions = {
    data: baseData,
    name: rootInterfaceName,
    sourceFile,
    customInterfaceName,
  }

  baseDataType === JsonEleType.array ? handleJsonArray(passOptions) : handleJsonObj(passOptions)

  return saveProject(sourceFile)
}

function handleJsonObj(opt: PassOptions) {
  const { data, name, sourceFile, customInterfaceName } = opt
  const properties: OptionalKind<PropertySignatureStructure>[] = []

  for (const key in data) {
    const value = data[key]
    const valueType = elementType(value)
    const interfaceType = customInterfaceName?.(key, value, data) || upFirst(key)

    if (valueType === JsonEleType.array) {
      properties.push({
        name: key,
        type: `${handleJsonArray({ ...opt, data: value, name: interfaceType })}[]`,
      })
      continue
    }

    if (valueType === JsonEleType.object) {
      properties.push({ name: key, type: handleJsonObj({ ...opt, data: value, name: interfaceType }) })
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

function handleJsonArray(opt: PassOptions): string {
  const data = opt.data[0]
  const dataType = elementType(data)

  if (dataType === JsonEleType.null) return 'any'

  if (baseTypes.includes(dataType)) return dataType

  if (dataType === JsonEleType.array) return `${handleJsonArray({ ...opt, data })}[]`

  return handleJsonObj({ ...opt, data })
}
