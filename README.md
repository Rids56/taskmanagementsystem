# React Repo: Task Management System

**Stack:** React 19 + TypeScript + Vite + React Compiler + React Router v7 + Redux Toolkit + Redux Saga + Prettier

---

## Quick Start

```bash
## Please choose a version of "babel-plugin-react-compiler" from this list: 19.1.0-rc.1
yarn install
yarn run start:web
```

---

## Project Structure

```
src/
├── main.tsx                  # Entry — wraps app with Provider + RouterProvider
├── hooks.ts                  # Typed useAppDispatch / useAppSelector
├── routes/
│   └── router.tsx            # All routes defined here
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── NotFound.tsx
└── store/
    ├── store.ts              # configureStore — registers reducers + saga middleware
    ├── slices/
    │   └── counterSlice.ts   # createSlice — state + reducers
    └── sagas/
        ├── rootSaga.ts       # all() — combines all sagas
        └── counterSaga.ts    # takeEvery, call, put — async logic
```

---

## Mental Model (Interview-Ready)

### Redux Flow

```
Component → dispatch(action) → saga intercepts → call API → put(newAction) → reducer → state update → component re-renders
```

### Key Terms

| Term             | What it does                          |
| ---------------- | ------------------------------------- |
| `createSlice`    | Creates reducer + actions together    |
| `configureStore` | Sets up store with middleware         |
| `takeEvery`      | Listens for every matching action     |
| `call`           | Calls async function (like fetch)     |
| `put`            | Dispatches an action from inside saga |
| `all`            | Runs multiple sagas at the same time  |

### React Compiler

- Enabled via `babel-plugin-react-compiler` in `vite.config.ts`
- **No code changes needed** — it auto-memoizes (auto-optimizes) your components
- You don't need `useMemo` / `useCallback` manually anymore

### React Router v7

- Use `createBrowserRouter` — the modern way
- Add routes in `src/routes/router.tsx`
- `RouterProvider` goes in `main.tsx`

---

## Adding a New Feature (Pattern)

1. **New slice** → `src/store/slices/myFeatureSlice.ts`
2. **Register** → add to `store.ts` reducer object
3. **New saga** → `src/store/sagas/myFeatureSaga.ts`
4. **Register** → add watcher to `rootSaga.ts`
5. **New page** → `src/pages/MyPage.tsx`
6. **Add route** → `src/routes/router.tsx`

---

## Prettier

```bash
yarn run format   # Formats all files in src/
```

VSCode auto-formats on save (configured in `.vscode/settings.json`).
Requires **Prettier** extension installed in VSCode.
