"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webpan = require("webpan");
const escape = require("escape-html");
class IndexProcessor extends webpan.Processor {
    async build(content) {
        if (content !== "dir") {
            throw new Error("Bad rule: wp-index can only be used on directories.");
        }
        let files = new Set();
        // files in this current folder
        for (const fileProcs of this.files({ include: path.join(this.filePath(), "/*"), exclude: path.join(this.filePath(), "/*/**") }).values()) {
            for (const procSet of fileProcs.procs().values()) {
                for (const proc of procSet.values()) {
                    if (proc.equals(this))
                        continue;
                    let res = await proc.getResult();
                    res.files.values().map(s => escape(s.slice(this.filePath().length))).forEach(s => files.add(s));
                }
            }
        }
        // index files of subfolders
        for (const fileProcs of this.files({ include: path.join(this.filePath(), "/*/**"), exclude: path.join(this.filePath(), "/*/*/**") }).values()) {
            for (const procSet of fileProcs.procs().values()) {
                for (const proc of procSet.values()) {
                    let res = await proc.getResult();
                    res.files.values().filter(s => path.basename(s) === "index.html")
                        .map(s => escape(s.substring(this.filePath().length)))
                        .forEach(s => files.add(s));
                }
            }
        }
        let html = `<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Directory listing for ${this.filePath()}</title>
</head>
<body>
<h1>Directory listing for ${this.filePath()}</h1>
<hr>
<ul>
${Array.from(files)
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .map((s) => `<li><a href="${s}">${s}</a></li>`)
            .join('\n')}
</ul>
<hr>
</body>
</html>`;
        return {
            relative: new Map([[path.join(this.filePath(), "index.html"), html]]),
        };
    }
    shouldRebuild(newFiles) {
        return newFiles.files({ include: path.join(this.filePath(), "**") }).size !== 0;
    }
}
exports.default = IndexProcessor;
//# sourceMappingURL=index.js.map