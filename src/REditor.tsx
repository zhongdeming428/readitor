/*
 * @Author: Russ Zhong
 * @Date: 2019-06-28 14:33:15
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-07-09 09:56:23
 * 编辑器组件入口
 */

import React from 'react'
import Toolbar from './components/Toolbar'
import styled from 'styled-components'
import { GlobalContext } from './store'
import _config, { IConfig } from './config'
import { mergeConfig, TextUtil } from './utils'
import InjectApi, { IApis } from './apis'

export interface IREditorProps {
	width?: string
	height?: string
	config?: IConfig
}

const Div = styled.div<{ width: string }>`
	width: ${props => props.width};
	margin: 0 auto;
	border: 1px solid #e3e3e3;
	font-size: 16px;
	div:focus {
		outline: 0;
	}
`

const EditorContent = styled.div<{ height: string }>`
	height: ${props => props.height};
	overflow-y: auto;
	padding: 1em;
	p {
		padding: 0;
		margin: 0;
	}
`

let i = 0

@InjectApi
class REditor extends React.Component<IREditorProps, {}> implements IApis {
	public _uid: string
	public editor: React.RefObject<HTMLDivElement>
	public config: IConfig

	constructor(props: IREditorProps) {
		super(props)
		this.editor = React.createRef()
		this.config = mergeConfig(_config, this.props.config)!
		this._uid = 'reditor__content__panel__' + i++
	}

	componentDidMount() {
		if (this.config.autoFocus) {
			// get focus manully: https://stackoverflow.com/a/37162116
			setTimeout(() => {
				this.editor.current!.focus()
				focusHandler(this.editor)
			}, 0)
		} else {
			blurHandler(this.editor)
		}
	}

	render() {
		return (
			<Div width={this.props.width || '750px'}>
				<GlobalContext.Provider value={this.config}>
					<Toolbar />
					<EditorContent
						height={this.props.height || '420px'}
						ref={this.editor}
						contentEditable
						id={this._uid}
						suppressContentEditableWarning={true}
						onFocus={() => {
							focusHandler(this.editor)
						}}
						onBlur={() => {
							blurHandler(this.editor)
						}}
						onKeyUp={TextUtil.replaceDivWithP(this.editor) as any}>
						<p>
							<br />
						</p>
					</EditorContent>
				</GlobalContext.Provider>
			</Div>
		)
	}

	public clear: () => void
	public getTextContent: () => string
	public getHTMLContent: () => string
	public beforeChange: (cb: Function) => void
	public afterChange: (cb: Function) => void
}

function focusHandler(editor: React.RefObject<HTMLDivElement>) {
	let placeholder = editor.current!.getElementsByClassName(
		'reditor__content__placeholder'
	)[0]
	if (placeholder) {
		editor.current!.removeChild(placeholder)
		editor.current!.innerHTML = '<p><br/></p>'
	}
}

function blurHandler(editor: React.RefObject<HTMLDivElement>) {
	let initialHtml = '<p><br></p>'
	if (editor.current!.innerHTML === initialHtml) {
		editor.current!.innerHTML = `<p class="reditor__content__placeholder" style="color: #555">${_config.placeholder}</p>`
	}
}

export { REditor }
