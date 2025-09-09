import systemStore from '@/store/systemStore.js';

export default async function getSystemInfo() {
	return new Promise((resolve) => {
		const sysInfo = uni.getWindowInfo();
		const menuInfo = uni.getMenuButtonBoundingClientRect();

		const navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
		console.log(navBarHeight);
		systemStore.data.navBarHeight = navBarHeight;
		const screenWidth = sysInfo.screenWidth;
		console.log('screenWidth', screenWidth);
		systemStore.data.screenWidth = screenWidth;

		resolve(navBarHeight);
	})
}