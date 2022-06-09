import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteUserRequest } from "../../actions/users";

export const UserList = () => {
  const dispatch = useDispatch();
  // useSelectorはselectorの返り値が変更される度に再レンダリングされる
  // 返り値が同じでもキャッシュで前回との比較が行われ、ネストしているほど計算に時間がかかる
  // useSelectorを複数併用している場合は、dispatchで何処かのselectorが変更されると全てに再計算が起きる
  // selectorの返り値がオブジェクトや配列の場合は、毎回別のインスタンスが返る為(参照先が同じなだけ)、値が同じでも再レンダリングが起きる
  // useSelector の第二引数に shallowEqual を渡すことで、別のインスタンスが返っても中身が同じであれば再レンダリングを止められる。 const user = useSelector(state => state.user, shallowEqual)
  const users = useSelector((state) => state.users.items, shallowEqual);

  const sort = () => {
    // アルファベット昇順 大文字 > 小文字
    users.sort((a, b) => {
      if (a.firstName > b.firstName) {
        return 1;
      } else if (a.firstName < b.firstName) {
        return -1;
      } else if (a.lastName > b.lastName) {
        return 1;
      } else if (a.lastName < b.lastName) {
        return -1;
      } else {
        return 0;
      }
    });
  };
  if (users.length >= 2) sort();

  const deleteUser = (userId) => {
    dispatch(deleteUserRequest(userId));
  };

  return (
    <>
      {users.map((user) => {
        return (
          <div
            style={{ display: "flex", flex: "row", margin: "5px" }}
            key={user.id}
          >
            {users[0] && (
              <>
                <div
                  style={{ width: "200px" }}
                >{`${user.firstName} ${user.lastName}`}</div>
                <div>
                  <button onClick={() => deleteUser(user.id)}>delete</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};
