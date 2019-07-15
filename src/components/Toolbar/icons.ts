import { commands, TextUtil } from '../../utils'
import { IOption } from '../common/Select'

import { Bold } from 'styled-icons/boxicons-regular/Bold'
import { Italic } from 'styled-icons/boxicons-regular/Italic'
import { Underline } from 'styled-icons/boxicons-regular/Underline'
import { Strikethrough } from 'styled-icons/boxicons-regular/Strikethrough'
import { DocumentDelete } from 'styled-icons/typicons/DocumentDelete'
import { SelectAll } from 'styled-icons/material/SelectAll'
import { FormatAlignLeft } from 'styled-icons/material/FormatAlignLeft'
import { FormatAlignCenter } from 'styled-icons/material/FormatAlignCenter'
import { FormatAlignRight } from 'styled-icons/material/FormatAlignRight'
import { FormatAlignJustify } from 'styled-icons/material/FormatAlignJustify'
import { FormatIndentDecrease } from 'styled-icons/material/FormatIndentDecrease'
import { FormatIndentIncrease } from 'styled-icons/material/FormatIndentIncrease'
import { Link } from 'styled-icons/boxicons-regular/Link'
import { Unlink } from 'styled-icons/boxicons-regular/Unlink'
import { FormatClear } from 'styled-icons/material/FormatClear'
import { FormatListBulleted } from 'styled-icons/material/FormatListBulleted'
import { FormatListNumbered } from 'styled-icons/material/FormatListNumbered'
import { HorizontalRule } from 'styled-icons/octicons/HorizontalRule'
import { FormatColorText } from 'styled-icons/material/FormatColorText'
import { FormatColorFill } from 'styled-icons/material/FormatColorFill'

export interface IIcon {
	name: string
	handler: Function
	element?: any
	title?: string
	data?: Array<IOption>
	type: 'btn' | 'select' | 'custom'
}

const icons: IIcon[] = [
	{
		type: 'btn',
		name: 'bold',
		handler: commands.bold,
		element: Bold,
		title: '加粗',
	},
	{
		type: 'btn',
		name: 'italic',
		handler: commands.italic,
		element: Italic,
		title: '斜体',
	},
	{
		type: 'btn',
		name: 'underline',
		handler: commands.setUnderline,
		element: Underline,
		title: '下划线',
	},
	{
		type: 'btn',
		name: 'delline',
		handler: commands.strikeThrough,
		element: Strikethrough,
		title: '删除线',
	},
	{
		type: 'btn',
		name: 'cleardoc',
		handler: () => {
			commands.selectAll()
			commands.delete()
		},
		element: DocumentDelete,
		title: '清空文档',
	},
	{
		type: 'btn',
		name: 'selectAll',
		handler: commands.selectAll,
		element: SelectAll,
		title: '全选',
	},
	{
		type: 'btn',
		name: 'alignLeft',
		handler: commands.setTextLeft,
		element: FormatAlignLeft,
		title: '左对齐',
	},
	{
		type: 'btn',
		name: 'alignCenter',
		handler: commands.setTextCtr,
		element: FormatAlignCenter,
		title: '居中对齐',
	},
	{
		type: 'btn',
		name: 'alignRight',
		handler: commands.setTextRight,
		element: FormatAlignRight,
		title: '右对齐',
	},
	{
		type: 'btn',
		name: 'alignFull',
		handler: commands.setTextFull,
		element: FormatAlignJustify,
		title: '两端对齐',
	},
	{
		type: 'btn',
		name: 'indent',
		handler: commands.setIndent,
		element: FormatIndentIncrease,
		title: '缩进',
	},
	{
		type: 'btn',
		name: 'outdent',
		handler: commands.setOutdent,
		element: FormatIndentDecrease,
		title: '减少缩进',
	},
	{
		type: 'btn',
		name: 'link',
		handler: () => {
			const url = window.prompt('请输入链接地址：') || ''
			commands.createLink(url)
		},
		element: Link,
		title: '添加链接',
	},
	{
		type: 'btn',
		name: 'unlink',
		handler: commands.unlink,
		element: Unlink,
		title: '取消链接',
	},
	{
		type: 'btn',
		name: 'removeformat',
		handler: commands.removeFormat,
		element: FormatClear,
		title: '移除格式',
	},
	{
		type: 'btn',
		name: 'unorderedlist',
		handler: commands.insertUL,
		element: FormatListBulleted,
		title: '无序列表',
	},
	{
		type: 'btn',
		name: 'orderedlist',
		handler: commands.insertOL,
		element: FormatListNumbered,
		title: '有序列表',
	},
	{
		type: 'select',
		name: 'pformat',
		handler: (val: any) => {
			commands.setFontSize(+val)
		},
		title: '段落格式',
		data: [
			{ name: '段落', value: '1', default: true },
			{ name: '标题1', value: '2' },
			{ name: '标题2', value: '3' },
			{ name: '标题3', value: '4' },
			{ name: '标题4', value: '5' },
			{ name: '标题5', value: '6' },
			{ name: '标题6', value: '7' },
		],
	},
	{
		type: 'select',
		name: 'fontsize',
		handler: (val: string) => {
			TextUtil.setFontSize(val)
		},
		title: '字体大小',
		data: [
			{ name: '11px', value: 11 },
			{ name: '12px', value: 12 },
			{ name: '14px', value: 14 },
			{ name: '16px', value: 16, default: true },
			{ name: '18px', value: 18 },
			{ name: '20px', value: 20 },
			{ name: '22px', value: 22 },
			{ name: '24px', value: 24 },
			{ name: '26px', value: 26 },
			{ name: '28px', value: 28 },
			{ name: '30px', value: 30 },
		],
	},
	{
		type: 'btn',
		name: 'insertHr',
		handler: commands.insertHR,
		element: HorizontalRule,
		title: '分割线',
	},
	{
		type: 'custom',
		name: 'setForeColor',
		handler: (color: string) => {
			commands.setFontColor(color)
		},
		element: FormatColorText,
		title: '字体颜色',
	},
	{
		type: 'custom',
		name: 'setBackColor',
		handler: (color: string) => {
			commands.backColor(color)
		},
		element: FormatColorFill,
		title: '设置背景色',
	},
]

export default icons
