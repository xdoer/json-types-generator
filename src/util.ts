import { Project, SourceFile } from 'ts-morph'
import { join } from 'path'
import { SemicolonPreference } from 'typescript'

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
    semicolons: SemicolonPreference.Remove,
  })
  return sourceFile.save()
}
