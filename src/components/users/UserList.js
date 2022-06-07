export const UserList = ({ users }) => {
  const sorted = users.sort((a, b) => {
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
  return (
    <>
      {sorted.map((user) => {
        return (
          <div
            style={{ display: "flex", flex: "row", margin: "5px" }}
            key={user.id}
          >
            <div
              style={{ width: "200px" }}
            >{`${user.firstName} ${user.lastName}`}</div>
            <div>
              <button>delete</button>
            </div>
          </div>
        );
      })}
    </>
  );
};
