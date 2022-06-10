import {
  takeEvery,
  call,
  fork,
  put,
  select,
  takeLatest,
  take,
} from "redux-saga/effects";
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
    const state = yield select();
    console.log("getUser", state);
  } catch (e) {
    actions.usersError({
      error: "error occured. Get users failed",
    });
  }
}

// takeEveryで常にdispatchを監視しactions.Types.GET_USERS_REQUESTがconnect?された時にgetUsers関数を実行する。ジェネレータ内部でwhile(true)が働いている。
function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser({ payload }) {
  try {
    const result = yield call(api.createUser, {
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
    yield put(
      actions.createUserSuccess({
        item: result.data,
      })
    );
    const state = yield select();
    console.log("createdUser", state.users.items);
    // const items = yield call(getUsers); // 新規作成分を取得できなかった為、上記のputエフェクトでディスパッチする形で代替
    // console.log("items", items);
  } catch (e) {
    yield put(
      actions.usersError({
        error: "error occured. Create user failed",
      })
    );
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser(userId) {
  try {
    const result = yield call(api.deleteUser, userId);
    yield put(
      actions.deleteUserSuccess({
        // item: result.data,    // REM REST APIの返り値がnullの為、叩いても無意味。userIdを直接渡してreducer内でuserを削除する
        userId: userId,
      })
    );
    const state = yield select();
    console.log("deletedUser", state.users.items);
    // const items = yield call(getUsers); // deleteした分が減らない為、上記のputエフェクトでディスパッチする形で代替
    // console.log("items", items);
  } catch (e) {
    yield put(
      actions.usersError({
        error: "error occured. Delete user failed",
      })
    );
  }
}

function* watchDeleteUserRequest() {
  while (true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST); // deleteUserRequestアクションを監視し、payloadを引数として扱いたい
    yield call(deleteUser, action.payload);
  }
}

// watchGetUsersをrootSagaと並列処理する為にforkする。exportした各sagaはrootSagaで一括してforkする
const userSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
];
// 以下は個別でforkする方法
// function* userSagas() {
//   yield fork(watchGetUsersRequest);
// }

export default userSagas;

// saga-effectsについて
// takeEvery  sagaアクションのdispatchを監視し、dispatchのタイミングで任意の処理を実行する
// takeLatest takeEveryと同じだが、タスク終了前に同じタスクが起動した場合は、前のタスクがキャンセルされる
// call       promiseを生成し、その処理が終わるのを待つ。apiを叩くときに用いる
// fork       非同期処理を行う。複数のジェネレータ関数を並列で処理するのに用いる。メインのジェネレータからプロセスをforkで分岐していく
//            rootSagaがメインプロセスとして動作し、全てのwatcherがrootSagaから分岐している。
//            fork1 -> getUser, fork2 -> deleteUser, fork3 -> createUser といった感じで並列でアクションの監視を行う
// put        actionをreducerにdispatchする。順番に複数のstateを更新することが可能
