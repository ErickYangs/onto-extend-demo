import BigNumber from "bignumber.js";

BigNumber.set({
  EXPONENTIAL_AT: [-50, 50],
  DECIMAL_PLACES: 30
});

const runMethod = (method, a, b) => new BigNumber(a)[method](b).toString();

export const getPlusMulti = (...list) => {
  if (list.length === 0) {
    return "0";
  }
  const first = list.shift();
  const result = list.reduce(
      (total, curr) => total.plus(curr),
      new BigNumber(first)
  );
  return result.toString();
};

export const isEq = (a, b) => new BigNumber(a).eq(b);
export const isLt = (a, b) => new BigNumber(a).lt(b);
export const isLte = (a, b) => new BigNumber(a).lte(b);
export const isGt = (a, b) => new BigNumber(a).gt(b);
export const isGte = (a, b) => new BigNumber(a).gte(b);

export const getDiv = (a, b) => runMethod("div", a, b);

export const getTimes = (a, b) => runMethod("times", a, b);

export const getPlus = (a, b) => runMethod("plus", a, b);

export const getMinus = (a, b) => runMethod("minus", a, b);

export const getPow = (a, b) => runMethod("pow", a, b);

export const getFixed = (val, fixed = 2, trailingZeros = false) => {
  const numStr = val || "0";
  if (trailingZeros) {
    return new BigNumber(numStr).toFixed(fixed);
  }
  return new BigNumber(numStr).decimalPlaces(fixed).toString();
};

export const getPercent = (a, b) => {
  // 0-1
  if (isEq(b, "0")) {
    return isGt(a, b) ? "1" : "0";
  }
  const result = getDiv(a, b);
  return getFixed(result, 4);
};

export const getLocalStr = val => new BigNumber(val).toFormat(2);

export const getMax = (a, b) => BigNumber.max(a, b).toString();

export const getMin = (a, b) => BigNumber.min(a, b).toString();

export const isNumber = val => typeof val === "number" && !Number.isNaN(val);

export const getIsInvalidInput = numString => {
  if (!numString.length) {
    return true;
  }
  const num = Number(numString);
  return !isNumber(num) || num <= 0;
};

export const getAmount = (amount, float) => {
  return getTimes(amount, 10 ** float);
};
