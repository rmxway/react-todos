# React Todos

Приложение для управления заметками с авторизацией, темами и анимациями.

## ⚙️ Технологии

- **React 18** + **TypeScript**
- **Next.js 14** — сборка, dev-сервер, маршрутизация (App Router)
- **Feature-Sliced Design** — архитектура проекта
- **Redux Toolkit** — глобальное состояние (тема, alert)
- **TanStack React Query** — кэширование и работа с API заметок
- **NextAuth** — авторизация
- **Styled Components** — стили
- **Framer Motion** — анимации
- **Formik** + **Yup** — формы и валидация
- **FontAwesome** — иконки
- **Firebase Admin** — бэкенд (хранение данных)
- **Vitest** + **Testing Library** — тестирование

## Возможности

### 📝 Notes (главная страница)

- Добавление, удаление заметок
- Редактирование заголовка по клику на заметку
- Отметка задач как выполненных
- Удаление всех заметок
- Поиск по заголовку заметки
- Фильтрация списка по статусу (все / активные / выполненные)
- Сортировка: по дате, по названию, по статусу
- Оптимистичные обновления (React Query)
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

## 🔧 Требования

- Node.js 18+ (рекомендуется LTS)
- Yarn 4.13+ (packageManager в `package.json`)

## ⚙️ Установка

```bash
# Клонирование репозитория
git clone <your-repo-url> react-todos
cd react-todos

# Установка зависимостей
yarn
```

## 🔑 Настройка окружения

1. Скопируйте файл `.env.local.example` в `.env.local`.
2. Заполните переменные окружения:
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` — данные сервисного аккаунта Firebase Admin.
   - `NEXTAUTH_SECRET` — секрет для NextAuth (можно сгенерировать через `openssl rand -base64 32`).
   - `NEXTAUTH_URL` — базовый URL приложения (по умолчанию `http://localhost:3000`).
   - при необходимости — `SESSION_MAX_AGE_MINUTES`.

## 🚀 Запуск

```bash
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
yarn test        # Запуск тестов (Vitest) в watch-режиме
yarn test:run    # Однократный прогон тестов
```

## 🧪 Тестирование

Проект использует **Vitest** и **Testing Library** для unit- и компонентных тестов:

- `src/store/slices/alertSlice.test.ts` — тесты Redux-слайса
- `src/features/notes/api/notes.test.ts` — тесты API заметок
- `src/features/notes/ui/note-form/NoteForm.test.tsx` — тесты формы
- `src/features/notes/ui/note-item/NoteItemContent.test.tsx` — тесты элемента заметки
- `src/shared/ui/select/Select.test.tsx` — тесты компонента Select
- `app/api/utils/` — тесты утилит API

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
├── AppShell.tsx        # Оболочка: Navbar, Alert, layout
├── Providers.tsx       # QueryClient, Session, Theme
├── StoreProvider.tsx
├── layout.tsx
├── page.tsx
└── ...

src/
├── features/
│   ├── alert/          # Глобальные уведомления
│   ├── auth/           # Авторизация (Navbar, формы, UserMenu)
│   └── notes/          # Заметки (форма, список, API, хуки React Query)
├── views/              # NotePage, ModalPage, SelectPage, MotionPage
├── shared/
│   ├── config/         # Темы, брейкпоинты, константы
│   ├── layouts/        # Container, Flex, Grid
│   ├── lib/            # Хуки, анимации
│   └── ui/             # Alert, Button, Checkbox, ErrorBoundary, ErrorMessage, Input, Modal, Select, Skeleton
├── store/              # Redux store и слайсы
├── lib/                # auth-options, firebase-admin, queryClient, registry
├── styles/             # Глобальные стили
└── types/              # TypeScript-типы
```

## 🌐 Деплой

Автодеплой настроен через [Vercel](https://vercel.com). При пуше в подключённый репозиторий (GitHub) приложение собирается и публикуется на Vercel. Для Next.js доступны preview-деплои для веток и production-деплой для основной ветки.
