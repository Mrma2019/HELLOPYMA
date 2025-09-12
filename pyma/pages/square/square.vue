<template>
	<view class="content">
		<view class="header" :style="{height: systemInfo.navBarHeight + 'px', transform:`translateY(${translateY})`, opacity: opacity}">

		</view>
		<scroll-view class="scroll-box" scroll-y @scroll="onScroll"
			:style="{height: '100vh', paddingTop: scrollPaddingTop + 'px'}">
			<view v-for="item, index in 100" :key="index">
				<text>{{item}}</text>
			</view>
		</scroll-view>
	</view>
</template>


<script>
	import systemStore from '@/store/systemStore.js';
	export default {
		data() {
			return {
				opacity: 1,
				translateY: '0px',
				scrollPaddingTop: systemStore.data.navBarHeight
			};
		},
		methods: {
			onScroll(e) {
				// console.log(e.detail.scrollTop);
				let current = e.detail.scrollTop;

				if (current < 0) current = 0;

				const maxScrollTop = this.systemInfo.navBarHeight;
				const offset = Math.min(current, maxScrollTop);
				this.translateY = -offset + 'px';
				
				this.scrollPaddingTop = Math.min(this.systemInfo.navBarHeight - offset, this.systemInfo.navBarHeight);
				
				console.log(this.scrollPaddingTop);
			}
		},
		computed: {
			systemInfo() {
				const {
					navBarHeight
				} = systemStore.data;
				return {
					navBarHeight
				};
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		background-color: $uni-color-primary;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		transition: transform 0.15s linear;
	}
</style>