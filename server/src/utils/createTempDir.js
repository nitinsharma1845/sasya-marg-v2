import fs from "fs"
import path from "path"

const tempDir = path.join(process.cwd(), "public", "temp")

fs.mkdirSync(tempDir, { recursive: true })