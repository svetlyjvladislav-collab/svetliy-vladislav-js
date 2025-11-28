const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const newUser = {};

function inputPhone() {
  rl.question('Ваш телефон: ', (phone) => {
    // Создаём регулярное выражение для телефона
    const phoneRegex = /^(?:\+7|8)?[\s\-\.]?\(?\d{3}\)?[\s\-\.]?\d{3}[\s\-\.]?\d{2}[\s\-\.]?\d{2}$/;

    if (phoneRegex.test(phone)) {
      newUser.phone = phone.trim();
      inputName(); // Следующий шаг
    } else {
      console.log('❌ Телефон неверный, попробуйте ещё раз.');
      inputPhone(); // Вызываем эту же функцию заново
    }
  });
}

// Ввод имени
function inputName() {
  rl.question('Напишите ваше имя: ', (name) => {
    const nameRegex = /^[A-Za-zА-Яа-яЁё\- ]{2,30}$/u;

    name = name.trim();
    if (nameRegex.test(name)) {
      newUser.name = name;
      inputEmail(); // Переходим к вводу email
    } else {
      console.log('❌ Имя неверное, попробуйте ещё раз.');
      inputName();
    }
  });
}

// Ввод email
function inputEmail() {
  rl.question('Ваш email: ', (email) => {
    
    const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z]{2,6}$/;
    
    email = email.trim();
    if (emailRegex.test(email)) {
      newUser.email = email;
      inputCity(); // Переходим к вводу города
    } else {
      console.log('❌ Email неверный, попробуйте ещё раз.');
      inputEmail();
    }
  });
}

// Ввод города
function inputCity() {
  rl.question('Ваш город: ', (city) => {
    
    const cityRegex = /^[A-Za-zА-Яа-яЁё\-\s]{2,}$/u;
    
    city = city.trim();
    if (cityRegex.test(city)) {
      newUser.city = city;
      inputAge(); 
    } else {
      console.log('❌ Город неверный, попробуйте ещё раз. (Только буквы, дефис и пробелы, минимум 2 символа)');
      inputCity();
    }
  });
}

// Ввод возраста
function inputAge() {
  rl.question('Напишите ваш возраст: ', (ageInput) => {
    const ageRegex = /^(0?[1-9]|[1-9][0-9]|1[0-4][0-9]|150)$/; // Разрешён возраст от 1 до 150
    const age = parseInt(ageInput);
    
    // Проверяем строку регулярным выражением И что возраст в разумных пределах
    if (ageRegex.test(ageInput.trim()) && age >= 1 && age <= 150) {
      newUser.age = age;
      
      // Выводим всю собранную информацию о пользователе
      console.log('\n✅ Новый пользователь:');
      console.log('-------------------');
      console.log(`Телефон: ${newUser.phone}`);
      console.log(`Имя: ${newUser.name}`);
      console.log(`Email: ${newUser.email}`);
      console.log(`Город: ${newUser.city}`);
      console.log(`Возраст: ${newUser.age}`);
      console.log('-------------------');
      
      rl.close();
    } else {
      console.log('❌ Возраст неверный, попробуйте ещё раз. (Допустимый возраст: 1-150)');
      inputAge();
    }
  });
}

// Вызываем функцию для ввода телефона
inputPhone();