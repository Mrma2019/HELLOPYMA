import decodeUnicodeEntity from '@/utils/decode.js';

const pageInfoRaw = {
	navTitle: "我的",
	navAlgin: "left",
	navColor: "black",
	isBack: false,
	followCount: 0,
	fansCount: 0,
	navList: {
		title: '活动相关',
		item_list: [{
				unicode: '&#xe669;',
				text: '活动'
			},
			{
				unicode: '&#xe605;',
				text: '动态'
			}
		]
	}
};

export default async function getPageInfo() {
	const pageInfo = {
		...pageInfoRaw,
		navList: {
			...pageInfoRaw.navList, // 这里用 navList 原始对象
			item_list: pageInfoRaw.navList.item_list.map(item => ({
				...item,
				unicode: decodeUnicodeEntity(item.unicode) // 解码
			}))
		}
	};

	return pageInfo;
}