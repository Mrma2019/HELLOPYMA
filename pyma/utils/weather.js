import config from "@/config/config"
import weatherStore from '@/store/weatherStore.js'

/**
 * 封装 uni.request 返回 Promise
 */
function request(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: resolve,
			fail: reject
		})
	})
}

/**
 * 封装 uni.getLocation 返回 Promise
 */
function getLocation() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'gcj02',
			success: resolve,
			fail: reject
		})
	})
}

/**
 * 获取实时天气
 */
export async function getWeatherByAdcode(code) {
	const res = await request({
		url: config.weatherUrl,
		data: {
			key: config.apiKey,
			location: code
		}
	})

	if (res.data.code !== "200") throw new Error('获取天气数据失败')

	const weatherInfo = res.data.now
	weatherStore.data = {
		...weatherInfo,
		...weatherStore.data
	}
	return weatherInfo
}

/**
 * 获取格点天气
 */
export async function getGridWeatherByAdcode(lon, lat) {
	const res = await request({
		url: config.gridWeatherUrl,
		data: {
			key: config.apiKey,
			location: `${lon},${lat}`
		}
	})

	if (res.data.code !== "200") throw new Error('获取格点天气失败')

	const gridInfo = res.data
	weatherStore.girdInfo = gridInfo
	return gridInfo
}

/**
 * 获取天气指数
 */
export async function getIndices(lon, lat) {
	const res = await request({
		url: config.indicesUrl,
		data: {
			key: config.apiKey,
			type: 1,
			location: `${lon},${lat}`
		}
	})

	if (res.data.code !== "200") throw new Error('获取天气指数失败')

	const indices = res.data
	weatherStore.indices = indices
	return indices
}

/**
 * 获取天气数据（统一封装）
 * 返回对象 { weather, gridWeather, indices }
 */
export default async function getWeather() {
	try {
		const {
			latitude,
			longitude
		} = await getLocation()

		// console.log(latitude, longitude);

		// 获取 adcode
		const adRes = await request({
			url: config.adCodeUrl,
			data: {
				key: config.apiKey,
				location: `${longitude},${latitude}`
			}
		})

		// console.log(adRes);

		if (adRes.data.code !== "200") throw new Error('获取位置信息失败')

		const location = adRes.data.location[0]
		const adcode = location.id
		weatherStore.data.location = location

		// 并行请求天气数据
		const [weather, gridWeather, indices] = await Promise.all([
			getWeatherByAdcode(adcode),
			getGridWeatherByAdcode(longitude, latitude),
			getIndices(longitude, latitude)
		])
		//记载完成
		weatherStore.loading = false;
		
		return {
			weather,
			gridWeather,
			indices
		}
	} catch (err) {
		console.error(err)
		throw err
	}
}