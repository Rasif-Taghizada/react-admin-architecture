# Admin Panel

A production-ready React admin panel starter with Ant Design, Redux Toolkit, role-based access, paginated data tables, file previews, i18n support, and a fully enforced component/service architecture.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Language | TypeScript 5.9 |
| UI Library | Ant Design 5 |
| State Management | Redux Toolkit 2 |
| Routing | React Router v7 |
| HTTP | Axios (single intercepted instance) |
| i18n | react-i18next (az / en / ru) |
| Charts | Highcharts |
| PDF | jsPDF |
| Realtime | SignalR |
| Icons | Ant Design Icons + Lucide React |

---

## Project Structure

```
src/
├── main.tsx              # Entry point — i18n loaded before App
├── App.tsx               # Redux Provider + Suspense + RouterProvider
├── assets/               # Static files
├── common/               # Shared across all modules
│   ├── components/
│   │   ├── shared/       # Reusable components (Table, Modal, Button, Notification...)
│   │   └── partials/     # Layout-level components (Menu, Spinner, 403, 404)
│   ├── libs/
│   │   ├── axiosInstance.ts   # Single Axios instance with interceptors
│   │   ├── constants.ts       # All API endpoint paths
│   │   └── services/          # One file per domain (authService, userService...)
│   ├── store/
│   │   └── slices/
│   │       ├── authSlices.ts   # User, tokens, loading, error
│   │       └── configSlice.ts  # Sidebar state, user role
│   ├── types/
│   │   └── index.ts      # All shared TypeScript interfaces
│   └── utils/
│       ├── constant/     # UI constants (sidebar width, button variants/sizes)
│       ├── hooks/        # useDebounce, useMoveBack
│       └── helper/       # getErrorMessage, validateName, formatDate
├── layouts/              # AppLayout, Header, Sider
├── modules/              # Feature modules
│   ├── auth/             # Login, Register pages + forms
│   ├── dashboard/        # Dashboard page
│   ├── users/            # Tenant list, user list, user detail
│   └── settings/         # Profile settings, password change
└── routers/              # Route definitions + ProtectedRoute + RoleGuard
```

---

## Getting Started

### Prerequisites

- Node.js 20+

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=http://localhost:3000/v1/
```

### Running the App

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Architecture Patterns

### Data Flow

```
User Action
    ↓
Page Component    — useState, useEffect, event handlers, JSX
    ↓
Service function  — plain async fn, calls axiosInstance, returns response.data
    ↓
axiosInstance     — injects Bearer token + X-TRACE-ID, handles 401 auto-refresh
    ↓
Redux Thunk       — only for auth (login/logout/getProfile) + UI config
```

### Key Conventions

**Services** — plain async functions in `common/libs/services/`. Named `{verb}{Domain}Service`. Never call axios directly from components.

**API Endpoints** — all paths defined as objects in `common/libs/constants.ts`. Never hardcode URLs in service functions.

**Types** — shared interfaces in `common/types/index.ts`. Module-specific types in `modules/{feature}/types/index.ts`. No `any`.

**Redux** — exactly two slices: `auth` and `config`. Feature data (lists, selected items, loading state) always stays in component-level `useState`.

**Pagination** — always URL-based via `useSearchParams`. Keys: `PageNumber`, `PageSize`. Page resets to `1` on search or filter change.

**Search** — always debounced with `useDebounce(value, 500)`.

**Notifications** — only `openNotification()`. `message.error()` and raw `notification` are banned.

**Tables** — always use `<TableLists>` wrapper with `ColumnsType<T>` typed columns.

**Modals** — always use `<AppModal>` wrapper.

**Routing** — all page components lazy-loaded with `lazy()`.

Full rules in [`CLAUDE.md`](./CLAUDE.md).

---

## Authentication

- Tokens stored in `localStorage`: `access_token`, `refresh_token`
- Axios request interceptor injects `Authorization: Bearer {token}` automatically
- On 401 response: refresh token is used to get a new access token and the original request is retried
- On refresh failure: tokens are cleared and `logout()` is dispatched

### Role Detection

Role is determined from the user profile's `tenantId`:

| Condition | Role |
|---|---|
| `tenantId` is null or empty | `ADMIN` |
| `tenantId` is `00000000-0000-0000-0000-000000000000` | `ADMIN` |
| Any other `tenantId` | `USER` |

---

## i18n

Supports three languages: **Azerbaijani** (`az`), **English** (`en`), **Russian** (`ru`).

Selected language is persisted to `localStorage` under the key `lang`.

```typescript
const { i18n } = useTranslation();
i18n.changeLanguage('az');
localStorage.setItem('lang', 'az');
```

---

## Adding a New Feature Module

1. Add shared types to `common/types/index.ts`
2. Add API endpoints to `common/libs/constants.ts`
3. Create `common/libs/services/{feature}Service.ts`
4. Create `src/modules/{feature}/` with:
   - `types/index.ts`
   - `pages/index.tsx` (outlet)
   - `pages/{featureLists}/index.tsx`
   - `components/{Component}/index.tsx` + `type.ts`
5. Add lazy route to `routers/index.tsx`
6. Add menu entry to `common/components/partials/menu/`

---

## Shared Components

| Component | Location | Usage |
|---|---|---|
| `<TableLists>` | `common/components/shared/table` | All paginated tables |
| `<AppModal>` | `common/components/shared/modals` | All modals |
| `<AppButton>` | `common/components/shared/button` | Custom-styled buttons |
| `<TableFilter>` | `common/components/shared/tableFilter` | Search + status filter bar |
| `openNotification()` | `common/components/shared/notification` | All user-facing feedback |

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview production build locally
npm run lint      # ESLint
```
