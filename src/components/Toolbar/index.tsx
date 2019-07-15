import React from 'react'
import { GlobalContext } from '../../store'
import styled from 'styled-components'

import icons from './icons'
import renderStrats from './renderStrats'

const ToolBarContainer = styled.div`
	border-bottom: 1px solid #e3e3e3;
`

export default function() {
	return (
		<ToolBarContainer>
			<GlobalContext.Consumer>
				{config =>
					icons.map((icon, idx) =>
						config.icons![icon.name]
							? renderStrats[icon.type](config, icon, idx)
							: null
					)
				}
			</GlobalContext.Consumer>
		</ToolBarContainer>
	)
}
