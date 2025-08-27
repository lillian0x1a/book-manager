import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from '@unocss/vite';
import UnoSvelte from '@unocss/svelte-scoped/vite';

export default defineConfig({
	plugins: [sveltekit(), UnoCSS(), UnoSvelte()]
});
