import React, { useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../../store'

interface IColorPickerWrapper {
	iconHoverColor: string
}

const ColorPickerWrapper = styled.button<IColorPickerWrapper>`
	padding: 8px;
	border: none;
	background: none;
	position: relative;
	cursor: pointer;
	:focus {
		outline: 0;
	}
	:hover {
		svg {
			color: ${props => props.iconHoverColor};
		}
		background: #f3f3f3;
	}
`

const ColorPanel = styled.div`
	position: absolute;
	border: 1px solid #e3e3e3;
	background: #fff;
	width: 10em;
	padding: 0.5em;
	text-align: left;
	left: 0;
	top: 100%;
`

export interface IColorPickerProps {
	onChange: (color: string) => void
	element: any
	title: string
}

const ColorSquare = styled.span<{ color: string }>`
	width: 1em;
	height: 1em;
	margin: 0.25em;
	display: inline-block;
	border: 1px solid #e3e3e3;
	background: ${props => props.color};
`

export default function ColorPicker(props: IColorPickerProps) {
	const IconElm = props.element

	const [visible, updateVisible] = useState(false)

	return (
		<GlobalContext.Consumer>
			{config => {
				return (
					<ColorPickerWrapper
						iconHoverColor={config.iconHoverColor!}
						onClick={() => {
							updateVisible(true)
						}}
						title={props.title}
						onMouseLeave={() => {
							updateVisible(false)
						}}>
						<IconElm color={config.iconColor} size={config.iconSize} />
						{visible ? (
							<ColorPanel>
								{config.colors!.map((color, idx) => (
									<ColorSquare
										key={idx}
										color={color}
										title={color}
										onClick={() => {
											props.onChange(color)
										}}></ColorSquare>
								))}
							</ColorPanel>
						) : null}
					</ColorPickerWrapper>
				)
			}}
		</GlobalContext.Consumer>
	)
}
