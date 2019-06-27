import React from 'react'
import ToolbarIcon from '../ToolbarIcon'
import { Bold } from 'styled-icons/boxicons-regular/Bold'

export default function() {
  return <div>
		<ToolbarIcon handler={() => {document.execCommand('bold')}} text="加粗">
			<Bold size={24} color="#e3e3e3" title="加粗"/>
		</ToolbarIcon>
	</div>
}