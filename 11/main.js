const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  try {
    console.log("=== РЕШЕНИЕ ТРЕХ ЗАДАЧ ===");
    console.log("1. Сохранение текста в файл");
    console.log("2. Анализ файла data.txt");
    console.log("3. Логирование ввода до команды 'stop'");
    console.log("===========================\n");

    await task1();
    await task2();
    await task3();
    
  } catch (error) {
    console.error("Произошла ошибка:", error);
  } finally {
    rl.close();
  }
}

// Задача 1: 
async function task1() {
  console.log("\n--- ЗАДАЧА 1 ---");
  console.log("Сохраните текст в файл output.txt");
  
  return new Promise((resolve) => {
    rl.question("Введите строку текста: ", async (text) => {
      try {
        // Сохраняем в файл (перезаписываем если существует)
        await fs.writeFile("output.txt", text, "utf-8");
        console.log("✓ Текст сохранен в файл output.txt");
        resolve();
      } catch (error) {
        console.error("✗ Ошибка при записи в файл:", error);
        resolve();
      }
    });
  });
}
 
// Задача 2: 
async function task2() {
  console.log("\n--- ЗАДАЧА 2 ---");
  console.log("Анализ файла data.txt");
  
  try {
    //
    const content = await fs.readFile("data.txt", "utf-8");
    
    // Количество строк
    const lines = content.split('\n');
    const lineCount = lines.length;
    
    // Количество символов
    const charCount = content.length;
    
    console.log("✓ Анализ файла data.txt:");
    console.log("Количество строк:", lineCount);
    console.log("Количество символов:", charCount);
   
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("✗ Файл data.txt не найден");
      console.log("  Создайте файл data.txt с некоторым содержимым");
    } else {
      console.error("✗ Ошибка при чтении файла:", error);
    }
  }
};

// Задача 3: 

async function task3() {
  console.log("\n--- ЗАДАЧА 3 () ---");
  console.log("Логирование ввода. Для завершения введите 'stop'");
  
  return new Promise(async (resolve) => {
    try {
      let continueLoop = true;
      
      while (continueLoop) {
        const userInput = await new Promise((innerResolve) => {
          rl.question("> ", innerResolve);
        });
        
        if (userInput.toLowerCase() === "stop") {
          console.log("✓ Логирование завершено");
          continueLoop = false;
        } else {
          // Добавляем строку в файл (режим append)
          await fs.appendFile("log.txt", userInput + "\n", "utf-8");
          console.log("  ✓ Строка добавлена в log.txt");
        }
      }
      resolve();
    } catch (error) {
      console.error("✗ Ошибка при логировании:", error);
      resolve();
    }
  });
}

// Запуск
main();