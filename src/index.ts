import { OptionalKind, PropertySignatureStructure, Project } from 'ts-morph'
import { upFirst, getName, is } from './utils'

const project = new Project({ useInMemoryFileSystem: true })
const sourceFile = project.createSourceFile('index.ts', undefined, { overwrite: true })

function getProperties(data: any): any {
  const properties: OptionalKind<PropertySignatureStructure>[] = []

  for (const key in data) {
    const _value = data[key]
    const _key = key

    switch (is(_value)) {
      case 'string':
      case 'number':
      case 'boolean':
        properties.push({ name: _key, type: is(_value) })
        continue
      case 'null':
      case 'undefined':
        properties.push({ name: _key, type: 'any' })
        continue
      case 'array':
        properties.push({ name: _key, type: `${upFirst(_key)}[]` })
        addType(_value[0], upFirst(_key), true)
        continue
      default:
        properties.push({ name: _key, type: upFirst(_key) })
        addType(_value, upFirst(_key))
    }
  }

  return properties
}

function addType(data: any, baseName = 'Result', isArray = false) {
  switch (is(data)) {
    case 'string':
    case 'number':
    case 'boolean':
      sourceFile
        .addTypeAlias({ name: baseName, type: `${is(data)}${isArray ? '[]' : ''}` })
        .setIsExported(true)
      break
    case 'undefined':
    case 'null':
      sourceFile
        .addTypeAlias({ name: baseName, type: `any${isArray ? '[]' : ''}` })
        .setIsExported(true)
      break
    case 'array':
      addType(data[0], baseName, true)
      break
    default:
      if (isArray) {
        const name = upFirst(getName())
        sourceFile.addTypeAlias({ name: baseName, type: name }).setIsExported(true)
        sourceFile.addInterface({ name: name, properties: getProperties(data) }).setIsExported(true)
      } else {
        sourceFile
          .addInterface({ name: baseName, properties: getProperties(data) })
          .setIsExported(true)
      }
  }
}

export default function main(data: any, name = 'Result') {
  addType(data, name, Array.isArray(data))
  return sourceFile.getSourceFile().getText(true)
}
