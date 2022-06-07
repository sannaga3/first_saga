import { useState } from "react";
import { connect } from "react-redux";
import { createUserRequest } from "../../actions/users";

// コネクトしたアクションを引数に渡す
export const NewUserForm = ({ createUserRequest }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserRequest({ firstName, lastName }); // 引数のアクションをディスパッチ
    setFirstName("");
    setLastName("");
  };

  const changeFirstName = (value) => {
    setFirstName(value);
  };

  const changeLastName = (value) => {
    setLastName(value);
  };

  return (
    <>
      <h1>create</h1>
      <form>
        <div style={{ display: "flex", flex: "row", margin: "10px" }}>
          <label style={{ width: "100px" }}>firstName</label>
          <input
            type="text"
            placeholder="first name"
            onChange={(e) => changeFirstName(e.target.value)}
            value={firstName}
            style={{ width: "200px" }}
          />
        </div>
        <div style={{ display: "flex", flex: "row", margin: "10px" }}>
          <label style={{ width: "100px" }}>lastName</label>
          <input
            type="text"
            placeholder="last name"
            onChange={(e) => changeLastName(e.target.value)}
            value={lastName}
            style={{ width: "200px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flex: "row",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            create
          </button>
        </div>
      </form>
    </>
  );
};

export default connect(null, {
  createUserRequest, // アクションをコネクトし、コンポーネント関数の引数に渡すことでディスパッチできるようになる
})(NewUserForm);
