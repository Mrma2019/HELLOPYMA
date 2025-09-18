"use strict";
function formatDate(dateStr) {
  const date = new Date(dateStr ?? Date.now());
  const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const data = {
    date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
    time: `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
    day: days[date.getDay()]
  };
  return data;
}
exports.formatDate = formatDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/format.js.map
