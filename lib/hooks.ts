// usehooks-ts에서 자주 쓰는 훅을 한 곳에서 re-export
// 직접 구현하지 않고 검증된 라이브러리를 활용한다
export {
  useLocalStorage,
  useDebounceValue,
  useDebounceCallback,
  useMediaQuery,
  useToggle,
  useCopyToClipboard,
  useWindowSize,
} from "usehooks-ts"
