import axios from "axios";

export const getUsers = () => {
  // getリクエストでクエリパラメータとして渡す場合は("/users", { params: { limit: 1000 } });と書く
  // postリクエストでパラメータをオプションとして渡す場合は("/users", { limit: 1000 })とJSON形式で書く
  return axios.get("/users", { params: { limit: 1000 } }); // limitはREM REST APIのページネーション設定
};
