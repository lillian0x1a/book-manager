export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles');
		}
	});

	return response;
}
