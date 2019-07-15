/*
 * @Author: Russ Zhong
 * @Date: 2019-06-28 14:16:55
 * @Last Modified by:   Russ Zhong
 * @Last Modified time: 2019-06-28 14:16:55
 */

import { isObject, isArray, mergeConfig } from '../src/utils'

describe('isObject', () => {
	test('{} is a object', () => {
		expect(isObject({})).toEqual(true)
	})
	test('Object() is a object', () => {
		expect(isObject(Object())).toEqual(true)
	})
	test('[] is not a object', () => {
		expect(isObject([])).toEqual(false)
	})
	test('Number() is not a object', () => {
		expect(isObject(Number(12))).toEqual(false)
	})
	test('Symbol() is not a object', () => {
		expect(isObject(Symbol())).toEqual(false)
	})
	test('Function is not a object', () => {
		expect(isObject(function() {})).toEqual(false)
	})
})

describe('isArray', () => {
	test('[] is array', () => {
		expect(isArray([])).toEqual(true)
	})
	test('Array() is array', () => {
		expect(isArray(Array())).toEqual(true)
	})
	test('ArrayLike Object is not array', () => {
		expect(
			isArray({
				length: 1,
				'0': 12,
			})
		).toEqual(false)
	})
	test('{} is not array', () => {
		expect(isArray({})).toEqual(false)
	})
})

describe('mergeConfig', () => {
	let baseConfig = {
			/**
			 * string
			 */
			name: 'Russ',
			/**
			 * number
			 */
			age: 22,
			/**
			 * boolean
			 */
			isGraduated: true,
			/**
			 * function
			 */
			getName() {
				return this.name
			},
			/**
			 * array
			 */
			arr: [1, 2, 3],
			/**
			 * object
			 */
			obj: {
				str: '123',
				num: 123,
			},
		},
		newConfig = {
			name: 'Zhong',
			age: 18,
			isGraduated: false,
			getName() {
				return this.name
			},
			arr: [1, 4, 5],
			propOnlyonNew: true,
			obj: {
				str: '456',
				num: 456,
				propNotExist: true,
			},
		},
		res = mergeConfig(baseConfig, newConfig)
	test('merge primitive values', () => {
		const { name, age, isGraduated, propOnlyonNew } = res
		expect(name).toEqual('Zhong')
		expect(age).toEqual(18)
		expect(isGraduated).toEqual(false)
		expect(res.getName()).toEqual('Zhong')
		expect(propOnlyonNew).toBeUndefined()
	})

	test('merge arrays', () => {
		const { arr } = res
		expect(arr).toEqual(expect.arrayContaining([1, 4, 5, 2, 3]))
		expect(arr).toHaveLength(5)
	})

	test('merge object', () => {
		const { obj } = res
		expect(obj.str).toEqual('456')
		expect(obj.num).toEqual(456)
		expect(obj.propNotExist).toBeUndefined()
	})

	test('return self if newConfig not exist', () => {
		const config = mergeConfig(baseConfig)
		expect(config).toEqual(baseConfig)
		expect(config === baseConfig).toEqual(true)
	})
})
