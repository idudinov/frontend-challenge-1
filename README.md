# Coding Challenge: MRF Generation from Claims File OON Rates

## [The Task](https://github.com/mano-ai-labs/frontend-challenge-1/blob/c2679529cc10953e68e0f1f1de71723e60b881f1/README.md)

Frontend & backend application for processing and storing claims data in MRF format.

### The Challenge

The goal was to make all required functionality in prototype form, therefore:

 - no efforts spent on UI completeness; no actual styleguide or design system was implemented, as well as responsiveness.
 - although MVVM pattern was used on the frontend, it's not fully implemented since (per the idea) there should be also Controllers layer (aka Models) to make a complete layers separation.
 - backend implementation is not even close production-ready, but serving more like a demo for the frontend.

See [DESIGN.md](./DESIGN.md) for actual project design and implementation details.

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

### Project Structure

The project is a monorepo with NPM workspaces:

  - `/common` - shared code between the frontend and backend
  - `/frontend` - the frontend React app
  - `/backend` - the backend Hono functions

Extra:
  - `/data` - sample data for testing
