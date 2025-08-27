<!-- +page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab, isMobile, type TabId } from '$lib/stores/navigation';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import MobileHeader from '$lib/components/layout/MobileHeader.svelte';
	import DesktopToolbar from '$lib/components/layout/DesktopToolbar.svelte';
	import MobileTabBar from '$lib/components/layout/MobileTabBar.svelte';
	import ContentArea from '$lib/components/layout/ContentArea.svelte';
	import { useScreenSize } from '$lib/hooks/useScreenSize';

	const { checkScreenSize } = useScreenSize(isMobile);

	onMount(() => {
		// 初期値を設定
		checkScreenSize();
		// リサイズイベントをリッスン
		window.addEventListener('resize', checkScreenSize);
		// クリーンアップ関数
		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});

	// デバッグ用: isMobileの値をコンソールに出力
	$: console.log('isMobile:', $isMobile);
</script>

<div
	class="app-container flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
>
	<!-- サイドバー: デスクトップのみ表示 -->
	{#if !$isMobile}
		<Sidebar class="hidden md:flex" />
	{/if}

	<main class="main-content flex-1 overflow-hidden flex flex-col">
		<!-- モバイルヘッダー: モバイルのみ表示 -->
		{#if $isMobile}
			<MobileHeader />
		{:else}
			<DesktopToolbar />
		{/if}

		<!-- コンテンツエリア -->
		<div class="content-area flex-1 overflow-y-auto p-4 md:p-6">
			<ContentArea />
		</div>
	</main>

	<!-- モバイルタブバー: モバイルのみ表示 -->
	{#if $isMobile}
		<MobileTabBar class="md:hidden" />
	{/if}
</div>
