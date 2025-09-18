import systemStore from '@/store/systemStore.js';

export default async function getSystemInfo() {
	const sysInfo = uni.getWindowInfo();
	const menuInfo = uni.getMenuButtonBoundingClientRect();

	const {
		statusBarHeight,
		screenWidth
	} = sysInfo;

	const {
		top,
		height
	} = menuInfo;

	const navBarHeight = top * 2 + height - statusBarHeight;

	systemStore.data.sysInfo = sysInfo;
	systemStore.data.menuInfo = menuInfo;
	systemStore.data.navBarHeight = navBarHeight;
}