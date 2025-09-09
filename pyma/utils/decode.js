export default function decodeUnicodeEntity(entity) {
	if (!entity) return ''

	// 去掉 &#x 和 ;，取出十六进制部分
	const hex = entity.replace('&#x', '').replace(';', '')
	const codePoint = parseInt(hex, 16)
	if (Number.isNaN(codePoint)) return ''

	// 支持大于 0xFFFF 的 Unicode
	return String.fromCodePoint(codePoint)
}