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
	<div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
		<div
			class="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl w-full max-w-md transform transition-all p-6"
		>
			<div class="flex justify-between items-center mb-5">
				<h2 class="text-xl font-semibold text-gray-800 flex items-center">
					<InfoIcon class="text-yellow-500 mr-2" />
					データの上書き確認
				</h2>
				<button
					on:click={onCancel}
					class="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-white/30 backdrop-blur-sm transition"
				>
					<CloseIcon />
				</button>
			</div>
			<div class="space-y-4">
				<div class="bg-yellow-100/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/30">
					<p class="text-yellow-800">
						既存の書籍データをインポートしたデータで上書きしようとしています。この操作は元に戻せません。
					</p>
				</div>
				<div class="text-gray-700">
					<p class="font-medium mb-2">インポート内容:</p>
					<ul class="list-disc pl-5 space-y-1 text-sm">
						<li>書籍数: {importedData?.length || 0} 冊</li>
						<li>ファイル名: {fileName || '不明'}</li>
					</ul>
				</div>
			</div>
			<div class="flex justify-end space-x-3 mt-8 pt-4 border-t border-white/30">
				<button
					type="button"
					class="px-4 py-2 bg-white/30 backdrop-blur-sm text-gray-800 font-medium rounded-xl hover:bg-white/40 transition"
					on:click={onCancel}
				>
					キャンセル
				</button>
				<button
					type="button"
					class="px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-red-600/80 transition"
					on:click={onConfirm}
				>
					上書きする
				</button>
			</div>
		</div>
	</div>
{/if}
