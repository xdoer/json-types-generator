import { Project, SourceFile, ts } from 'ts-morph'
import { join } from 'path'

export const elementType = (ele: any) => {
  const typeStr = Object.prototype.toString.call(ele)
  const reg = /^\[object\s([A-Za-z]+)\]$/
  reg.test(typeStr)
  return RegExp.$1.toLowerCase()
}

export const upFirst = (value: string) => value.replace(/^[a-z]/, (t) => t.toUpperCase())

export const createProject = (filePath: string) => {
  const project = new Project()
  const outPath = join(filePath)
  return project.createSourceFile(outPath, undefined, { overwrite: true })
}

export const saveProject = (sourceFile: SourceFile) => {
  sourceFile.formatText({
    indentSize: 2,
    semicolons: ts.SemicolonPreference.Remove,
  })
  return sourceFile.save()
}

// 以数字开头的名称，统一加下划线
export const formatName = (name: string) => name.replace(/^\d/, (_) => `_${_}`).replace(/-/, '_')
