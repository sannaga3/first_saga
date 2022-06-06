import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersRequest } from "../actions/users";
import { UserList } from "./users/UserList";

class App extends Component {
  // Appコンポーネント生成時に、getUsersRequestをpropsにセットする
  constructor(props) {
    super(props);
    // componentDidMountはAPPコンポーネントがレンダリングされた後に実行される。２回レンダリングされる為上記のコンストラクタの方が良い
    // componentDidMount(props) {
    this.props.getUsersRequest();
  }
  render() {
    const users = this.props.users;

    return (
      <div>{users.items.length > 0 && <UserList users={users.items} />}</div>
    );
  }
}

// APPコンポーネントとstoreを紐付けている。sagaのディスパッチ部
// connect(state => (state), action)(component)でコンポーネントに対してsaga用アクションをdispatchし、watchGetUsersRequest()に検知させる。
// takeEveryでgetUsers()が起動し、redux用のdispatchが行われる。dispatch後のstateからAppコンポーネントで使いたいstateを指定する
export default connect(({ users }) => ({ users }), {
  getUsersRequest,
})(App);

// 以下はgeneratorについて

// // redux-sagaはgeneratorをとiteratorを使って非同期処理を順序立てて行う
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
