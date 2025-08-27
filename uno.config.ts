import { defineConfig } from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
// import presetSvelte from '@unocss/preset-svelte';

export default defineConfig({
	presets: [presetAttributify(), presetUno() /* presetSvelte.default()*/],
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
