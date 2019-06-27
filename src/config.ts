/**
 * configs which icon to show
 */

export interface IConfig {
	icons: {
		[iconName: string]: boolean
	}
}

const config: IConfig = {
	icons: {
		bold: true
	}
}

export default config