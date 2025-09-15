import systemStore from '@/store/systemStore.js';

export default async function getSystemInfo() {
	return new Promise((resolve) => {
		const sysInfo = uni.getWindowInfo();
		const menuInfo = uni.getMenuButtonBoundingClientRect();
		console.log(menuInfo);

		const navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
		const screenWidth = sysInfo.screenWidth;

		systemStore.data.sysInfo = sysInfo;
		systemStore.data.menuInfo = menuInfo;

		systemStore.data.navBarHeight = navBarHeight;
		// console.log(navBarHeight);

		resolve('set sysInfo sucess');
	})
}