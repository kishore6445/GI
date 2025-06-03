const fs = require("fs")
const path = require("path")

// Function to search for font imports in files
function searchForFontImports(dir, fileTypes = [".js", ".jsx", ".ts", ".tsx", ".css"]) {
  const results = []

  function searchDir(currentDir) {
    const files = fs.readdirSync(currentDir)

    for (const file of files) {
      const filePath = path.join(currentDir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        searchDir(filePath)
      } else if (fileTypes.includes(path.extname(file))) {
        const content = fs.readFileSync(filePath, "utf8")
        if (content.includes("fonts.googleapis.com")) {
          results.push({
            file: filePath,
            line: content.split("\n").findIndex((line) => line.includes("fonts.googleapis.com")) + 1,
          })
        }
      }
    }
  }

  searchDir(dir)
  return results
}

// Search for font imports in the project
const projectRoot = process.cwd()
const fontImports = searchForFontImports(projectRoot)

if (fontImports.length > 0) {
  console.log("Found font imports in the following files:")
  fontImports.forEach(({ file, line }) => {
    console.log(`${file}:${line}`)
  })
} else {
  console.log("No direct font imports found.")
}
