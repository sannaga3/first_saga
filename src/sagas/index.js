import userSagas from "./users";
import { all } from "redux-saga/effects";

// rootSagaにforkを集結し、store内部のsagaMiddleware.runで一括起動する
export default function* rootSaga() {
  yield all([...userSagas]); // forkしたブロセスを一括して呼び出す
  // 個々に呼び出す場合は下のようにする
  // yield fork(hogeHugaSaga)
  // yield fork(watchHogeSaga)
}
