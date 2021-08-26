const jsonTypesGenerator = require('../dist')
const { promises: fs } = require('fs')
const { resolve } = require('path')

const getFileName = (name: string) => name.replace(/(\w+).json/, (_, t) => t)

async function main() {
  const dataDir = resolve('./test', 'data')
  const dirs: string[] = await fs.readdir(dataDir)

  const dataSource = dirs.map((name: string) => {
    const fileName = getFileName(name)
    return {
      data: require(resolve(dataDir, name)),
      rootInterfaceName: fileName,
      outPutPath: resolve('./test', 'output', `${fileName}.types.ts`)
    }
  })

  for (const opt of dataSource) {
    await jsonTypesGenerator.default(opt)
  }
}

main()

