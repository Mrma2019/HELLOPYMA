<template>
	<view class="content">
		<!-- 头部 -->
		<view class="header" :style="{height: headerHeight + 'px', transform: `translateY(${headerTranslate})`}">

		</view>
		<scroll-view class="scroll-box" scroll-y @scroll="onScroll"
			:style="{transform: `translateY(${contentTranslate})`}">
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
				headerHeight: 0,
				lastScrollTop: 0,
				headerTranslate: '0px',
				contentTranslate: '0px',
			};
		},
		mounted() {
			const headerHeight = this.systemInfo.navBarHeight;
			this.headerHeight = headerHeight;
			this.contentTranslate = `${headerHeight}px`;
		},
		methods: {
			onScroll(e) {
				const current = e.detail.scrollTop;
				const last = this.lastScrollTop;
				if (current < 0) return;
				const offset = Math.min(current, this.headerHeight);

				if (current > last) {
					this.headerTranslate = `${offset * -1}px`;
					this.contentTranslate = `${this.headerHeight - offset}`;
				} else {
					
				}

				this.lastScrollTop = current;
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
	};
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
		transition: transform 0.2s inherit, opacity 0.2s ease;
	}

	.scroll-box {
		height: 100vh;
		// transition: transform 0.2s ease;
	}
</style>