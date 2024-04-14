# votechain
## Настройка приложения для голосования

1 Настройка Hardhat

* Установка библиотеки hardhat
```
npm install --save-dev hardhat
```
* Инициализация проекта
```
npm init
npx hardhat init
```
* Запуск компиляции
```
npx hardhat compile
```

2 Создать Свою сеть с ip ```http://127.0.0.1:8545/```
###### Авторизовались на MetaMask → “Добавить счет” → “Импортировать счет” → Private Key

3 Добавление MetaMask к Remix
* Добавляем контракт в поле contracts и выбираем его
* Дальше Компилируем контракт
* Выбмраем Окружающую среду MetaMask
* Производим Deploy

4 Подключаем Frontend (в папке public)
* Скопируем ABI (находится в SOLIDITY COMPILER) в файл abi.js
* Дальше копируем адресс контракта (находится в DEPLOY & RUN TRANSACTIONS) и записываем в initContractX.js
* Перейти в папку public
```
cd ./public
```
* Инициализировать проект
```
npm i
```
* Запустить 
```
npm run start
```
