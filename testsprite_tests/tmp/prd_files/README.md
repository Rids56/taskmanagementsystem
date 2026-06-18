# Test Management System - Frontend

A full-stack test creation and management platform built with modern React + Redux architecture. This project demonstrates enterprise-level patterns including state management, API integration, form validation, and responsive UI design.

**Status:** Practical project for interview

---

## 🎯 Project Overview

A **5-page test management application** that allows educators and administrators to:

1. Authenticate users securely
2. Manage tests (Create, Read, Update, Delete)
3. Add MCQ questions with options and explanations
4. Configure test settings (marking scheme, duration, difficulty levels)
5. Publish tests with preview functionality

**Key Features:**

- JWT-based authentication with secure token management
- Dynamic form validation using Zod schemas
- Hierarchical subject → topics → sub-topics structure
- Bulk CSV import for questions (with Papa Parse)
- Real-time API integration with Redux Saga
- Responsive Material UI components
- Table-based test management with Material React Table

---

## 🏗️ Tech Stack & Architecture

| Layer                | Technology        | Purpose                                                  |
| -------------------- | ----------------- | -------------------------------------------------------- |
| **UI Framework**     | React 19          | Component-based UI with React Compiler auto-optimization |
| **Type Safety**      | TypeScript        | Full static typing for code safety                       |
| **Build Tool**       | Vite              | Fast dev server & optimized bundling                     |
| **State Management** | Redux Toolkit     | Centralized application state                            |
| **Async Handling**   | Redux Saga        | Complex async flows & side effects                       |
| **Routing**          | React Router v7   | Modern declarative routing                               |
| **UI Components**    | Material UI (MUI) | Professional component library                           |
| **Form Handling**    | React Hook Form   | Efficient form state management                          |
| **Validation**       | Zod               | Schema-based runtime validation                          |
| **HTTP Client**      | Axios             | API requests with interceptors                           |
| **Utilities**        | Lodash            | Data manipulation helpers                                |

---

## 📁 Project Structure

```
src/
├── main.tsx                        # App entry point + Redux Provider + Router
├── hooks.ts                        # Typed useAppDispatch, useAppSelector
│
├── pages/                          # Page components (5-page flow)
│   ├── login/                      # Page 1: Authentication
│   │   ├── Login.tsx               # Login form component
│   │   └── model/schema.ts         # Zod validation schema
│   │
│   ├── dashboard/                  # Page 2: Test List Management
│   │   ├── Dashboard.tsx           # Main dashboard container
│   │   └── TestListTable.tsx       # Material React Table for tests
│   │
│   ├── taskCreate/                 # Page 3: Create/Edit Test
│   │   ├── TaskCreate.tsx          # Test creation form
│   │   ├── TestTypeTabs.tsx        # Test type selector
│   │   └── model/create.schema.ts  # Test form validation
│   │
│   ├── addQuestion/                # Page 4: Add Questions
│   │   ├── AddQuestion.tsx         # Question management container
│   │   ├── AddQuestionForm.tsx     # Question form component
│   │   ├── PublishSettings.tsx     # Test publish configuration
│   │   ├── PublishTestPage.tsx     # Preview & publish page
│   │   ├── TestInfoCard.tsx        # Test details display
│   │   └── model/
│   │       ├── addQuestion.schema.ts # Question validation
│   │       └── publish.schema.ts    # Publish settings validation
│   │
│   ├── interfaceType.ts            # TypeScript interfaces (shared types)
│   └── NotFound.tsx                # 404 error page
│
├── components/                     # Reusable UI components
│   ├── CsvUploadButton.tsx         # CSV file upload (Papa Parse)
│   ├── DifficultyRadio.tsx         # Difficulty level selector
│   ├── LoaderOverlay.tsx           # Loading state overlay
│   └── layout/
│       ├── MainLayout.tsx          # Main layout wrapper
│       ├── navbar/Navbar.tsx       # Top navigation bar
│       └── sidebar/Sidebar.tsx     # Side navigation menu
│
├── routes/
│   └── router.tsx                  # React Router v7 route definitions
│
├── store/                          # Redux store configuration
│   ├── store.ts                    # configureStore setup
│   │
│   ├── slices/                     # Redux Toolkit slices (state + actions)
│   │   ├── authSlice.ts            # Auth state (login, token, user)
│   │   ├── testListSlice.ts        # Tests list state
│   │   ├── questionSlice.ts        # Questions state
│   │   ├── subjectSlice.ts         # Subjects dropdown data
│   │   ├── topicSlice.ts           # Topics dropdown data
│   │   └── subTopicSlice.ts        # Sub-topics dropdown data
│   │
│   ├── sagas/                      # Redux Saga side effects handlers
│   │   ├── rootSaga.ts             # Combines all sagas
│   │   ├── authSaga.ts             # Login, token management
│   │   ├── testListSaga.ts         # Fetch, create, update tests
│   │   ├── questionSaga.ts         # Add, edit, delete questions
│   │   ├── subjectSaga.ts          # Fetch subjects list
│   │   ├── topicSaga.ts            # Fetch topics by subject
│   │   └── subTopicSaga.ts         # Fetch sub-topics by topic
│   │
│   └── api/                        # API service layer (Axios)
│       ├── axios.ts                # Axios instance + interceptors
│       ├── authApi.ts              # /auth/* endpoints
│       ├── testList.ts             # /tests/* endpoints
│       ├── questionApi.ts          # /questions/* endpoints
│       ├── subjectApi.ts           # /subjects endpoints
│       ├── topicApi.ts             # /topics endpoints
│       └── subTopicApi.ts          # /sub-topics endpoints
│
├── theme/
│   ├── theme.ts                    # MUI theme configuration
│   └── ThemeProvider.tsx           # Theme provider wrapper
│
├── utils/
│   └── getDirtyValues.ts           # Helper to track form changes
│
└── assets/
    └── (images, icons, etc.)
```

---

## 🔄 Application Flow (5-Page User Journey)

### Page 1: Login

- User authentication with userId + password
- JWT token stored in localStorage
- Form validation with Zod schema
- Redirects to dashboard on success

### Page 2: Dashboard

- Display all created tests in table format
- Columns: Test Name, Subject, Topics, Status, Created Date
- Actions: Edit, View, Delete, Create New Test button
- Uses Material React Table for sorting/filtering

### Page 3: Create/Edit Test

- Form fields: Name, Subject, Test Type, Topics, Sub-topics, Difficulty
- Marking scheme: Correct marks, Wrong marks, Unattempted marks
- Duration & total marks configuration
- Save as Draft option
- Next button → Add Questions page

### Page 4: Add Questions

- Add MCQ questions one by one
- Each question: text, 4 options, correct answer, explanation
- Optional: Difficulty, Topic, Sub-topic, Media URL
- Add another question or Save & Continue
- Lists all added questions with edit/delete

### Page 5: Preview & Publish

- Complete test overview with all details
- Display all questions with options
- Edit test or questions functionality
- Publish button → Changes status to "live"
- Redirect to dashboard

---

## 📊 State Management Architecture

### Redux Flow Pattern

```
Component (UI)
    ↓ dispatch(action)
Redux Action Creator
    ↓
Redux Saga (watcherSaga)
    ↓ call(apiFunction)
API Service (Axios)
    ↓ response
Redux Saga
    ↓ put(resultAction)
Redux Slice (Reducer)
    ↓ state update
Component (re-renders with new state)
```

### State Structure

```javascript
store = {
  auth: {
    token: string | null,
    user: User | null,
    loading: boolean,
    error: string | null
  },
  testList: {
    tests: Test[],
    loading: boolean,
    error: string | null
  },
  questions: {
    items: Question[],
    loading: boolean,
    error: string | null
  },
  subjects: { data: Subject[], loading: boolean },
  topics: { data: Topic[], loading: boolean },
  subTopics: { data: SubTopic[], loading: boolean }
}
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
yarn install

# Start dev server (Vite hot reload)
yarn start:web

# Build for production
yarn build:web

# Format code with Prettier
yarn format
```

Server runs at: `http://localhost:3000`

---

## 🔑 Key Architectural Patterns

### 1. **Redux Saga for Side Effects**

- All API calls handled in sagas (not components)
- Enables testability and separation of concerns
- Example: `authSaga.ts` handles login flow

### 2. **Type-Safe Redux with TypeScript**

- Slice + actions automatically typed
- Hooks provide typed dispatch/selector
- Zero runtime type errors possible

### 3. **Form Validation with Zod**

- Schema-based validation (create.schema.ts, schema.ts)
- Type-safe form handling with React Hook Form
- Reusable validation logic

### 4. **React Compiler Optimization**

- Enabled in `vite.config.ts`
- Auto-memoizes components (no manual useMemo/useCallback needed)
- Automatic performance optimization

### 5. **Axios Interceptors**

- JWT token automatically added to all requests
- Centralized error handling
- Request/response transformation

---

## 📋 How to Add a New Feature

### Example: Add a new "Reports" page

**Step 1:** Create Redux Slice

```bash
# src/store/slices/reportsSlice.ts
```

**Step 2:** Create Saga

```bash
# src/store/sagas/reportsSaga.ts
```

**Step 3:** Register in Store

- Add slice to `store.ts` reducers
- Add saga watcher to `rootSaga.ts`

**Step 4:** Create Page Component

```bash
# src/pages/reports/Reports.tsx
```

**Step 5:** Add Route

- Update `src/routes/router.tsx`

---

## 🔌 API Integration

### Base URL

```
http://your-backend-url/api
```

### Key Endpoints

| Method | Endpoint                | Purpose                  |
| ------ | ----------------------- | ------------------------ |
| POST   | `/auth/login`           | User authentication      |
| GET    | `/tests`                | Fetch all tests          |
| POST   | `/tests`                | Create new test          |
| PUT    | `/tests/:id`            | Update test              |
| POST   | `/questions/bulk`       | Add multiple questions   |
| POST   | `/questions/fetchBulk`  | Fetch multiple questions |
| GET    | `/subjects`             | Get subjects list        |
| GET    | `/topics/subject/:id`   | Get topics by subject    |
| GET    | `/sub-topics/topic/:id` | Get sub-topics           |

### Authentication

All endpoints (except login) require JWT token:

```
Authorization: Bearer <jwt-token>
```

---

## 🎨 UI & Component Library

- **Material UI (MUI):** Material Design components
- **Material React Table:** Advanced data tables with sorting/filtering
- **Emotion:** Styled component library (MUI uses it)
- **Icons:** @mui/icons-material

---

## 📝 Code Quality

### Prettier Configuration

```bash
yarn format   # Auto-formats all src files
```

### TypeScript

- Strict mode enabled in `tsconfig.json`
- Full type coverage across slices, sagas, components

### Form Validation

- Zod schemas for all forms
- React Hook Form for efficient state management

---

## 🧪 Testing Considerations

**Testable Architecture:**

- Sagas isolated from components (easy to mock)
- Pure reducer functions (deterministic)
- Services layer for APIs (mockable)

**Example Test Pattern:**

- Mock Redux store with test data
- Render component with `<Provider store={mockStore}>`
- Assert rendered output

---

## 📚 Learning Resources Used

- **Redux Toolkit:** Modern Redux with less boilerplate
- **Redux Saga:** Handle side effects elegantly
- **React Router v7:** Latest routing patterns
- **Zod:** Runtime schema validation
- **Material UI:** Professional UI components

---

## 🤝 Interview Highlights

**Demonstrate to Interviewers:**

1. ✅ **Scalable Architecture** - Clear separation of concerns (pages, components, store, api)
2. ✅ **State Management** - Redux + Saga for complex async flows
3. ✅ **Type Safety** - Full TypeScript coverage with interfaces
4. ✅ **Form Handling** - React Hook Form + Zod validation
5. ✅ **API Integration** - Axios with interceptors & error handling
6. ✅ **Performance** - React Compiler auto-optimization
7. ✅ **Code Quality** - Prettier formatting, structured folder organization
8. ✅ **Real Features** - Full CRUD operations, authentication, file upload (CSV)

---

**Last Updated:** June 2026
**Author:** Riddhi Sanghani
