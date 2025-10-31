
createPost('Мой первый пост', 'Это содержимое моего первого поста.', 1)
  .then(post => console.log('Успешно:', post))
  .catch(error => console.error('Ошибка:', error));