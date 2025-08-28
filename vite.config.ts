import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from '@unocss/vite';
import UnoSvelte from '@unocss/svelte-scoped/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		UnoCSS(),
		UnoSvelte(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: false, // manifest.jsonは別途作成済みのため無効化
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/example\.com\/api\/.*$/,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							networkTimeoutSeconds: 10,
							cacheableResponse: { statuses: [0, 200] }
						}
					}
				]
			},
			// 開発時もPWAを有効化する場合
			devOptions: {
				enabled: true
			}
		})
	]
});
