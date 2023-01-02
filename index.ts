const currentDir = Deno.readDirSync(".");

for (const entry of currentDir) {
  if (entry.isDirectory) {
    const fileName = entry.name;

    const lowerCaseFileName = [...fileName]
      .map((letter, index) => {
        if (index === 0) {
          return letter.toLowerCase();
        }
        if (letter === letter.toUpperCase()) {
          return "-" + letter.toLowerCase();
        }
        return letter.toLowerCase();
      })
      .join("");

    const renamedFile = fileName + "1";

    if (fileName === ".git") {
      continue;
    }

    const rename = Deno.run({
      cmd: ["git", "mv", fileName, renamedFile],
    });
    await rename.status();

    const correctName = Deno.run({
      cmd: ["git", "mv", renamedFile, lowerCaseFileName],
    });
    await correctName.status();
  }
}
