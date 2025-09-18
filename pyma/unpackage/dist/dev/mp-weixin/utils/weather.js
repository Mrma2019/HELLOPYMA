"use strict";
const common_vendor = require("../common/vendor.js");
const config_config = require("../config/config.js");
const store_weatherStore = require("../store/weatherStore.js");
function request(options) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...options,
      success: resolve,
      fail: reject
    });
  });
}
function getLocation() {
  return new Promise((resolve, reject) => {
    common_vendor.index.getLocation({
      type: "gcj02",
      success: resolve,
      fail: reject
    });
  });
}
async function getWeatherByAdcode(code) {
  const res = await request({
    url: config_config.config.weatherUrl,
    data: {
      key: config_config.config.apiKey,
      location: code
    }
  });
  if (res.data.code !== "200")
    throw new Error("获取天气数据失败");
  const weatherInfo = res.data.now;
  store_weatherStore.weatherStore.data = {
    ...weatherInfo,
    ...store_weatherStore.weatherStore.data
  };
  return weatherInfo;
}
async function getGridWeatherByAdcode(lon, lat) {
  const res = await request({
    url: config_config.config.gridWeatherUrl,
    data: {
      key: config_config.config.apiKey,
      location: `${lon},${lat}`
    }
  });
  if (res.data.code !== "200")
    throw new Error("获取格点天气失败");
  const gridInfo = res.data;
  store_weatherStore.weatherStore.girdInfo = gridInfo;
  return gridInfo;
}
async function getIndices(lon, lat) {
  const res = await request({
    url: config_config.config.indicesUrl,
    data: {
      key: config_config.config.apiKey,
      type: 1,
      location: `${lon},${lat}`
    }
  });
  if (res.data.code !== "200")
    throw new Error("获取天气指数失败");
  const indices = res.data;
  store_weatherStore.weatherStore.indices = indices;
  return indices;
}
async function getWeather() {
  try {
    const {
      latitude,
      longitude
    } = await getLocation();
    const adRes = await request({
      url: config_config.config.adCodeUrl,
      data: {
        key: config_config.config.apiKey,
        location: `${longitude},${latitude}`
      }
    });
    if (adRes.data.code !== "200")
      throw new Error("获取位置信息失败");
    const location = adRes.data.location[0];
    const adcode = location.id;
    store_weatherStore.weatherStore.data.location = location;
    const [weather, gridWeather, indices] = await Promise.all([
      getWeatherByAdcode(adcode),
      getGridWeatherByAdcode(longitude, latitude),
      getIndices(longitude, latitude)
    ]);
    store_weatherStore.weatherStore.loading = false;
    return {
      weather,
      gridWeather,
      indices
    };
  } catch (err) {
    common_vendor.index.__f__("error", "at utils/weather.js:136", err);
    throw err;
  }
}
exports.getWeather = getWeather;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/weather.js.map
