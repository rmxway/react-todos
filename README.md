# React Todos

Приложение для управления заметками с авторизацией, темами и анимациями.

## ⚙️ Технологии

- **React 18** + **TypeScript**
- **Next.js 14** — сборка, dev-сервер, маршрутизация (App Router)
- **Feature-Sliced Design** — архитектура проекта
- **Redux Toolkit** — состояние приложения
- **NextAuth** — авторизация
- **Styled Components** — стили
- **Framer Motion** — анимации
- **Formik** + **Yup** — формы и валидация
- **Firebase** — бэкенд (при необходимости)

## Возможности

### 📝 Notes (главная страница)

- Добавление, удаление заметок
- Отметка задач как выполненных
- Удаление всех заметок
- API-маршруты для работы с данными (`/api/todos`)

### 👤 Пользователи

- Регистрация и вход (NextAuth)
- Отдельные заметки для каждого пользователя
- Выход из аккаунта

### 🎨 UI

- Светлая и тёмная тема (cookie)
- Адаптивная навигация с мобильным меню
- Система уведомлений (Alert)
- Плавные переходы между страницами

### 📄 Страницы

| Путь      | Описание                                           |
| --------- | -------------------------------------------------- |
| `/`       | Notes — список заметок                             |
| `/modal`  | Modal — пример модального окна                     |
| `/select` | Select — кастомный компонент выбора                |
| `/motion` | Motion — анимации на основе drag (Framer Motion)   |

## 🚀 Запуск

```bash
# Установка зависимостей
yarn install

# Режим разработки
yarn dev

# Сборка
yarn build

# Запуск production-сборки
yarn start
```

## 🛠 Дополнительные команды

```bash
yarn typecheck   # Проверка типов TypeScript
yarn lint        # Проверка ESLint (src, app)
yarn lint:fix    # Исправление ошибок ESLint
yarn pretty      # Форматирование кода (Prettier)
```

## 📁 Структура проекта (FSD + Next.js)

```
app/                    # Next.js App Router
├── api/                # API Routes
│   ├── auth/           # NextAuth
│   ├── register/       # Регистрация
│   └── todos/          # CRUD заметок
├── motion/
├── modal/
├── select/
├── layout.tsx
├── page.tsx
├── StoreProvider.tsx
└── ...

src/
├── features/
│   ├── alert/          # Глобальные уведомления
│   ├── auth/           # Авторизация (Navbar, формы, UserMenu)
│   └── notes/          # Заметки (форма, список, элементы)
├── views/              # Страницы-представления (NotePage, ModalPage, SelectPage, MotionPage)
├── shared/
│   ├── config/         # Темы, брейкпоинты, константы
│   ├── layouts/        # Container, Flex, Grid
│   ├── lib/            # Хуки, анимации
│   └── ui/             # Alert, Button, Checkbox, Input, Modal, Select, ErrorMessage
├── store/              # Redux store и слайсы
├── lib/                # auth-options, firebase-admin, registry (Styled Components)
├── styles/             # Глобальные стили
└── types/              # TypeScript-типы
```

## 🌐 Деплой

Автодеплой настроен через [Vercel](https://vercel.com). При пуше в подключённый репозиторий (GitHub) приложение собирается и публикуется на Vercel. Для Next.js доступны preview-деплои для веток и production-деплой для основной ветки.
