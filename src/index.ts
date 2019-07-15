/*
 * @Author: Russ Zhong
 * @Date: 2019-06-28 14:32:46
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-07-01 16:12:40
 * 入口文件，负责导出接口
 */

import { eventsType, eventbus } from './utils'

// 注册事件
eventbus.subscribe(eventsType.BEFORE_CHANGE, () => {
	console.log('内容即将更改！')
})

eventbus.subscribe(eventsType.AFTER_CHANGE, () => {
	console.log('内容已经更改！')
})

export { REditor } from './REditor'

export { IConfig } from './config'
