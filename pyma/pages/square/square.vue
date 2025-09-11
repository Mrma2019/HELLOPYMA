<template>
	<view class="container">
		<!-- 头部 -->
		<view class="header" :style="{ backgroundColor: `rgba(29,155,240,${headerOpacity})` }">
			<view class="header-title">{{ headerTitle }}</view>
		</view>

		<!-- 内容 -->
		<scroll-view class="scroll-content" scroll-y @scroll="onScroll">
			<view class="banner"></view>
			<view v-for="i in 50" :key="i" class="item">
				Item {{ i }}
			</view>
		</scroll-view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				headerOpacity: 0, // 头部透明度
				headerTitle: "", // 动态标题
				titleShowHeight: 100 // 滚动多少显示标题
			};
		},
		methods: {
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop;

				// 动态改变头部透明度
				const maxScroll = 150; // 最大滚动高度
				let opacity = this.scrollTop / maxScroll;
				if (opacity > 1) opacity = 1;
				this.headerOpacity = opacity;

				// 动态标题显示
				this.headerTitle = this.scrollTop > this.titleShowHeight ? "首页" : "";
			}
		}
	}
</script>

<style scoped>
	.container {
		height: 100vh;
		position: relative;
	}

	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		color: #fff;
		transition: background-color 0.3s;
	}

	.header-title {
		font-size: 18px;
		font-weight: bold;
	}

	.scroll-content {
		height: 100%;
		padding-top: 44px;
		/* 顶部预留空间 */
	}

	.banner {
		height: 200px;
		background: url('https://picsum.photos/400/200') center/cover no-repeat;
	}

	.item {
		height: 60px;
		line-height: 60px;
		text-align: center;
		border-bottom: 1px solid #eee;
	}
</style>