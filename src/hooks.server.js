// src/hooks.server.js
export function handle({ event, resolve }) {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles');
		}
	});
}
