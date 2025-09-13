# Meme website

# Разработка
Для запуска проекта требуется установленный bun и git 

## Установка bun на Windows
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```
Проверка установки
```powershell
bun --version
```

## Запуск проекта 
### Клонирование проекта
```powershell
git clone https://github.com/SiegfriedSchmidt/MemeWebsite.git
cd MemeWebsite
```

### Запуск сервера разработки для фронтенда
в новом окне терминала
```powershell
cd frontend
bun i
bun run dev
```

### Запуск сервера бэкенд
в новом окне терминала
```powershell
cd backend
bun i
bunx drizzle-kit generate
bun run dev
```

### Сайт будет доступен по ссылке [http://localhost:8000](http://localhost:8000)

