<script lang="ts">
	import { CheckIcon, CloseIcon, InfoIcon } from '$lib/components/icons';
	import type { Notification as NotificationType } from '$lib/types';

	export let notification: NotificationType;

	// 通知タイプに応じた背景色とアイコンの色を設定
	$: notificationConfig =
		{
			info: {
				bgColor: 'bg-blue-500/90 dark:bg-blue-600/90',
				borderColor: 'border-blue-400/30 dark:border-blue-500/30',
				iconColor: 'text-blue-100'
			},
			success: {
				bgColor: 'bg-green-500/90 dark:bg-green-600/90',
				borderColor: 'border-green-400/30 dark:border-green-500/30',
				iconColor: 'text-green-100'
			},
			error: {
				bgColor: 'bg-red-500/90 dark:bg-red-600/90',
				borderColor: 'border-red-400/30 dark:border-red-500/30',
				iconColor: 'text-red-100'
			}
		}[notification.type] || notificationConfig.info;
</script>

{#if notification.show}
	<div
		class="fixed bottom-6 right-6 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-lg transform transition-all duration-300 animate-fade-in-up flex items-center text-white {notificationConfig.bgColor} border {notificationConfig.borderColor}"
	>
		{#if notification.type === 'success'}
			<CheckIcon class="mr-3 w-5 h-5 {notificationConfig.iconColor}" />
		{:else if notification.type === 'error'}
			<CloseIcon class="mr-3 w-5 h-5 {notificationConfig.iconColor}" />
		{:else}
			<InfoIcon class="mr-3 w-5 h-5 {notificationConfig.iconColor}" />
		{/if}
		<span class="font-medium">{notification.message}</span>
	</div>
{/if}

<style global>
	/* UnoCSSのアニメーションプリセットを使用するため、カスタムアニメーションは不要 */
</style>
