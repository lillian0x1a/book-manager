import type { Writable } from 'svelte/store';

export function useScreenSize(store: Writable<boolean>) {
	const checkScreenSize = (): void => {
		store.set(window.innerWidth < 768);
	};

	return {
		checkScreenSize
	};
}
