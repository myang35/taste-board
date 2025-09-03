export class StringUtils {
  static firstUpper(str: string) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
}
