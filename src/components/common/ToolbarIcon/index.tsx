import React from 'react'
import styled from 'styled-components'

import { GlobalContext } from '../../../store'

export interface IToolbarIconProps {
	type?: string
	handler: Function
	children: any
}

interface IButton {
	iconHoverColor?: string
}

// 必须用 button，不然会导致获取不到 selection
const Button = styled.button<IButton>`
	border: none;
	border-radius: 2px;
	background: #fff;
	padding: 8px;
	:focus {
		outline: 0;
	}
	:hover {
		background: #f3f3f3;
	}
	:hover svg {
		color: ${props => props.iconHoverColor};
	}
`

export default function(props: IToolbarIconProps) {
	return (
		<GlobalContext.Consumer>
			{config => (
				<Button
					onClick={props.handler as any}
					iconHoverColor={config.iconHoverColor}
					style={{ cursor: 'pointer' }}>
					{props.children}
				</Button>
			)}
		</GlobalContext.Consumer>
	)
}
