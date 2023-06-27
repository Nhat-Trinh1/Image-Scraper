const fs = require('fs')
const path = require('path')

const source = '/'
const destination = '/Users/nhattrinh/Documents/test'

/* Takes source as input and recursively scans directories
for jpeg, jpg, png */
function scanDirectories (input) {
  /* Synchrously reads contents in dir and returns an
  array with all file names */
  const files = fs.readdirSync(input)

  /* Loops over each file in files array to check whether there
  are images to save */
  files.forEach ((item) => {
    // Creates a path by concatenating source and file name
    const filePath = path.join(input, item)
    /* Returns an object that contains info about the filePath
    including whether it is a dir or file */
    const fileType = fs.statSync(filePath)
    // Checks to see if the file is a directory
    if (fileType.isDirectory()) {
      scanDirectories(filePath) // If directory, then recursively scan
    } else {
      if (isImage(item)) { // If not dir, checks to see if image
        saveImage(filePath) // If image, then save
      }
    }
  })
}

// Checks if file is an image
function isImage (fileName) {
  // Targets ext type and saves in a variable
  const extension = path.extname(fileName).toLowerCase()
  if (extension === '.jpeg' || extension === '.jpg' || extension === '.png') {
    return true
  }
}

// Saves images to destination
function saveImage (filePath) {
  // Saves filename in variable
  const fileName = path.basename(filePath)
  const destinationPath = path.join(destination, fileName)
  const readStream = fs.createReadStream(filePath)
  const writeStream = fs.createWriteStream(destinationPath)
  readStream.pipe(writeStream)
}

scanDirectories(source)