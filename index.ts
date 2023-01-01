const currentDir = Deno.readDirSync(".");

for (const entry of currentDir) {
  if (entry.isDirectory) {
    const fileName = entry.name;
    const renamedFile = fileName + "1";

    Deno.run({
      cmd: ["git", "mv", fileName, renamedFile],
    });
    Deno.run({
      cmd: ["git", "mv", renamedFile, fileName.toLowerCase()],
    });
  }
}
