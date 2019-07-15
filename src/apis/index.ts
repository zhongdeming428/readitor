import { REditor } from '../REditor'

import * as apis from './apis'

export default function InjectApi(REditorFunc: Function & typeof REditor) {
	Object.assign(REditorFunc.prototype, apis)
}

export { IApis } from './apis'
