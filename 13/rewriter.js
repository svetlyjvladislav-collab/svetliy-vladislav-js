const fs = require('fs');

// Проверяем, передан ли аргумент с именем файла
if (process.argv.length < 3) {
    console.error('Использование: node rewriter.js <имя_файла.txt>');
    process.exit(1);
}

const fileName = process.argv[2];

// Проверяем существование файла
if (!fs.existsSync(fileName)) {
    console.error(`Файл "${fileName}" не найден.`);
    process.exit(1);
}

// Читаем существующий файл для контекста
try {
    const existingContent = fs.readFileSync(fileName, 'utf8');
    console.log('=== СОДЕРЖИМОЕ ФАЙЛА ===');
    console.log(existingContent);
    console.log('=========================');
} catch (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    process.exit(1);
}

// Создаем интерфейс для чтения ввода пользователя
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Введите новый текст для файла (введите "save" для сохранения и выхода):');
console.log('----------------------------------------');

let newText = '';
let lines = [];

// Функция для обработки ввода
function processInput() {
    rl.on('line', (input) => {
        if (input === 'save') {
            // Сохраняем и выходим
            saveAndExit();
        } else {
            lines.push(input);
        }
    });
}

// Функция для сохранения и выхода
function saveAndExit() {
    newText = lines.join('\n');
    
    try {
        // Полностью перезаписываем файл новым текстом
        fs.writeFileSync(fileName, newText, 'utf8');
        console.log(`Файл "${fileName}" успешно перезаписан.`);
        rl.close();
        process.exit(0);
    } catch (err) {
        console.error(`Ошибка при записи файла: ${err.message}`);
        rl.close();
        process.exit(1);
    }
}

processInput();