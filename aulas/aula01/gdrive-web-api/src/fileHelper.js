import fs from 'fs'
import prettyBytes from 'pretty-bytes'
export default class FileHelper {
 static async getFileStatus(downloadsFolder) {
  const currFiles = await fs.promises.readdir(downloadsFolder)
 
  const status = await Promise
    .all(currFiles
    .map(file => fs.promises
    .stat(`${downloadsFolder}/${file}`)))

    const fileStatus = []

    for(const fileIndex in currFiles) {
      const {birthtime, size} = status[fileIndex]

      fileStatus.push({
        size: prettyBytes(size),
        file: currFiles[fileIndex],
        lastModified: birthtime,
        owner: process.env.USER

      })
    }

    return fileStatus
 }
}