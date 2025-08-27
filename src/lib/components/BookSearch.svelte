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
	class="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6 mb-8 relative z-10"
>
	<div class="mb-6 relative">
		<input
			type="text"
			class="w-full py-3 px-4 bg-white/40 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/50 border border-white/30 transition"
			placeholder="タイトル・著者・ISBNで検索"
			bind:value={$searchTerm}
		/>
		<div class="absolute right-3 top-3 text-gray-400">
			<SearchIcon />
		</div>
	</div>
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<span class="text-gray-700">並び替え:</span>
			<div class="relative">
				<button
					id="sort-dropdown-button"
					class="flex items-center space-x-2 bg-white/40 backdrop-blur-sm border border-white/30 rounded-xl py-2 pl-4 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition"
					on:click|stopPropagation={() => showSortDropdown.update((v) => !v)}
				>
					<span>{$selectedSortLabel}</span>
					<div class="transform transition-transform {$showSortDropdown ? 'rotate-180' : ''}">
						<DropdownIcon />
					</div>
				</button>
				{#if $showSortDropdown}
					<div
						id="sort-dropdown-menu"
						class="absolute left-0 top-full mt-1 w-48 bg-white/40 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg z-[100] overflow-hidden"
					>
						{#each sortOptions as option (option.value)}
							<button
								class="w-full text-left px-4 py-3 hover:bg-white/30 transition-colors {$sortBy ===
								option.value
									? 'bg-white/20 text-indigo-700'
									: 'text-gray-700'}"
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
