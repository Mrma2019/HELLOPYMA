import decodeUnicodeEntity from '@/utils/decode.js'

const tabs = [{
		pagePath: "pages/home/home",
		unicode: "&#x10211;",
		text: "首页"
	},
	{
		pagePath: "pages/info/info",
		unicode: "&#x10212;",
		text: "我的"
	}
]

// 统一转码
export default tabs.map(item => ({
	...item,
	unicode: decodeUnicodeEntity(item.unicode)
}))