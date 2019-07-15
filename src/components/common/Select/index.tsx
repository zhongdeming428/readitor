import React, { useState } from 'react'
import styled from 'styled-components'
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow'

const SelectWrapper = styled.button`
	display: inline-block;
	position: relative;
	cursor: pointer;
	padding: 0.2em 0;
	margin-top: 6px;
	height: 24px;
	box-sizing: border-box;
	background: #fff;
	border: none;
	:focus {
		outline: 0;
	}
`

export interface IOption {
	name: string
	value: string | number
	default?: boolean
}

export interface ISelectProps {
	options: Array<IOption>
	onChange: Function
	title: string
}

const selectStyle = {
	height: '100%',
	padding: '0 .5em',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

interface IOptionElm {
	selected: boolean
}

const Option = styled.div<IOptionElm>`
	background: ${props => (props.selected ? '#f3f3f3' : '#fff')};
	color: ${props => (props.selected ? '#000' : '#000')};
	width: 100%;
	text-align: left;
	box-sizing: border-box;
	padding: 0.5em 0.3em;
	:hover {
		background: #f3f3f3;
	}
`

const OptionWrapper = styled.div`
	position: absolute;
	top: 100%;
	width: 135%;
	border: 1px solid #e3e3e3;
	border-radius: 2px;
	left: 0;
`

export default function Select(props: ISelectProps) {
	const [visible, toggle] = useState(false),
		[selectedOpt, updateSelectedOpt] = useState(
			props.options.find(opt => !!opt.default)
		),
		[selectedVal, updateSelectedVal] = useState(selectedOpt!.value)

	return (
		<SelectWrapper
			title={props.title}
			onMouseLeave={() => {
				toggle(false)
			}}
			onClick={() => {
				toggle(!visible)
			}}>
			<div style={selectStyle}>
				<span style={{ padding: '0 1em 0 0' }}>{selectedOpt!.name}</span>
				<DownArrow color="#666" size="8" />
			</div>
			{visible ? (
				<OptionWrapper>
					{props.options.map((opt, idx) => {
						return (
							<Option
								key={idx}
								selected={selectedVal === opt.value}
								onClick={() => {
									updateSelectedOpt(opt)
									updateSelectedVal(opt.value)
									props.onChange(opt.value)
								}}>
								{opt.name}
							</Option>
						)
					})}
				</OptionWrapper>
			) : null}
		</SelectWrapper>
	)
}
