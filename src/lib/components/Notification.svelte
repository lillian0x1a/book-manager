<script lang="ts">
	import { CheckIcon, CloseIcon, InfoIcon } from '$lib/components/icons';
	import type { Notification as NotificationType } from '$lib/types';

	export let notification: NotificationType;

	$: notificationBgColor =
		notification.type === 'info'
			? 'bg-blue-500/80'
			: notification.type === 'success'
				? 'bg-green-500/80'
				: 'bg-red-500/80';
</script>

{#if notification.show}
	<div
		class="fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md transform transition-transform duration-300 animate-fade-in-up flex items-center text-white border border-white/30 {notificationBgColor}"
	>
		{#if notification.type === 'success'}
			<CheckIcon class="mr-2" />
		{:else if notification.type === 'error'}
			<CloseIcon class="mr-2" />
		{:else}
			<InfoIcon class="mr-2" />
		{/if}
		<span>{notification.message}</span>
	</div>
{/if}

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in-up {
		animation: fadeInUp 0.3s ease-out forwards;
	}
</style>
