class Utils {
  static numberWithOutComma = (num) => {
    return parseFloat(num.replace(/,/g, ""));
  };
}
export default Utils;
