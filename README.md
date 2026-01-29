# Tenant Management Frontend

## Project Overview

This project is a Vue.js 3 frontend for a multi-tenant application.  
It provides a responsive user interface for tenant creation, user management, authentication, and role-based access.

**Technologies Used:**
- Vue.js 3 (Composition API)
- TypeScript
- Vuetify 3
- Pinia (State Management)
- Vite (Build Tool)
- Axios (HTTP requests)
- Vue Router
- Vue3-Toastify (Notifications)

---

## Requirements

- Node.js >= 18.x
- npm >= 9.x
- PHP backend running (Laravel API)
- Browser: Chrome, Firefox, Edge

---

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tenant-frontend


Install dependencies:

npm install


Configure environment variables:

Create a .env file at the project root:

VITE_API_BASE_URL=http://localhost:8000/api


Run the development server:

npm run dev


The app will be available at http://localhost:3000.

Folder Structure
src/
├─ api/          # Axios instance
├─ components/   # Reusable Vue components
├─ plugins/      # Vuetify or other plugin setups
├─ router/       # Vue Router configuration
├─ stores/       # Pinia stores
├─ views/        # Pages (Login, Users, Tenant Create)
├─ App.vue       # Root component
├─ main.ts       # Entry point

Authentication

Token-based authentication using Laravel Sanctum.

Token is stored in localStorage.

Protected routes check for token and redirect to login if not authenticated.

Key Features

Login/Logout: Secure authentication for tenants.

Tenant Creation: Superadmin can create new tenants via /tenants/create.

User Management:

List all users for a tenant.

Create/Edit users in a modal.

Role is restricted (cannot update admin role).

Delete users (non-admins).

Notifications: Toast notifications for success/error messages.

Routing Guards: Prevent unauthorized access using Vue Router meta fields.

Responsive Design: Vuetify layout with data tables and modals.

API Integration

All API calls are centralized in src/api/http.ts using Axios:

Base URL from .env: VITE_API_BASE_URL

Automatic Authorization header with Bearer token from localStorage.

Example endpoints:

Action	Method	URL
Login	POST	/tenants/login
Logout	POST	/tenants/logout
Create Tenant	POST	/tenants/register
List Users	GET	/users?page=1
Create User	POST	/users
Update User	PUT	/users/:id
Delete User	DELETE	/users/:id
State Management (Pinia)

auth.store.ts: Handles login/logout, stores user info and token.

user.store.ts (optional): Can handle users list globally.

Notifications

Vue3-Toastify is used for showing toast messages.

Example usage:

import { toast } from 'vue3-toastify'
toast.success('User created successfully!')
toast.error('Login failed!')

Running Build
npm run build


Production files will be in dist/.

Serve with any static file server or integrate with backend.