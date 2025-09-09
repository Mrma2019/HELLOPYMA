"use strict";
function decodeUnicodeEntity(entity) {
  if (!entity)
    return "";
  const hex = entity.replace("&#x", "").replace(";", "");
  const codePoint = parseInt(hex, 16);
  if (Number.isNaN(codePoint))
    return "";
  return String.fromCodePoint(codePoint);
}
exports.decodeUnicodeEntity = decodeUnicodeEntity;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/decode.js.map
