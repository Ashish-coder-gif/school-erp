# School ERP Portal

A comprehensive school management system built with modern web technologies.

## Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **Authentication**: NextAuth v5 with Credentials Provider
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: shadcn/ui with Tailwind CSS
- **Styling**: Tailwind CSS v4
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner toasts
- **Charts**: Recharts for data visualization

## Features

- **Multi-role Support**: Admin, Teacher, Student, Parent
- **Authentication**: Secure JWT-based authentication with NextAuth v5
- **Role-based Access Control**: Protected routes with middleware
- **Dashboard**: Role-specific dashboards for each user type
- **Student Management**: Manage student profiles, attendance, grades
- **Teacher Management**: Manage classes, attendance, exam marks
- **Fee Management**: Track student fees and payments
- **Library System**: Book management and issuance tracking
- **Timetable**: Class and exam timetables
- **Announcements**: Role-targeted announcements

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- PostgreSQL database
- Environment variables configured

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Configure Environment

Create a `.env.local` file (or update `.env`):

```bash
# Database URL (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/erp_db"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-with-openssl-rand-hex-32"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -hex 32
```

### 3. Setup Database

```bash
# Push Prisma schema to database
npx prisma db push

# Generate Prisma client (if needed)
npx prisma generate
```

### 4. Seed Database with Demo Data

```bash
npx prisma db seed
```

This creates demo users with the following credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | admin123 |
| Teacher | teacher1@school.com | teacher123 |
| Student | student1@school.com | student123 |
| Parent | parent1@school.com | parent123 |

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm start             # Start production server
npm run lint          # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma migrate dev --name <name>  # Create migration
npx prisma db seed   # Seed database
npx prisma studio   # Open Prisma Studio GUI
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── (auth)/         # Auth routes (login)
│   ├── (dashboard)/    # Protected dashboard routes
│   │   ├── admin/      # Admin dashboard
│   │   ├── teacher/    # Teacher dashboard
│   │   ├── student/    # Student dashboard
│   │   └── parent/     # Parent dashboard
│   ├── api/            # API routes
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
│   ├── ui/            # shadcn/ui components
│   └── layout/        # Layout components
├── lib/               # Utility functions
│   ├── auth.ts       # Auth exports
│   ├── db.ts         # Prisma client
│   └── utils.ts      # Helper utilities
├── auth.ts           # NextAuth configuration
└── middleware.ts     # Route protection middleware

prisma/
├── schema.prisma     # Database schema
└── seed.ts          # Database seeding script
```

## Authentication Flow

1. Users navigate to `/login`
2. Enter credentials (email + password)
3. NextAuth validates against database
4. JWT token created and stored in HTTP-only cookie
5. User redirected to role-specific dashboard
6. Protected routes checked via middleware
7. Session available throughout app via `useSession` hook

## Database Schema

Key models:
- **User**: Authentication and account management
- **Student**: Student profiles linked to Users
- **Teacher**: Teacher profiles linked to Users
- **Parent**: Parent profiles linked to Users
- **Class**: Grade/section management
- **Subject**: Subject/course management
- **Attendance**: Student/teacher attendance tracking
- **Exam**: Exam management
- **Mark**: Student exam marks
- **Fee**: Student fee tracking
- **Payment**: Fee payment records
- **Book**: Library book management
- **BookIssue**: Book issuance tracking
- **Announcement**: Role-targeted announcements

## Role-based Access

Routes are protected by the middleware (`src/middleware.ts`):
- `/admin/*` - Admin only
- `/teacher/*` - Teacher only
- `/student/*` - Student only
- `/parent/*` - Parent only

Unauthenticated users are redirected to `/login`.

## Development Notes

- All dashboard pages are client components (`"use client"`)
- Forms use React Hook Form + Zod for validation
- UI components are from shadcn/ui (new-york style)
- Currently uses mock data in page components (ready to migrate to database)
- React Compiler is enabled for performance optimization

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

### Database Connection Error
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check network connectivity to database host

### Prisma Client Errors
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Authentication Not Working
- Ensure `.env` has NEXTAUTH_SECRET and NEXTAUTH_URL
- Check database is accessible and migrations are applied
- Clear browser cookies and try again
- Check server logs for detailed errors

## File Documentation

See [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) for detailed implementation history and configuration notes.

## Future Enhancements

- [ ] Email notifications for fee reminders
- [ ] SMS alerts for attendance
- [ ] Parent-Teacher communication portal
- [ ] Online assignment submission
- [ ] Student performance analytics
- [ ] Automated certificate generation
- [ ] Mobile app for parents/students
- [ ] Integration with payment gateways

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please refer to the [Next.js documentation](https://nextjs.org/docs) and [NextAuth documentation](https://next-auth.js.org/).


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
