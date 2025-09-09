import decodeUnicodeEntity from '@/utils/decode.js';

const pageInfoRaw = {
	navTitle: "我的",
	navAlgin: "left",
	navColor: "black",
	isBack: false,
	navList: [{
			unicode: '&#xe669;',
			text: '活动'
		},
		{
			unicode: '&#xe7ae;',
			text: '动态'
		}
	],
	sysNavList: [{
		unicode: '&#xe616;',
		text: '退出登录'
	}]
}

export default async function getPageInfo() {
	const pageInfo = {
		...pageInfoRaw,
		navList: pageInfoRaw.navList.map(item => ({
			...item,
			unicode: decodeUnicodeEntity(item.unicode)
		})),
		sysNavList: pageInfoRaw.sysNavList.map(item => ({
			...item,
			unicode: decodeUnicodeEntity(item.unicode)
		}))
	}

	return pageInfo;
}