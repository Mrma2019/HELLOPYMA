import decodeUnicodeEntity from '@/utils/decode.js';

const pageInfoRaw = {
	navTitle: "我的",
	navAlgin: "left",
	navColor: "black",
	isBack: false,
	followCount: 0,
	fansCount: 0,
	navList: [{
			title: '我的发布',
			item_list: [{
					unicode: '&#xe669;',
					text: '活动'
				},
				{
					unicode: '&#xe605;',
					text: '动态'
				}
			]
		},
		{
			title: '设置',
			item_list: [{
					unicode: '&#xe616;',
					text: '退出登录'
				}
			]
		}
	]
};

export default async function getPageInfo() {
	const pageInfo = {
		...pageInfoRaw,
		navList: pageInfoRaw.navList.map(category => ({
			...category,
			item_list: category.item_list.map(item => ({
				...item,
				unicode: decodeUnicodeEntity(item.unicode) // 解码 item_list 里的 unicode
			}))
		}))
	};

	return pageInfo;
}