<script lang="ts">
	import {
		searchTerm,
		sortBy,
		showSortDropdown,
		selectedSortLabel,
		sortOptions
	} from '$lib/stores/bookUI';
	import { DropdownIcon, SearchIcon } from '$lib/components/icons';

	// ドロップダウンの選択処理
	function selectSortOption(value: 'title' | 'author' | 'publishedDate') {
		sortBy.set(value);
		showSortDropdown.set(false);
	}

	// ドロップダウン外をクリックしたときに閉じる処理
	function handleOutsideClick(event: MouseEvent) {
		const dropdownButton = document.getElementById('sort-dropdown-button');
		const dropdownMenu = document.getElementById('sort-dropdown-menu');
		if (
			dropdownButton &&
			dropdownMenu &&
			!dropdownButton.contains(event.target as Node) &&
			!dropdownMenu.contains(event.target as Node)
		) {
			showSortDropdown.set(false);
		}
	}

	// ドロップダウン表示時は外側クリックイベントを追加
	$: if ($showSortDropdown) {
		if (typeof document !== 'undefined') {
			document.addEventListener('click', handleOutsideClick);
		}
	} else {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', handleOutsideClick);
		}
	}
</script>

<section
	class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6 mb-8 relative z-10"
>
	<div class="mb-6 relative">
		<input
			type="text"
			class="w-full py-3.5 px-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 border border-white/40 dark:border-gray-600/40 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
			placeholder="タイトル・著者・ISBNで検索"
			bind:value={$searchTerm}
		/>
		<div class="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400">
			<SearchIcon />
		</div>
	</div>

	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<span class="text-gray-700 dark:text-gray-300 font-medium">並び替え:</span>
			<div class="relative">
				<button
					id="sort-dropdown-button"
					class="flex items-center space-x-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl py-2.5 pl-4 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 transition-all duration-200 hover:bg-white/60 dark:hover:bg-gray-700/60"
					on:click|stopPropagation={() => showSortDropdown.update((v) => !v)}
				>
					<span class="text-gray-900 dark:text-gray-100">{$selectedSortLabel}</span>
					<div
						class="transform transition-transform duration-200 {$showSortDropdown
							? 'rotate-180'
							: ''}"
					>
						<DropdownIcon class="text-gray-600 dark:text-gray-400" />
					</div>
				</button>

				{#if $showSortDropdown}
					<div
						id="sort-dropdown-menu"
						class="absolute left-0 top-full mt-2 w-52 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-white/30 dark:border-gray-700/30 shadow-xl z-[100] overflow-hidden py-1"
					>
						{#each sortOptions as option (option.value)}
							<button
								class="w-full text-left px-4 py-3 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-150 {$sortBy ===
								option.value
									? 'bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium'
									: 'text-gray-700 dark:text-gray-300'}"
								on:click|stopPropagation={() => selectSortOption(option.value)}
							>
								{option.label}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
