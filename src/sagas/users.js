import { takeEvery, call, fork, put, select } from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/user";

function* getUsers() {
  try {
    // callでpromiseを生成し、axiosでのユーザー取得結果をresultに格納してからコンソールログで出力
    const result = yield call(api.getUsers);
    yield put(
      actions.getUsersSuccess({
        items: result.data.data,
      })
    );
    // const state = yield select();
    // console.log("select", state);
  } catch (e) {}
}

// takeEveryで常にdispatchを監視しactions.Types.GET_USERS_REQUESTがconnect?された時にgetUsers関数を実行する。ジェネレータ内部でwhile(true)が働いている。
function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

// watchGetUsersをrootSagaと並列処理する為にforkする。exportした各sagaはrootSagaで一括してforkする
const userSagas = [fork(watchGetUsersRequest)];
// 以下は個別でforkする方法
// function* userSagas() {
//   yield fork(watchGetUsersRequest);
// }

export default userSagas;

// saga-effectsについて
// takeEvery  dispatchを監視し、dispatchのタイミングで任意の処理を実行する
// call       promiseを生成し、その処理が終わるのを待つ。apiを叩くときに用いる
// fork       非同期処理を行う。複数のジェネレータ関数を並列で処理するのに用いる。メインのジェネレータからプロセスをforkで分岐していく
//            rootSagaがメインプロセスとして動作し、全てのwatcherがrootSagaから分岐している。
//            fork1 -> getUser, fork2 -> deleteUser, fork3 -> createUser といった感じで並列でアクションの監視を行う
// put        actionをdispatchする。順番に複数のstateを更新することが可能
