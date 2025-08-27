import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
	presets: [
		presetAttributify(), // 属性ベースのユーティリティを有効化
		presetUno() // デフォルトのユーティリティを有効化
	],
	theme: {
		extend: {
			fontFamily: {
				apple: [
					'-apple-system',
					'SF Pro Text',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'sans-serif'
				]
			}
		}
	}
});
