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

<div class="app-container">
	<!-- サイドバー: デスクトップのみ表示 -->
	{#if !$isMobile}
		<Sidebar />
	{/if}

	<main class="main-content">
		<!-- モバイルヘッダー: モバイルのみ表示 -->
		{#if $isMobile}
			<MobileHeader />
		{:else}
			<DesktopToolbar />
		{/if}

		<ContentArea />
	</main>

	<!-- モバイルタブバー: モバイルのみ表示 -->
	{#if $isMobile}
		<MobileTabBar />
	{/if}
</div>

<style>
	:global(body) {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
	}

	.app-container {
		display: flex;
		min-height: 100vh;
		background: linear-gradient(to bottom right, #e0e7ff, #ede9fe, #fce7f3);
		overflow: hidden;
	}

	.main-content {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 767px) {
		.main-content {
			padding-bottom: 5rem; /* モバイルタブバーの高さ分 */
		}
	}
</style>
