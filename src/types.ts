export type CommonObj = Record<string, any>

export interface Opt {
  data: string | CommonObj | CommonObj[]
  rootInterfaceName: string
  outPutPath: string
  customInterfaceName?(key: string, value: CommonObj, data: CommonObj): string | void
}
