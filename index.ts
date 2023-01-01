const currentDir = Deno.readDirSync(".");

for (const entry of currentDir) {
  if (entry.isDirectory) {
    const fileName = entry.name;
    const renamedFile = fileName + "1";
    if (fileName === ".git") {
      continue;
    }

    Deno.run({
      cmd: ["git", "mv", fileName, renamedFile],
      stdout: "piped",
      stderr: "piped",
    });
    Deno.run({
      cmd: ["git", "mv", renamedFile, fileName.toLowerCase()],
      stdout: "piped",
      stderr: "piped",
    });
  }
}
