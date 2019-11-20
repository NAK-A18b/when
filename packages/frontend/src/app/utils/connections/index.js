export const isSubscribedTo = (user, connection) =>
  !!(
    user.connections &&
    !!user.connections.find(conn => conn.id === connection.id)
  );
