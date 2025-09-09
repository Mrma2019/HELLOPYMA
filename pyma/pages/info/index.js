import decodeUnicodeEntity from '@/utils/decode.js';

const pageInfo = {
	navTitle: "我的",
	navAlgin: "left",
	navColor: "black",
	isBack: false,
	navList: [{
		unicode: decodeUnicodeEntity('&#x10213;'),
		text: '活动'
	}, {
		unicode: decodeUnicodeEntity('&#x10213;'),
		text: '动态'
	}]
}

export default async function getPageInfo() {
	return pageInfo;
}