<script lang="ts">
	import { InfoIcon, CloseIcon } from '$lib/components/icons';
	import type { Book } from '$lib/types';

	export let show: boolean;
	export let onConfirm: () => void;
	export let onCancel: () => void;
	export let importedData: Book[] | null = null;
	export let fileName: string | null = null;
</script>

{#if show}
	<div
		class="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
	>
		<div
			class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl w-full max-w-md transform transition-all p-6"
		>
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
					<InfoIcon class="text-yellow-500 dark:text-yellow-400 mr-2.5 w-5 h-5" />
					データの上書き確認
				</h2>
				<button
					on:click={onCancel}
					class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 rounded-xl hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-sm transition-all duration-200"
				>
					<CloseIcon class="w-5 h-5" />
				</button>
			</div>

			<div class="space-y-5">
				<div
					class="bg-yellow-100/50 dark:bg-yellow-900/30 backdrop-blur-sm rounded-xl p-5 border border-yellow-200/50 dark:border-yellow-700/30"
				>
					<p class="text-yellow-800 dark:text-yellow-200">
						既存の書籍データをインポートしたデータで上書きしようとしています。この操作は元に戻せません。
					</p>
				</div>

				<div class="text-gray-700 dark:text-gray-300">
					<p class="font-medium mb-3">インポート内容:</p>
					<ul class="list-disc pl-5 space-y-2 text-sm">
						<li class="flex items-center">
							<span class="inline-block w-24">書籍数:</span>
							<span class="font-medium">{importedData?.length || 0} 冊</span>
						</li>
						<li class="flex items-center">
							<span class="inline-block w-24">ファイル名:</span>
							<span class="font-medium truncate">{fileName || '不明'}</span>
						</li>
					</ul>
				</div>
			</div>

			<div
				class="flex justify-end space-x-3 mt-8 pt-4 border-t border-white/30 dark:border-gray-700/30"
			>
				<button
					type="button"
					class="px-5 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 font-medium rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
					on:click={onCancel}
				>
					キャンセル
				</button>
				<button
					type="button"
					class="px-5 py-2.5 bg-red-500/90 dark:bg-red-600/90 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-red-600/90 dark:hover:bg-red-700/90 transition-all duration-200 shadow-sm"
					on:click={onConfirm}
				>
					上書きする
				</button>
			</div>
		</div>
	</div>
{/if}
