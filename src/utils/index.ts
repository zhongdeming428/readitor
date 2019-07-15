/*
 * @Author: Russ Zhong
 * @Date: 2019-06-28 10:30:01
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-07-02 09:55:37
 */

import * as TextUtil from './TextOperation'

export const isObject = (obj: any): boolean =>
	Object.prototype.toString.call(obj) === '[object Object]'

export const isArray = (obj: any): boolean =>
	Object.prototype.toString.call(obj) === '[object Array]'

/**
 * 配置合并函数
 * @param baseConfig 预设配置对象
 * @param newConfig 用户定义的配置对象
 */
export function mergeConfig<T>(baseConfig: T, newConfig: T): T {
	if (!newConfig) return baseConfig
	let keys = Object.keys(newConfig) as Array<keyof T>
	keys.forEach((key: keyof T) => {
		if (key in baseConfig && baseConfig[key] !== newConfig[key]) {
			if (isObject(baseConfig[key]))
				baseConfig[key] = mergeConfig(baseConfig[key], newConfig[key])
			else if (isArray(baseConfig[key])) {
				baseConfig[key] = ([
					...(baseConfig[key] as any),
					...(newConfig[key] as any),
				] as any).reduce((acc: any[], next: any) => {
					if (!acc.includes(next)) acc.push(next)
					return acc
				}, [])
			} else {
				baseConfig[key] = newConfig[key]
			}
		}
	})
	return baseConfig
}

export { default as commands } from './commands'

export { eventsType, default as eventbus } from './eventbus'

export { TextUtil }
