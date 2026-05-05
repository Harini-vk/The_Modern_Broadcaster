export const getBookmarks = () => {
  const data = localStorage.getItem('bookmarks');
  return data ? JSON.parse(data) : [];
};

export const saveBookmark = (article: any) => {
  const bookmarks = getBookmarks();

  const exists = bookmarks.find((item: any) => item.id === article.id);
  if (exists) return;

  bookmarks.push(article);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

export const removeBookmark = (id: number) => {
  const bookmarks = getBookmarks().filter((item: any) => item.id !== id);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

export const isBookmarked = (id: number) => {
  const bookmarks = getBookmarks();
  return bookmarks.some((item: any) => item.id === id);
};