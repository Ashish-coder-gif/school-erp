# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

School ERP Portal — a role-based school management system built with Next.js 16 (App Router), Prisma 7, PostgreSQL, and shadcn/ui. Four user roles: Admin, Teacher, Student, Parent. Currently uses mock/hardcoded data in page components; authentication is a stub that redirects by selected role.

## Build & Dev Commands

- `npm run dev` — start Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- `npx prisma generate` — regenerate Prisma client (output to `src/generated/prisma/`)
- `npx prisma db push` — push schema changes to the database
- `npx prisma migrate dev` — create and apply a migration
- `npx shadcn@latest add <component>` — add a new shadcn/ui component

No test framework is configured yet.

## Architecture

### Routing (Next.js App Router)

All routes live under `src/app/` using route groups:

- `(auth)/login/` — login page (client component, mock auth via role selection)
- `(dashboard)/` — shared dashboard layout wrapping all role-specific pages
  - `admin/` — admin pages (students, teachers, attendance, timetable, exams, fees, library, announcements, reports)
  - `teacher/` — teacher dashboard
  - `student/` — student dashboard
  - `parent/` — parent dashboard

The root page (`/`) redirects to `/login`. The dashboard layout is in `src/components/layout/DashboardLayout.tsx` which composes `Sidebar` + `Navbar`.

### Role-Based Navigation

The Sidebar (`src/components/layout/Sidebar.tsx`) and Navbar (`src/components/layout/Navbar.tsx`) detect the current role from the URL pathname (`/admin/*`, `/teacher/*`, `/student/*`, `/parent/*`) and render role-specific navigation items and color themes:
- Admin: blue
- Teacher: emerald
- Student: purple
- Parent: amber

### Database Schema (Prisma)

`prisma/schema.prisma` uses PostgreSQL. Key models: User, Student, Teacher, Parent, Class, Subject, Attendance, Timetable, Exam, Mark, Fee, Payment, Book, BookIssue, Announcement. Enums: Role, AttendanceStatus, FeeStatus. The Prisma client is generated to `src/generated/prisma/` (gitignored).

Requires `DATABASE_URL` in `.env`.

### UI Stack

- **shadcn/ui** (new-york style, RSC-enabled) — components in `src/components/ui/`, configured via `components.json`
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **next-themes** for dark mode (class-based via `ThemeProvider`)
- **recharts** for dashboard charts
- **sonner** for toast notifications
- **lucide-react** for icons
- **react-hook-form** + **zod** for form handling/validation (available but not yet widely used)

### Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`). Use `@/components/`, `@/lib/`, `@/hooks/` for imports.

### Key Conventions

- All dashboard page components are client components (`"use client"`) because they use React hooks and browser APIs.
- The `cn()` utility from `src/lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge).
- React Compiler is enabled in `next.config.ts` (`reactCompiler: true`).
- The Inter font is loaded via `next/font/google` in the root layout.
