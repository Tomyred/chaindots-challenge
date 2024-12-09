export const insertNewUser = (user) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const exists = users.some((existingUser) => existingUser.email === user.email);
  if (exists) {
    throw new Error('user already exists');
  }
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return user;
};

export const getUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find((user) => user.email === email) || null;
};

export const isInFavorites = (favorite) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.some((existingFavorite) => existingFavorite.displayName === favorite.displayName);
}

export const getFavorites = (id) => {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  return favs.filter( fav => fav.userId === id );
};

export const insertNewFavorite = (favorite) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const exists = favorites.some((existingFavorite) => existingFavorite.displayName === favorite.displayName);
  if (exists) {
    throw new Error('Already in favorites.');
  }
  favorites.push(favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  return favorite;
};

export const deleteFromFavorite = (userId, displayName) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log({favorites}, userId, displayName)
  favorites = favorites.filter((favorite) => {
    console.log(favorite.userId, userId ,'---', favorite.displayName === displayName)

    return !(favorite.userId === userId && favorite.displayName === displayName)
  });
  localStorage.setItem('favorites', JSON.stringify(favorites));
  console.log({favorites})
  return favorites
};
