<script>
	import config from '@/config/config.js';
	import getWeather from '@/utils/weather.js';
	import formatDate from '@/utils/format.js';
	import getSystemInfo from '@/utils/system.js';
	import userStore from '@/store/userStore.js'

	export default {
		onLaunch: function() {
			console.log('App Launch');
			//天气
			getWeather();
			//系统信息
			getSystemInfo();
			// 获取缓存的用户信息
			this.getUserInfo();
		},
		onShow: function() {
			console.log('App Show');

			const lastTime = uni.getStorageSync('lastGetWeatherTime' || 0);
			const now = new Date();
			if (now - lastTime > 30 * 60 * 1000) {
				getWeather();
				uni.setStorageSync('lastGetWeatherTime', now);
			}
		},
		onHide: function() {
			console.log('App Hide');
			clearInterval(this.formatTimer);
		},
		methods: {
			getUserInfo() {
				uni.getStorage({
					key: "userInfo",
					success: (res) => {
						console.log('storage', res.data);
						userStore.data = res.data;
					}
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/common/style.css";
	@import "@/common/iconfont.css";
	@import "@/static/stylesheet.css";
</style>