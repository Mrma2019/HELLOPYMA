const pageInfoRaw = {
	tapList: [
		'推荐',
		'关注'
	]
}

export default async function getPageInfo() {
	const pageInfo = {
		...pageInfoRaw
	}

	return pageInfo;
}