const fs = require("fs")
const path = require("path")

// Function to patch font imports in files
function patchFontImports(dir, fileTypes = [".js", ".jsx", ".ts", ".tsx", ".css"]) {
  const results = []

  function patchDir(currentDir) {
    const files = fs.readdirSync(currentDir)

    for (const file of files) {
      const filePath = path.join(currentDir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        patchDir(filePath)
      } else if (fileTypes.includes(path.extname(file))) {
        const content = fs.readFileSync(filePath, "utf8")

        // Check if the file contains a font import
        if (content.includes("fonts.googleapis.com")) {
          // Create a backup of the original file
          fs.writeFileSync(`${filePath}.bak`, content)

          // Remove or comment out the font import
          const newContent = content
            .split("\n")
            .map((line) => {
              if (line.includes("fonts.googleapis.com")) {
                return `// REMOVED FONT IMPORT: ${line}`
              }
              return line
            })
            .join("\n")

          // Write the updated content back to the file
          fs.writeFileSync(filePath, newContent)

          results.push({
            file: filePath,
            status: "patched",
          })
        }
      }
    }
  }

  patchDir(dir)
  return results
}

// Patch font imports in the project
const projectRoot = process.cwd()
const patchedFiles = patchFontImports(projectRoot)

if (patchedFiles.length > 0) {
  console.log("Patched font imports in the following files:")
  patchedFiles.forEach(({ file, status }) => {
    console.log(`${file}: ${status}`)
  })
} else {
  console.log("No files needed patching.")
}
