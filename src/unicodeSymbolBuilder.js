// This is an internal module, not part of the Temml distribution,
// whose purpose is to generate `unicodeSymbols` for Parser.js
// In this way, only this module, and not the distribution/browser,
// needs String's normalize function.
import * as accents from "./unicodeAccents";

const result = {};
const letters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "αβγδεϵζηθϑικλμνξοπϖρϱςστυφϕχψωΓΔΘΛΞΠΣΥΦΨΩ";
for (const letter of letters) {
  for (const accent of Object.getOwnPropertyNames(accents)) {
    const combined = letter + accent;
    const normalized = combined.normalize("NFC");
    if (normalized.length === 1) {
      result[normalized] = combined;
    }
    for (const accent2 of Object.getOwnPropertyNames(accents)) {
      if (accent === accent2) {
        continue;
      }
      const combined2 = combined + accent2;
      const normalized2 = combined2.normalize("NFC");
      if (normalized2.length === 1) {
        result[normalized2] = combined2;
      }
    }
  }
}

export default result;
