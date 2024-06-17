export default () => {
  self.addEventListener("message", (e) => {
    if (!e) return;
    let { users, type } = e.data;

    if (type === "asc") {
      users = users.sort((a, b) => a.commentCount - b.commentCount);
    } else {
      users = users.sort((a, b) => b.commentCount - a.commentCount);
    }

    postMessage(users);
  });
};
