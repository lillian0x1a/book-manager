import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
	presets: [presetUno()],
	// その他の設定
	theme: {
		colors: {
			primary: '#3b82f6'
		}
	}
});
