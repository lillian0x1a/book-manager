import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export type TabId = 'bookList' | 'addBook' | 'backupRestore';

export const activeTab: Writable<TabId> = writable('bookList');
export const isMobile: Writable<boolean> = writable(false);
