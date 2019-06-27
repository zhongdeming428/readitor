import React from 'react'

export interface IToolbarIconProps {
	text?: string;
	type?: string;
	handler: Function;
	children: any;
}

export default function(props: IToolbarIconProps) {
	return <div onClick={props.handler as any}>
		{props.children}
	</div>
}