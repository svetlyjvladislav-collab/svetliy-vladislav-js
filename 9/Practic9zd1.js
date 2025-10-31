createUser('Иван Иванов', 'ivan@example.com', '+79991234567')
  .then(user => console.log('Успешно:', user))
  .catch(error => console.error('Ошибка:', error));