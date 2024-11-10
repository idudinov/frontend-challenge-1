# Design Overview

The project is a monorepo with NPM workspaces:

  - `common` - shared code between the frontend and backend
  - `frontend` - the frontend React app
  - `backend` - the backend Hono functions

Extra:
  - `data` - sample data for testing

### The Challenge

The goal was to make all required functionality in prototype form, therefore:

 - no efforts spent on UI completeness; no actual styleguide or design system was implemented, as well as responsiveness.
 - although MVVM pattern was used on the frontend, it's not fully implemented since (per the idea) there should be also Controllers layer (aka Models) to make a complete layers separation.
 - backend implementation is not even close production-ready, but serving more like a demo for the frontend.

### Application flow

1. User start with a `Home` page which is a placeholder welcome page.
2. Using hint on `Home`, or via navigation in `Header`, user can navigate to `Process` or `View Files` pages.
3. On `Process` page, user sees a simple form to upload a CSV file with claims data.
  - The flow is organized via simple state machine (see [`FileProcessFlow.tsx`](./frontend/src/components/processing/FileProcessFlow.tsx))
  - There are 3 steps:
    - `initial`: user can upload a file a see a brief info where the file is valid
    - `review`: user sees the contents of the file in tabular view, can review, edit, add or remove rows
    - `upload`: user finally uploads the parsed data to the backend, and redirected to `View Files` page; this step is also reserves space for requesting more general data from user.
  - Data validation happens on every step, but on the final step it's done on the backend.
  - Backend accepts parsed claims data, [makes the translation](./backend/src/services/mrf/index.ts) to [MRF format](https://github.com/CMSgov/price-transparency-guide/tree/master/schemas/allowed-amounts), stores the result to the local [`storage`](./backend/storage) folder, while also keeping a list of uploaded files in a separate file.
4. On `View Files` page, user sees just a list of all uploaded files, for now with no ability to view or download. The backend serves `GET /api/mrf/list` endpoint to get the list of files. The list is stored in a simple `_state.json` file, just keeping the metadata of each file stored. This list is also cached in memory for some period of time.
5. Navigation is mainly done via `Header` which contains navigation links to the pages, while emphasizing the current page. Also, it contains a simple current user auth status indication with login/logout buttons.

### Authentication

This is done ridiculously simple, the idea was just to test the application behaviour in different states. The user is considered authenticated if the `x-user-id` header is passed in request; current it contains just a string with user ID. On the frontend, the `userId` is stored in `localStorage` and used for the header, if present.

 - When any component requests auth state (if user logged in), frontend calls `GET api/auth/state` which simulates token validation.
 - For login, `POST /api/auth/login` is called and return randomly generated user ID (the same `UserInfo` as for the state check).
 - For logout, nothing really happens on the backend, frontend just clears the `userId` from `localStorage`.

Endpoint definitions allow to mark an endpoint as `authenticated`, so the corresponding middleware is automatically added to the handler on the backend. Example: [`UploadClaims`](./common/api/endpoints/claims.ts) endpoint. In this way, it's easy to control public/private endpoints.

On the frontend, simple HOC [`ProtectedRoute`](./frontend/src/layout/ProtectedRoute.tsx) is used to guard routes from unauthorized access: it checks if the user is authenticated and redirects to the `Home` page if not.

## Init & run

```bash
# From the root (or any of workspaces) run to install all dependencies:
npm install
```

```bash
# Run the frontend app
cd frontend
npm run dev
```

```bash
# Run the backend
cd backend
npm run dev
```

## Common

Defines shared models, endpoints + DTOs and validation logic.

Example: see `ClaimItemSchema` in [`validation/claims.ts`](./common/validation/claims.ts).

## Frontend

A React Router powered React app with MobX for state managed.

Core dependencies:
 - `mobx` + `mobx-react-lite` for state management & observability
 - [`Mantine`](https://mantine.dev/) for UI components
 - [Tailwind](https://tailwindcss.com/) is used for organizing components layout, sometimes for other styles, and it's not really consistent here because one need to find out the best way to integrate it with Mantine. To avoid tackling that, I'd rather use Mantine's own styles fully, or use [`shadcn`](https://ui.shadcn.com/) components instead.
 - `axios` for HTTP requests; it doesn't really win `fetch` nowadays unless some extensions like `interceptors` are used.
 - [`AG Grid`](https://www.ag-grid.com/) for data tables
 - [`@zajno/common`](hhttps://github.com/Zajno/common-utils/tree/main/packages/common): home-grown utilities, crafted by me (@idudinov) over the years for various projects, including:
    - `@zajno/common/api`: middle layer for defining API endpoints with type-safety; [`callApi`](./frontend/src/services/api.ts) is a result of combining endpoints definition and `axios` calls, so it can be efficiently used for type-safe API calls.

    - `LazyPromise` - caches promise result, optionally with expiration time.
    - `Path` - builds path from string parts, where a part can be a parameter with name, template placeholder; make the path re-usable and type-safe.

    ...and others
  - [`@zajno/common-mobx`](https://github.com/Zajno/common-utils/tree/main/packages/common-mobx): MobX utilities, mostly wrappers like [`ValueModel`](https://github.com/Zajno/common-utils/blob/main/packages/common-mobx/src/viewModels/ValueModel.ts) for observable values with extra helpers, effectively wraps `mobx` API.

### MVVM

The project uses bits of [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) pattern, where [`*ViewModel`](./frontend/src/viewModels) classes are used to manage the state of a component, work with API (in this implementation, I personally prefer using another Controllers layer for wrapping backend behaviour on frontend). By default, ViewModel classes are instantiated and owned by Views (React components), so the owner component is responsible for managing and disposing the ViewModel.

ViewModels are replacement to MobX stores, they are more flexible for re-using and encapsulating frontend app logic, and can be easily tested.

### Structure

 - `components` - reusable UI components
  - `components/common`: business logic-free UI components, wrappers for Mantine components
  - `components/Header.tsx`, `components/list`, `components/processing` - specific components for the app
 - `constants/routes.ts`: routes definitions for React Router and navigation
 - `layout`: layout components, including `ProtectedRoute` guard
 - `lib`: wrapper for external libraries, like `ag-grid`
 - `pages`: high-level components for routing
 - `services`: API service wrapper (`callApi`); `parsing` for parsing CSV files with `papaparse`.
 - `types`: shared types for the frontend
 - `viewModels`: MVVM classes for managing state and logic of components

Entry point: `src/index.tsx`, `src/App.tsx` also manages Mantine theme.

## Backend

A very simple Hono app which serves handlers for [endpoint definitions](./common/api/endpoints/index.ts).

Endpoints are defined declaratively on the shared layer, while the [`serveEndpoint`](./backend/src/utils/endpoint.ts) factory function is used to link an endpoint handler for the endpoint while maintains route, method, and auth checks. The ndpoint handlers are designed in a way to be less dependent on the actual request/response objects, so they can be potentially tested easier.

There's no any real architecture pattern here since it depends on how the endpoints are distributed (monolith/serverless), the code is just organized in files to keep modules separated and have a single responsibility.
