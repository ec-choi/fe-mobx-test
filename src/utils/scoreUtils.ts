export const scoreUtils = {
  scoreToPercentage(base: number, target: number) {
    return Math.floor((target / base) * 100)
  },
}
