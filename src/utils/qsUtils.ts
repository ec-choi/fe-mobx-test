export const qsUtils = {
  // object를 url querystring으로 변환
  convertObjectToQs: (target: { [key: string]: number | string }) => {
    return new URLSearchParams(JSON.parse(JSON.stringify(target))).toString()
  },
  // url querystring을 object로 변환
  convertQsToObject: (qs: string) => {
    const entries = new URLSearchParams(qs)
    const result: { [key: string]: string } = {}
    for (const [key, value] of entries) {
      result[key] = value
    }
    return result
  },
}
