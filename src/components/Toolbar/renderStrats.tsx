import React from 'react'
import { IConfig } from '../../config'
import { IIcon } from './icons'

import ToolbarIcon from '../../components/common/ToolbarIcon'
import Select from '../../components/common/Select'
import ColorPicker from '../../components/common/ColorPicker'

export default {
	btn: (config: IConfig, icon: IIcon, idx: number) => (
		<ToolbarIcon key={idx} handler={icon.handler}>
			<icon.element
				size={config.iconSize}
				color={config.iconColor}
				title={icon.title}
			/>
		</ToolbarIcon>
	),
	select: (config: IConfig, icon: IIcon, idx: number) => (
		<Select
			key={idx}
			onChange={icon.handler}
			title={icon.title || ''}
			options={icon.data || []}
		/>
	),
	custom: (config: IConfig, icon: IIcon, idx: number) => (
		<ColorPicker
			title={icon.title || ''}
			key={idx}
			onChange={icon.handler as any}
			element={icon.element}
		/>
	),
}
