# Admin Panel — Project Rules

Read this file on every session. Every line of code you write must follow these rules.
All rules are derived from this project's actual codebase — nothing generic.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Language | TypeScript 5.9 |
| UI Library | Ant Design 5 |
| State | Redux Toolkit 2 |
| Routing | React Router v7 |
| HTTP | Axios (single custom instance) |
| i18n | react-i18next (az / en / ru) |
| Charts | Highcharts + highcharts-react-official |
| Icons | Ant Design Icons + Lucide React |
| PDF | jsPDF |
| Realtime | SignalR (`@microsoft/signalr`) |

---

## Folder Structure

```
src/
├── main.tsx                        # Entry point — imports i18n and applies saved theme early
├── App.tsx                         # Redux Provider + ThemedApp + ConfigProvider + RouterProvider
│
├── assets/                         # Static files (icons, images)
│
├── common/                         # Shared across ALL modules
│   ├── components/
│   │   ├── shared/                 # Reusable atomic/molecular components
│   │   │   ├── button/             # AppButton — always use instead of native <button>
│   │   │   │   ├── index.tsx
│   │   │   │   └── type.ts
│   │   │   ├── table/              # TableLists — always use instead of raw <Table>
│   │   │   │   └── index.tsx
│   │   │   ├── modals/             # AppModal — always use instead of raw <Modal>
│   │   │   │   ├── index.tsx
│   │   │   │   ├── type.ts
│   │   │   │   └── delete/
│   │   │   ├── notification/       # openNotification() — only notification system
│   │   │   │   └── index.tsx
│   │   │   ├── tableFilter/        # Search + status filter bar
│   │   │   │   └── index.tsx
│   │   │   ├── breadcrumb/
│   │   │   └── selectToolbar/
│   │   └── partials/               # Page-level composite components
│   │       ├── spinner/
│   │       ├── menu/
│   │       ├── 403/
│   │       ├── 404/
│   │       └── error/
│   │
│   ├── libs/
│   │   ├── axiosInstance.ts        # Single axios instance — never import axios directly
│   │   ├── constants.ts            # ALL API endpoint paths live here
│   │   └── services/               # One file per domain
│   │       ├── authService.ts
│   │       ├── userService.ts
│   │       ├── tenantService.ts
│   │       └── ...
│   │
│   ├── store/
│   │   ├── index.ts                # RootState, AppDispatch exports
│   │   └── slices/
│   │       ├── authSlices.ts       # Auth state — user, tokens, loading, error
│   │       └── configSlice.ts      # UI config — sidebarCollapsed, userRole, themeMode
│   │
│   ├── types/
│   │   └── index.ts                # ALL shared interfaces/types live here
│   │
│   └── utils/
│       ├── constant/
│       │   ├── config.ts           # SIDEBAR_WIDTH, VARIANTS, SIZES
│       │   └── index.ts            # statusOptions, successMessages, errorMessages
│       ├── hooks/
│       │   ├── useDebounce.ts      # useDebounce(value, 500)
│       │   └── useMoveBack.ts      # navigate(-1) helper
│       └── helper/
│           ├── error.ts            # getErrorMessage(), validateName()
│           ├── formatDate.ts       # formatDate(str, withTime) → az-AZ locale
│           └── index.ts            # validateEmail, base64ToText, downloadBlobFile
│
├── layouts/
│   ├── AppLayout.tsx               # Root layout with error boundary + Outlet
│   ├── Sider.tsx                   # Sidebar — 230px / 80px collapsed
│   └── Header.tsx                  # Fixed header — search, toggle, logout
│
├── modules/                        # Feature modules — one per domain
│   └── {feature}/
│       ├── types/
│       │   └── index.ts            # Feature-specific interfaces
│       ├── components/
│       │   └── {ComponentName}/
│       │       ├── index.tsx
│       │       └── type.ts         # Props interface
│       └── pages/
│           ├── index.tsx           # Outlet wrapper
│           └── {pageName}/
│               └── index.tsx       # Page component
│
└── routers/
    ├── index.tsx                   # createBrowserRouter — all routes
    └── protectedRoute/
        ├── index.tsx
        ├── roleGuard.tsx
        └── type.ts
```

---

## Data Flow

```
User Action
    ↓
Page Component      ← useState, useEffect, handlers, JSX layout
    ↓
Service function    ← plain async fn in common/libs/services/
    ↓
axiosInstance       ← adds Bearer token + X-TRACE-ID, handles 401 refresh
    ↓
Redux / config      ← auth thunks + config reducers (userRole/sidebar/themeMode)
```

Everything else (feature data, loading state, modal state) stays in component-level `useState`.

---

## Rules by Topic

### Imports — `@/` Alias

```typescript
// ✅ Project imports always use the src alias
import AppButton from '@/common/components/shared/button';
import { getUsersService } from '@/common/libs/services/userService';
import type { ApiUser } from '@/modules/users/types';

// ✅ Packages use package names
import { useTranslation } from 'react-i18next';

// ❌ Avoid deep relative imports and node_modules paths
import AppButton from '../../../../common/components/shared/button';
import { useTranslation } from '../../../../../node_modules/react-i18next';
```

- `@` maps to `src` in `vite.config.ts` and `tsconfig.app.json`
- Use relative imports only for same-folder CSS modules/assets when it is clearly local
- Never import from `node_modules/...` directly

---

### HTTP — Axios

```typescript
// ✅ Always import from axiosInstance
import axios from '@/common/libs/axiosInstance';

const getFeatureService = async (params = {}) => {
  const response = await axios.get(feature.all, { params });
  return response.data;
};

// ❌ Never import axios directly
import axios from 'axios';

// ❌ Never use fetch()
const data = await fetch('/api/feature').then(r => r.json());
```

- One instance only — `common/libs/axiosInstance.ts`
- All errors are caught by the response interceptor → shown via `openNotification()`
- 401 triggers automatic token refresh before retrying the request
- Request interceptor injects `Authorization: Bearer {token}` + `X-TRACE-ID`

---

### API Endpoints — constants.ts

```typescript
// ✅ Always define endpoints in common/libs/constants.ts
const feature = {
  all: 'Feature/features',
  byId: (id: string) => `Feature/features/${id}`,
  create: 'Feature/features/create',
  update: (id: string) => `Feature/features/${id}`,
  delete: (id: string) => `Feature/features/${id}`,
};

export { auth, user, tenants, feature };

// Service uses it:
import { feature } from '@/common/libs/constants';
await axios.get(feature.byId(id));

// ❌ Never hardcode URLs in service functions
await axios.get(`Feature/features/${id}`);
```

---

### Service Functions

```typescript
// ✅ Correct — common/libs/services/featureService.ts
import axios from '@/common/libs/axiosInstance';
import { feature } from '@/common/libs/constants';
import type { CreateFeatureData, FeatureItem } from '@/common/types';

const getFeaturesService = async (params = {}) => {
  const response = await axios.get(feature.all, { params });
  return response.data;
};

const getFeatureByIdService = async (id: string) => {
  const response = await axios.get(feature.byId(id));
  return response.data;
};

const createFeatureService = async (data: CreateFeatureData) => {
  const response = await axios.post(feature.create, data);
  return response.data;
};

const updateFeatureStatusService = async (id: string, status: number) => {
  const response = await axios.patch(feature.status(id, status));
  return response.data;
};

export { getFeaturesService, getFeatureByIdService, createFeatureService };
```

- Naming: `{get|post|put|patch|delete}{Domain}Service`
- Plain async functions — no classes, no DI
- Returns `response.data` — no transformation here
- File per domain: one `featureService.ts`, not `featureGetService.ts`
- No `data: any` — define the actual type

---

### Types

```typescript
// ✅ Shared types → common/types/index.ts
interface FeatureItem {
  id: string;
  name: string;
  status: number;
  createdAt: string;
  description: string | null;
}

type CreateFeatureData = {
  name: string;
  description?: string;
};

export type { FeatureItem, CreateFeatureData };

// ✅ Module-specific types → modules/feature/types/index.ts
interface FeaturePageState {
  selectedId: string | null;
}

// ❌ Never define interfaces inside component files
const MyPage: React.FC = () => {
  interface LocalItem { ... }  // wrong — belongs in types/index.ts
};
```

- Shared interfaces → `common/types/index.ts`
- Module-specific → `modules/{feature}/types/index.ts`
- Nullable fields: `string | null` not `string | undefined`
- Never use `any` — unknown structure gets `unknown` + type guard

---

### Redux — When to Use

```typescript
// ✅ Use Redux for:
dispatch(login(credentials));
dispatch(getProfile());
dispatch(logout());
dispatch(toggleSidebarCollapsed());
dispatch(setThemeMode('dark'));
dispatch(setUserRole('ADMIN'));
dispatch(updateNotificationAccess(true));
dispatch(updateUser({ firstName: 'John' }));

// ✅ Read Redux state:
const user = useSelector((state: RootState) => state.auth.user);
const userRole = useSelector((state: RootState) => state.config.userRole);
const collapsed = useSelector((state: RootState) => state.config.sidebarCollapsed);
const themeMode = useSelector((state: RootState) => state.config.themeMode);

// ❌ Never put feature data in Redux:
// tenants list, users list, documents, loading state, modal visibility
// — these all belong in local useState
```

Redux has exactly two slices — `auth` and `config`. Do not add more slices unless the architecture is intentionally changed.

---

### Page Component Pattern

```typescript
const FeatureLists: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // ─── Pagination — always URL-based ─────────────────────────────
  const currentPage = Number(searchParams.get('PageNumber')) || 1;
  const pageSize = Number(searchParams.get('PageSize')) || 20;

  // ─── State ──────────────────────────────────────────────────────
  const [items, setItems] = useState<FeatureItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);

  const debouncedSearch = useDebounce(searchText, 500);

  // ─── Fetch ──────────────────────────────────────────────────────
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const params = {
        PageNumber: String(currentPage),
        PageSize: String(pageSize),
        ...(debouncedSearch && { name: debouncedSearch }),
        ...(statusFilter !== undefined && { Status: statusFilter }),
      };
      const { items, itemsCount } = await getFeaturesService(params);
      setItems(items);
      setTotal(itemsCount);
    } catch (error) {
      console.error('Error fetching features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage, pageSize, debouncedSearch, statusFilter]);

  // ─── Handlers ───────────────────────────────────────────────────
  const handlePageChange = (page: number, newPageSize: number) => {
    const isPageSizeChanged = newPageSize !== pageSize;
    setSearchParams({
      PageNumber: isPageSizeChanged ? '1' : page.toString(),
      PageSize: newPageSize.toString(),
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setSearchParams({ PageNumber: '1', PageSize: pageSize.toString() });
  };

  const handleStatusChange = (value: number | undefined) => {
    setStatusFilter(value);
    setSearchParams({ PageNumber: '1', PageSize: pageSize.toString() });
  };

  // ─── Render ─────────────────────────────────────────────────────
  return ( ... );
};
```

Key rules:
- Pagination state lives in URL (`useSearchParams`), never in `useState`
- Page/filter change → reset to `PageNumber: '1'`
- Debounce search with `useDebounce(value, 500)` — 500ms is the standard
- `finally { setIsLoading(false) }` — always release loading state
- `console.error` in catch — never `console.log`

---

### Table Pattern

```typescript
// ✅ Correct
const columns: ColumnsType<FeatureItem> = [
  {
    title: t('feature.name'),
    dataIndex: 'name',
    key: 'name',
    render: (value: string | null) => value || '-',
  },
  {
    title: t('feature.status'),
    dataIndex: 'status',
    key: 'status',
    render: (status: number) => getStatusTag(status),
  },
  {
    title: t('feature.created_at'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: string) => value ? new Date(value).toLocaleString() : '-',
  },
];

<TableLists
  columns={columns}
  data={items}
  total={total}
  handlePageChange={handlePageChange}
  currentPage={currentPage}
  pageSize={pageSize}
  loading={isLoading}
  pagination={true}
  rowKey="id"
  onRow={(record) => ({
    onClick: () => handleRowClick(record),
    style: { cursor: 'pointer' },
  })}
/>
```

- Always `ColumnsType<T>` — never `any[]`
- Nullable values: `render: (v) => v || '-'`
- Status rendering: always `getStatusTag(status)` helper
- `rowKey="id"` always
- Always use `<TableLists>` wrapper — never raw `<Table>` from Ant Design

---

### Status Tag Pattern

```typescript
// ✅ Standard getStatusTag — define this per feature with appropriate states
const getStatusTag = (status: number) => {
  const statusConfig: Record<number, { color: string; text: string }> = {
    0: { color: 'default', text: t('feature.inactive') },
    1: { color: 'success', text: t('feature.active') },
    2: { color: 'error', text: t('feature.suspended') },
    3: { color: 'warning', text: t('feature.pending') },
  };
  const config = statusConfig[status] ?? { color: 'default', text: t('feature.unknown') };
  return <Tag color={config.color}>{config.text}</Tag>;
};
```

---

### Notifications

```typescript
// ✅ Always use openNotification()
openNotification({
  type: 'success',
  title: t('feature.success'),
  content: t('feature.item_created'),
});

openNotification({
  type: 'error',
  title: t('common.error'),
  content: t('common.something_went_wrong'),
});

// ❌ Never use these — banned
message.success('Done');
message.error('Failed');
notification.open({ ... });
```

---

### Modals

```typescript
// ✅ Always use AppModal wrapper
<AppModal
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  title={t('feature.create_item')}
  footer={null}
  width={500}
>
  <FeatureFormContent onDone={handleDone} />
</AppModal>

// ❌ Never use raw Ant Design Modal
<Modal open={...} onCancel={...}>...</Modal>
```

---

### Forms — Ant Design Form

```typescript
const [form] = Form.useForm();

// Validate and get values:
const values = await form.validateFields();

// Reset:
form.resetFields();

// Set programmatically:
form.setFieldsValue({ firstName: user.firstName });

// Name validation (international letters, starts uppercase):
rules={[
  { required: true, message: t('form.required') },
  { validator: validateName('FieldLabel') },
]}
```

- `Form.useForm()` for any form with submit + validation
- `validateName()` from `common/utils/helper/error` for name fields
- Always `layout="vertical"`
- Disable save button when no changes: `disabled={!hasChanges}`

---

### Buttons

```typescript
// ✅ Use AppButton for custom-styled buttons
import AppButton from '@/common/components/shared/button';

<AppButton variant="primary" onClick={handleClick}>
  {t('common.save')}
</AppButton>

<AppButton variant="danger" icon={<DeleteOutlined />} onClick={handleDelete}>
  {t('common.delete')}
</AppButton>

<AppButton href="/some-path" variant="outline">
  {t('common.view')}
</AppButton>

// ✅ Ant Design Button is OK for form actions (Save/Cancel inside forms)
<Button type="primary" onClick={handleSave} loading={isSaving} disabled={!hasChanges}>
  {t('settings.save_changes')}
</Button>
```

---

### i18n

```typescript
// ✅
import { useTranslation } from 'react-i18next';
const { t, i18n } = useTranslation();
<Title>{t('feature.page_title')}</Title>

// Change language:
i18n.changeLanguage('az');
localStorage.setItem('lang', 'az');

// ❌ — direct node_modules import (existing bug — do not repeat)
import { useTranslation } from '../../../../../node_modules/react-i18next';

// ❌ — hardcoded text
<Title>İstifadəçilər</Title>
<Title>Users</Title>
```

- Always `'react-i18next'` as the import path — package name only
- Every user-facing string goes through `t('namespace.key')`
- Supported languages: `az`, `en`, `ru`
- Language persisted to localStorage: key `lang`

---

### Theme — Light / Dark

```typescript
// ✅ Theme state lives in configSlice
const themeMode = useSelector((state: RootState) => state.config.themeMode);
dispatch(setThemeMode('light'));
dispatch(setThemeMode('dark'));
```

- `App.tsx` owns Ant Design `ConfigProvider` and switches `defaultAlgorithm` / `darkAlgorithm`
- `main.tsx` applies saved `themeMode` before render to reduce theme flash
- CSS colors must use project variables (`--color--primary`, `--color--shell`, `--color--surface`)
- Add both light and `[data-theme='dark']` values when introducing new app-level colors
- Persisted localStorage key: `themeMode`

---

### Dates

```typescript
// ✅ For display in UI — use locale string
render: (value: string) => value ? new Date(value).toLocaleString() : '-'
render: (value: string) => value ? new Date(value).toLocaleDateString() : '-'

// ✅ For formatted display — use formatDate utility
import { formatDate } from '@/common/utils/helper/formatDate';
formatDate(value)           // date only
formatDate(value, true)     // date + time — az-AZ locale
```

---

### Routing — New Pages

```typescript
// ✅ Always lazy-import page components
const FeatureLists = lazy(() => import('@/modules/feature/pages/featureLists'));
const FeatureDetail = lazy(() => import('@/modules/feature/pages/featureDetail'));

// Add to router:
{
  path: '/feature',
  element: <Feature />,
  children: [
    { path: '', element: <FeatureLists /> },
    { path: ':id', element: <FeatureDetail /> },
  ],
}

// ❌ Never eager-import pages
import FeatureLists from '@/modules/feature/pages/featureLists';
```

---

### Role Detection

```typescript
// Role is determined from UserProfile.tenantId — logic lives in configSlice.ts
// ADMIN if: tenantId is null, empty string, or "00000000-0000-0000-0000-000000000000"
// USER otherwise

// Read role in components:
const userRole = useSelector((state: RootState) => state.config.userRole);
if (userRole === 'ADMIN') { ... }
```

---

### Error Handling in Catch Blocks

```typescript
// ✅ Correct — axios interceptor already shows the notification
// In catch, just reset loading state and log
} catch (error) {
  console.error('Error creating feature:', error);
} finally {
  setIsLoading(false);
}

// ✅ When you need the error message from response manually:
} catch (err: unknown) {
  const e = err as { response?: { data?: { message?: string } } };
  const msg = e?.response?.data?.message || t('common.something_went_wrong');
  openNotification({ type: 'error', title: t('common.error'), content: msg });
}

// ❌ Wrong
} catch (error: any) {
  console.log(error);          // console.log banned
  message.error('Failed');     // message.error banned
}
```

---

## Naming Conventions

| Thing | Pattern | Example |
|---|---|---|
| Page component | PascalCase, no suffix | `TenantLists`, `UserDetail` |
| Shared component | PascalCase, descriptive | `TableLists`, `AppModal`, `AppButton` |
| Service function | `{verb}{Domain}Service` | `getTenantsService`, `postInviteUsersService` |
| Redux thunk | camelCase verb | `login`, `getProfile` |
| Redux reducer | camelCase verb | `logout`, `setUserRole`, `updateNotificationAccess` |
| Redux state key | camelCase | `access_token`, `sidebarCollapsed`, `userRole` |
| Hook | `use` prefix | `useDebounce`, `useMoveBack` |
| Interface | PascalCase, no prefix | `UserProfile`, `TenantData`, `AuthState` |
| Type alias | PascalCase | `CreateFeatureData`, `SelectionBarAction` |
| Endpoint constant key | camelCase | `feature.byId`, `auth.signIn` |
| File | camelCase or kebab-case | `featureService.ts`, `useDebounce.ts` |
| Component folder | camelCase | `tableFilter/`, `userInfo/` |

---

## Adding a New Feature Module — Checklist

1. **Types** (if shared): add interfaces to `common/types/index.ts`
2. **Endpoints**: add endpoint object to `common/libs/constants.ts`
3. **Service file**: create `common/libs/services/{feature}Service.ts`
4. **Module folder**: `src/modules/{feature}/`
5. **Create files**:
   - `types/index.ts` (module-specific types)
   - `pages/index.tsx` (outlet)
   - `pages/{featureLists}/index.tsx` (main page)
   - `components/{Component}/index.tsx` + `type.ts`
6. **Router**: add lazy import + route to `routers/index.tsx`
7. **Menu**: add entry to sidebar menu in `common/components/partials/menu/`

---

## What Is Never Acceptable

| Violation | Why |
|---|---|
| `import axios from 'axios'` | Always use axiosInstance |
| Hardcoded API URL in a service | Use `constants.ts` |
| `message.error()` / `message.success()` | Use `openNotification()` |
| `console.log()` | Use `console.error()` in catch, nothing in success path |
| `any` type in interface or service param | Define the actual type |
| Interface defined inside a component | Belongs in `types/index.ts` |
| Raw `<Table>` from Ant Design | Use `<TableLists>` wrapper |
| Raw `<Modal>` from Ant Design | Use `<AppModal>` wrapper |
| Feature data in Redux | Use `useState` |
| Pagination in `useState` | Use `useSearchParams` |
| Eager-loading page components | Use `lazy()` |
| `import x from 'node_modules/...'` | Use package name only |
| Hardcoded user-facing text | Use `t('namespace.key')` |
| `localStorage` access for arbitrary data | Only tokens (`access_token`, `refresh_token`), `lang`, `sidebarCollapsed`, `themeMode` |
