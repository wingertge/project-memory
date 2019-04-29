import {getBundles} from "react-loadable/webpack"
// @ts-ignore
import stats from "../../build/react-loadable.json"
import proc from "./env"

export const getBundleScripts = (modules: string[]) => {
    const bundles = getBundles(stats as any, modules)
    const chunks = bundles.filter(bundle => bundle.file.endsWith(".js"))

    if(proc.env.NODE_ENV === "production") {
        return chunks.map(chunk => `<script src=/${chunk.file}></script>`).join("\n")
    } else {
        return chunks.map(chunk => `<script src="http://${process.env.HOST}:${parseInt(proc.env.PORT!, 10) + 1}/${chunk.file}"></script>`).join("\n")
    }
}
