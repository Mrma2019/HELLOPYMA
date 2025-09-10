"use strict";
function padStart(val, num, str) {
  return val.toString().padStart(num, str);
}
function formatDate(dateStr) {
  const date = new Date(dateStr ?? Date.now());
  const year = date.getFullYear();
  const month = padStart(date.getMonth() + 1, 2, "0");
  const _date = padStart(date.getDate(), 2, "0");
  const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const day = days[date.getDay()];
  const hours = padStart(date.getHours(), 2, "0");
  const minutes = padStart(date.getMinutes(), 2, "0");
  const data = {
    date: `${year}-${month}-${_date}`,
    time: `${hours}:${minutes}`,
    day
  };
  return data;
}
exports.formatDate = formatDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/format.js.map
