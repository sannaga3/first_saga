export const UserList = ({ users }) => {
  console.log("list", users);
  return (
    <>
      {users.map((user) => {
        return <div key={user.id}>{user.firstName}</div>;
      })}
    </>
  );
};
