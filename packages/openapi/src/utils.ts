export function isConstructor(fn: Function) {
  try {
    Reflect.construct(String, [], fn)
  } catch (e) {
    return false
  }
  return true
}

const THUNK_EXTRACT_RE = /.+=>(.+)/
export function extractNameFromThunk(thunk: Function): string | undefined {
  const res = THUNK_EXTRACT_RE.exec(thunk.toString())
  if (!res || res.length < 2) return
  return res[1]
}
