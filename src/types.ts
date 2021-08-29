import { SourceFile } from 'ts-morph'

export type CommonObj = Record<string, any>

export type CustomInterfaceName = (key: string, value: CommonObj, data: CommonObj) => string | void

export interface Opt {
  data: string | CommonObj | CommonObj[]
  rootInterfaceName: string
  outPutPath: string
  overwrite?: boolean
  customInterfaceName?: CustomInterfaceName
}

export interface PassOptions {
  data: CommonObj
  name: string
  sourceFile: SourceFile
  customInterfaceName?: CustomInterfaceName
}
