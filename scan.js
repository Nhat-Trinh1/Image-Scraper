const fs = require('fs')
const path = require('path')

const source = '/Users/nhattrinh/Desktop'
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

// Renames images and saves them to destination
let counter = 1
function saveImage (filePath) {
  //Create a standardized name for image and saves it into fileName
  const fileExt = path.extname(filePath)
  const fileName = `image${counter}${fileExt}`
  counter++
  //Creates a destinationPath by joining destination and fileName
  const destinationPath = path.join(destination, fileName)
  //Creates a readable stream from a source
  const readStream = fs.createReadStream(filePath)
  //Creates a writeable stream in the destination
  const writeStream = fs.createWriteStream(destinationPath)
  //Allows the images to be saved in test folder
  readStream.pipe(writeStream)
}

scanDirectories(source)
