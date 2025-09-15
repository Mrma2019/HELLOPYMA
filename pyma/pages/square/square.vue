<template>
	<view class="content">
		<!-- 头部 -->
		<view class="header flex-col" :style="{transform: `translateY(${headerTranslate})`, opacity: opacity}">
			<view class="avatar-wrapper" :style="{height: systemInfo.navBarHeight + 'px'}">
				<image class="avatar-img" :src="userInfo.avatarUrl" mode="widthFix"
					:style="{width: avatarWidth + 'px', height: avatarWidth + 'px', top: avatarTop + 'px'}"></image>
			</view>
			<view class="tap-bar border-box flex-row">
				<view class="tap-item" data-index="0"><text class="text">推荐</text></view>
				<view class="tap-item" data-index="1"><text class="text">关注</text></view>
			</view>
		</view>

		<scroll-view id="page-content" class="scroll-box" scroll-y @scroll="onScroll"
			:style="{paddingTop: scrollPaddingTop + 'px'}">
		</scroll-view>
	</view>
</template>

<script>
	import systemStore from '@/store/systemStore.js';
	import userStore from '@/store/userStore';
	export default {
		data() {
			return {
				headerHeight: 0,

				headerTranslate: '0px',
				//scroll滚动
				scrollPaddingTop: 0,
				lastScrollTop: 0,
				//头部透明度
				opacity: 1,

				avatarWidth: 30,
				avatarTop: 0,
				tapBarHeight: 0
			};
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.tap-bar').boundingClientRect((res) => {
				this.tapBarHeight = res.height;

				const navBarHeight = systemStore.data.navBarHeight;
				this.headerHeight = this.scrollPaddingTop = navBarHeight + this.tapBarHeight;

				this.avatarTop = this.systemInfo.menuBottom - (this.systemInfo.menuHeight + this.avatarWidth) / 2;
			}).exec();
		},
		methods: {
			onScroll(e) {
				const current = Math.max(e.detail.scrollTop, 0);
				const offset = Math.min(current, this.headerHeight);
				// 方向判断加阈值（避免抖动）
				const minDelta = 1.2;
				const delta = current - this.lastScrollTop;
				const isScrollingDown = delta > minDelta; // 超过1.2px才判定为下滑
				const isScrollingUp = delta < -minDelta; // 超过1.2px才判定为上滑
				if (isScrollingDown) {
					this.headerTranslate = `-${offset}px`;
					this.opacity = 1 - offset / this.headerHeight;
				} else if (isScrollingUp) {
					this.headerTranslate = '0px';
					this.opacity = 1;
				}
				// paddingTop 固定，不要动态减
				this.scrollPaddingTop = this.headerHeight - offset * 1.5;
				this.lastScrollTop = current;
			}
		},
		computed: {
			userInfo() {
				const data = userStore.data;
				return {
					avatarUrl: data.avatarUrl
				}
			},
			systemInfo() {
				const data = systemStore.data

				const menuInfo = data.menuInfo;
				const menuHeight = menuInfo.height;
				const menuBottom = menuInfo.bottom;

				const navBarHeight = data.navBarHeight;

				return {
					menuHeight,
					menuBottom,
					navBarHeight
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		z-index: 10;
		transition: transform 0.25s ease-out, opacity 0.25s ease;

		.avatar-img {
			position: relative;
			border-radius: 50%;
			margin-left: 40rpx;
		}

		.tap-bar {
			height: 80rpx;
			color: $uni-color-primary;
			justify-content: space-around;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;

			.tap-item {
				padding: 10rpx 40rpx;
				border-bottom: 6rpx solid $uni-color-primary;
			}
		}
	}

	.scroll-box {
		height: 100vh;
		box-sizing: border-box;
		transition: padding 0.25s ease;
		/* 让 padding 过渡自然 */
	}
</style>