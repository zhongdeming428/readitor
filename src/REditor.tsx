import React from 'react'
import Toolbar from './components/Toolbar'
import styled from 'styled-components'
import config, { IConfig } from './config'

export interface IREditorProps {
  width?: string;
	height?: string;
	config?: IConfig;
}

const Div = styled.div`
	width: 50vw;
	height: 50vw;
	border: 1px solid #e3e3e3;
	:focus {
		outline: 0;
	}
`

export function REditor(props: IREditorProps) {
	return <div>
		<Toolbar/>
		<Div contentEditable/>
	</div>
}