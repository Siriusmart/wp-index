import webpan = require("webpan");
import type { ProcessorOutputRaw } from "webpan/dist/types/processorStates";
export default class IndexProcessor extends webpan.Processor {
    build(content: Buffer | "dir"): Promise<ProcessorOutputRaw>;
    shouldRebuild(newFiles: import("webpan/dist/types/newfiles")): boolean;
}
//# sourceMappingURL=index.d.ts.map