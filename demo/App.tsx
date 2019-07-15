import { REditor } from '../src'
import React from 'react'

const config = {
	icons: {
		bold: true,
		alignCenter: true,
	},
	iconSize: 24,
}

export default function App() {
	const editor1: React.RefObject<REditor> = React.useRef(null)

	return (
		<div>
			<button
				onClick={() => {
					console.log(editor1.current.getTextContent())
				}}>
				获取文本内容
			</button>
			<button
				onClick={() => {
					console.log(editor1.current.getHTMLContent())
				}}>
				获取HTML内容
			</button>
			<button
				onClick={() => {
					console.log(editor1.current.clear())
				}}>
				清空内容
			</button>
			<REditor config={config} ref={editor1} />
		</div>
	)
}
