<template>
	<view class="content">
		<uni-nav-bar :title="pageInfo.navTitle" :align="pageInfo.navAlgin" :color="pageInfo.navColor"></uni-nav-bar>
		<scroll-view id="page-content" scroll-y :style="{paddingTop: systemInfo.navBarHeight + gap + 'px'}">
			<view class="content-wrapper">
				<view class="profile-card border-box flex-row">
					<image class="avatar" :src="userInfo.avatarUrl" mode="widthFix"></image>
					<text class="nickname">{{userInfo.nickname}}</text>
					<view class="edit">
						<text>编辑资料</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup v-model:show="is_popup" :height="popupBoxHeight">
			<view class="popup-content border-box flex-col" catchtouchmove>
				<view class="header border-box flex-col">
					<text class="title">{{appName}} 申请</text>
					<text class="desc">获取你的昵称、头像和权限</text>
				</view>
				<view class="avatar-wrapper line-item border-box flex-row">
					<text class="item-text">头像</text>
					<button class="choose-avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image class="avatar-img" :src="userInfo.avatarUrl || defaultAvatarUrl" mode="widthFix">
						</image>
					</button>
					<text class="iconfont">&#xe628;</text>
				</view>
				<view class="nickname-input line-item border-box flex-row">
					<text class="item-text">昵称</text>
					<input type="nickname" :value="userInfo.nickname || userInfoRaw.nickname" placeholder="请输入你的昵称"
						@change="onInput" />
				</view>
				<view class="btns flex-row">
					<view class="cancle item-btn" @click="onCancle">
						<text>取消</text>
					</view>
					<view class="submit item-btn" @click="onSubmit">
						<text>允许</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-tab-bar></uni-tab-bar>
	</view>
</template>

<script>
	import systemStore from '@/store/systemStore.js';
	import getPageInfo from './index.js';
	import userStore from '@/store/userStore.js';

	export default {
		data() {
			return {
				appName: 'HELLO哈喽',
				pageInfo: {},
				gap: 10,
				is_popup: false,
				popupBoxHeight: '45',
				defaultAvatarUrl: '/static/avatar.jpg',
				userInfoRaw: {
					avatarUrl: '',
					nickname: '',
				}
			}
		},
		methods: {
			// 点击头像右侧的下拉按钮显示
			openPopup() {
				this.is_popup = true;
			},
			// 点击取消按钮
			onCancle() {
				this.is_popup = false;
			},
			onChooseAvatar(e) {
				console.log(e);
				const {
					avatarUrl
				} = e.detail;
				console.log('avatarUrl', avatarUrl);
				this.defaultAvatarUrl = avatarUrl;
				this.userInfoRaw.avatarUrl = avatarUrl;
			},
			onInput(e) {
				const nickname = e.target.value;
				console.log('nickName input', nickname);
				this.userInfoRaw.nickname = nickname;
			},
			// 点击提交按钮
			onSubmit() {
				uni.setStorage({
					key: "userInfo",
					data: {
						avatarUrl: this.userInfoRaw.avatarUrl,
						nickname: this.userInfoRaw.nickname,
						isLogin: true
					}
				});
				Object.assign(this.userInfo, {
					avatarUrl: this.userInfoRaw.avatarUrl,
					nickname: this.userInfoRaw.nickname
				})
				this.is_popup = false;
			}
		},
		async onLoad() {
			this.pageInfo = await getPageInfo();
			// 当屏幕宽度大于等于768px时,改变默认的高度
			if (systemStore.data.screenWidth >= 768) {
				console.log('screenWidth>=768');
				this.popupBoxHeight = '60';
			}
		},
		onShow() {
			const userInfo = uni.getStorageSync('userInfo');

			if (!userInfo.isLogin) {
				console.log('info show', userStore.data.isLogin);
				this.is_popup = true;
			}
		},
		// 页面隐藏或者挑战时,隐藏弹出层
		// onHide() {
		// 	this.is_popup = false;
		// },
		computed: {
			systemInfo() {
				const data = systemStore.data;

				const navBarHeight = data.navBarHeight;
				const screenWidth = data.sysInfo.screenWidth;
				// console.log('inof', data);
				return {
					navBarHeight,
					screenWidth
				}
			},
			userInfo() {
				const data = userStore.data;
				return data;
			}
		}
	}
</script>

<style lang="scss">
	$card-width: 95%;
	$ele-border-radius: 20rpx;
	$avatar-width: 100rpx;
	$ele-margin: 20rpx;

	::v-deep(.nav-bar) {
		background-color: $uni-page-bg-color !important;
	}

	.profile-card {
		width: $card-width;
		height: max-content;
		align-items: center;
		position: relative;

		.avatar {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			border: 2px solid #ddd;
		}

		.nickname {
			margin-left: 20rpx;
			font-size: 30rpx;
		}

		.edit {
			position: absolute;
			right: 40rpx;
			font-size: 30rpx;
			padding: 10rpx;
			border-radius: 20rpx;
			color: #215088;
			border: 1px solid #215088;
		}
	}

	.popup-content {
		padding: 0 40rpx;
		height: 100%;

		.header {
			height: #{$avatar-width + 20};
			justify-content: space-around;

			.title {
				font-size: 35rpx;
				font-weight: bold;
			}

			.desc {
				font-size: 25rpx;
			}
		}

		.line-item {
			width: 100%;
			height: #{$avatar-width + 20};
			padding: 20rpx 0;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #ddd;
		}

		.item-text {
			margin-right: 40rpx;
			font-size: 30rpx;
		}

		.avatar-wrapper {
			.choose-avatar {
				width: $avatar-width !important;
				height: $avatar-width !important;
				padding: 0;
				margin: 0;
				border: 1px solid #ddd;
				box-sizing: border-box;
				background: transparent;
				border-radius: 50%;
				position: relative;

				.avatar-img {
					width: 100%;
					height: 100%;
					overflow: hidden;
					display: block;
				}
			}

			.iconfont {
				position: absolute;
				left: 90%;
			}
		}

		.btns {
			flex: 1;
			justify-content: space-around;
			align-items: center;
			font-size: 30rpx;

			.item-btn {
				padding: 20rpx 120rpx;
				border: 1px solid #ddd;
			}

			.submit {
				color: #fff;
				background-color: $uni-color-primary;
			}
		}
	}
</style>