import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getUsersRequest } from "./actions/users";
import { UserList } from "./components/users/UserList";
import NewUserForm from "./components/users/NewUserForm";

export const App = () => {
  const dispatch = useDispatch(); // connectするなら不要

  useEffect(() => {
    dispatch(getUsersRequest()); // connectするなら不要
    // getUsersRequest();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NewUserForm />
      <div style={{ margin: "10px" }}>
        <h1>UserList</h1>
      </div>
      <div>
        <UserList />
      </div>
    </div>
  );
};
export default App;
// export default connect(null, {
//   getUsersRequest,
// })(App);
// ReactのコンポーネントとReduxを繋ぐ方法はreact-reduxの connect と hooksの（useSelector useDispatch）２種類がある
// connectよりuseSelectorとuseDispatchの方がわかりやすい？  https://qiita.com/rh_/items/f3ad6037c13b4c9f33e1

// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 上は関数コンポーネントの書き方  下はクラスコンポーネントの書き方
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { getUsersRequest } from "./actions/users";
// import { UserList } from "./components/users/UserList";
// import NewUserForm from "./components/users/NewUserForm";

// class App extends Component {
//   // Appコンポーネント生成時に、getUsersRequestをpropsにセットする
//   constructor(props) {
//     super(props);
//     // componentDidMountはAPPコンポーネントがレンダリングされた後に実行される。２回レンダリングされる為上記のコンストラクタの方が良い
//     // componentDidMount(props) {
//     this.props.getUsersRequest();
//   }
//   render() {
//     const users = this.props.users;

//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <NewUserForm />
//         <div style={{ margin: "10px" }}>
//           <h1>UserList</h1>
//         </div>
//         <div>{users.items.length > 0 && <UserList users={users.items} />}</div>
//       </div>
//     );
//   }
// }

// APPコンポーネントとstoreを紐付けている。sagaのディスパッチ部
// connect(state => (state), action)(component)でコンポーネントに対してsaga用アクションをdispatchし、watchGetUsersRequest()に検知させる。
// takeEveryでgetUsers()が起動し、redux用のdispatchが行われる。dispatch後のstateからAppコンポーネントで使いたいstateを指定する
// export default connect(({ users }) => ({ users }), {
//   getUsersRequest,
// })(App);

// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
//       generatorについて
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// // redux-sagaはgeneratorをとiteratorを使って非同期処理を順番に処理する
// // generator関数はyield毎に順番に処理を行い、valueを返す。
// function* test() {
//   while (true) {
//     yield 1;
//     console.log("a");
//     yield 2;
//     console.log("b");
//     yield 3;
//   }
// }
// const iterator = test(); // iterator.next()でtestジェネレータ内のyieldを１回ずつ呼び出す
// console.log(iterator.next()); // {value: 1, done: false}  done:falseはgeneratorが最後のyieldまで終了していない意味。
// console.log(iterator.next()); // {value: 2, done: false}
// console.log(iterator.next()); // {value: 3, done: true}
// // while(true)とした場合は、３回でtestジェネレータが終了する為、４回目の時は再度testジェネレータに入り直す。iterator.next()が呼ばれると常に値を返すことができる
// console.log(iterator.next()); // {value: undefined, done: true} 処理するyieldがなくvalueを返せない為s、undefinedを返す

// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
