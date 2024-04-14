# votechain
## Настройка приложения для голосования

1 Настройка Hardhat

1.1 Установка библиотеки hardhat
```
npm install --save-dev hardhat
```
1.2 Инициализация проекта
```
npm init
npx hardhat init
```
1.3 Запуск компиляции
```
npx hardhat compile
```

2 Создать Свою сеть с ip ```http://127.0.0.1:8545/```
### Авторизовались на MetaMask → “Добавить счет” → “Импортировать счет” → Private Key

3 Добавление MetaMask к Remix
### Добавляем контракт в поле contracts и выбираем его
### Дальше Компилируем контракт
### Выбмраем Окружающую среду MetaMask
### Производим Deploy

4 Подключаем Frontend (в папке public)
4.1 Скопируем ABI (находится в SOLIDITY COMPILER) в файл abi.js
4.2 Дальше копируем адресс контракта (находится в DEPLOY & RUN TRANSACTIONS) и записываем в initContractX.js
4.3 Перейти в папку public
```
cd ./public
```
4.4 Инициализировать проект
```
npm i
```
4.5 Запустить 
```
npm run start
```
