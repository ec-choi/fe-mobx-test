declare namespace TypeUtils {
  // 일부 타입을 partial로 만듦
  type MakePartial<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? Partial<T[P]> : T[P]
  }
}
