<template>
	<view class="content">
		<view class="header flex-col" :style="{height: headerHeight + 'px'}">
			<view class="avatar-wrapper" :style="{height: sysInfo.navBarHeight + 'px'}">
				<view class="line-block flex-row" :style="{top: sysInfo.avatarTop - avatarWidth / 2 + 'px'}">
					<text class="iconfont" @click="goBack">&#xe60d;</text>
					<image class="avatar" :src="userInfo.avatarUrl" mode="widthFix"
						:style="{width: avatarWidth + 'px'}"></image>
				</view>
			</view>
			<view class="header-bar flex-row">
				<view class="bar-item flex-row">
					<text class="iconfont btn-item" @click="onClickSearch">&#xe67d;</text>
				</view>
				<view class="bar-item search" v-if="showSearch">
					<input class="input" placeholder="输入地名或活动类型" confirm-type="search" @confirm=""/>
				</view>
				<view class="bar-item flex-row" v-if="!showSearch">
					<text class="select btn-item">任意日期<text class="iconfont">&#xe627;</text></text>
					<text class="button btn-item">推荐</text>
					<text class="button btn-item">关注</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userStore from '@/store/userStore';
	import systemStore from '@/store/systemStore';

	export default {
		data() {
			return {
				avatarWidth: 25,
				headerHeight: 0,
				showSearch: false
			}
		},

		onLoad() {
			const navBarHeight = systemStore.data.navBarHeight;

			const query = uni.createSelectorQuery().in(this);
			query.select('.header-bar').boundingClientRect(rect => {
				this.headerHeight = rect.height + navBarHeight;
			}).exec();
		},

		methods: {
			goBack() {
				uni.navigateBack();
			},
			onClickSearch() {
				console.log(this.showSearch);
				this.showSearch = true;
				console.log(this.showSearch);
			}
		},
		computed: {
			sysInfo() {
				const data = systemStore.data;
				const navBarHeight = data.navBarHeight;
				const menuInfo = data.menuInfo;

				return {
					navBarHeight,
					avatarTop: menuInfo.bottom - menuInfo.height / 2,
				}
			},
			userInfo() {
				const data = userStore.data;

				return {
					avatarUrl: data.avatarUrl
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {

		.line-block {
			height: max-content;
			align-items: center;
			position: relative;
			color: $uni-color-primary;
			font-size: 25rpx;
			font-weight: bold;

			.iconfont {
				margin-left: 25rpx;
				font-weight: bold;
			}
		}

		.avatar {
			margin-left: 20rpx;
			border-radius: 50%;
			border: 1px solid #ddd;
			box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
		}

		.header-bar {
			justify-content: space-around;
			font-size: 25rpx;

			.bar-item {
				height: 80rpx;
				flex: 1;
				justify-content: center;
				align-items: center;

				.iconfont {
					border-radius: 50%;
				}
			}
		}

		.btn-item {
			padding: 15rpx;
			margin: 0 30rpx;
			background-color: #F2F4F7;
			border-radius: 40rpx;
		}
	}
</style>