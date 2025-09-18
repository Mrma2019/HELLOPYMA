const pageInfoRaw = {
	tapList: [{
			text: "推荐",
			content: []
		},
		{
			text: "关注",
			content: []
		}
	]
}

export default async function getPageInfo() {
	const test = []
	for (let i = 1; i <= 100; i++) {
		test.push(i);
	}

	const tapList = pageInfoRaw.tapList.map(item => {
		return {
			...item,
			content: test
		}
	})

	const pageInfo = {
		tapList
	}

	return pageInfo
}