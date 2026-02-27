# Quick Start Guide - School ERP Portal

## What's Been Completed ✅

Your School ERP Portal now has complete authentication infrastructure:

### Authentication System
- ✅ NextAuth v5 (beta.30) configured with Credentials Provider
- ✅ JWT-based session management
- ✅ Role-based access control (Admin, Teacher, Student, Parent)
- ✅ Secure password hashing with bcryptjs
- ✅ Protected routes with middleware

### Database & Seeding
- ✅ Prisma ORM configured for PostgreSQL
- ✅ Complete seed script with demo data
- ✅ Sample records for all roles
- ✅ Relationships setup (Classes, Subjects, Exams, etc.)

### Frontend Integration
- ✅ Real authentication login page (replaces mock auth)
- ✅ Session provider in root layout
- ✅ NextAuth React hooks ready for use
- ✅ Role-based dashboard routing

### Bug Fixes
- ✅ Fixed recharts type errors
- ✅ Updated all deprecated NextAuth imports
- ✅ Removed mock authentication

---

## 🚀 To Get Started (3 Steps)

### Step 1: Ensure Database Connection
```bash
# Verify your .env file contains:
# DATABASE_URL="postgresql://..."
# NEXTAUTH_SECRET="your-secret-key"
# NEXTAUTH_URL="http://localhost:3000"

cat .env  # Check configuration
```

### Step 2: Setup Database
```bash
# Push schema to database
npx prisma db push

# Seed with demo data
npx prisma db seed
```

### Step 3: Run Application
```bash
# Start dev server
npm run dev

# Open browser to http://localhost:3000
# Login with: admin@school.com / admin123
```

---

## 📝 Demo Credentials

After seeding, use these to login:

| User Type | Email | Password |
|-----------|-------|----------|
| **Admin** | admin@school.com | admin123 |
| **Teacher** | teacher1@school.com | teacher123 |
| **Student** | student1@school.com | student123 |
| **Parent** | parent1@school.com | parent123 |

---

## 📚 Key Files Modified

| File | Purpose |
|------|---------|
| `src/auth.ts` | NextAuth v5 configuration |
| `src/components/auth-provider.tsx` | Session provider wrapper |
| `src/app/(auth)/login/page.tsx` | Real authentication login |
| `src/middleware.ts` | Route protection & role validation |
| `src/lib/db.ts` | Prisma client singleton |
| `prisma/seed.ts` | Database seeding script |
| `.env.example` | Environment variables template |

---

## 🔐 How Authentication Works

1. User submits email/password on `/login`
2. NextAuth validates against database
3. Password verified with bcryptjs
4. JWT token created with user data
5. User redirected to their role dashboard
6. Middleware protects all dashboard routes
7. Invalid tokens redirect to login

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm start               # Run production build

# Database
npx prisma db seed     # Populate demo data
npx prisma studio     # Open GUI for database
npx prisma generate   # Regenerate client
npx prisma db push    # Push schema changes

# Linting
npm run lint           # Check code style
```

---

## 🔗 Available Routes

### Public
- `/` - Redirects to login
- `/login` - Authentication page

### Protected (Admin Dashboard)
- `/admin` - Admin dashboard
- `/admin/students` - Manage students
- `/admin/teachers` - Manage teachers
- `/admin/attendance` - Attendance records
- `/admin/announcements` - Create announcements

### Protected (Teacher Dashboard)
- `/teacher` - Teacher dashboard
- `/teacher/classes` - My classes
- `/teacher/attendance` - Take attendance
- `/teacher/exams` - Manage exams
- `/teacher/announcements` - View/create announcements

### Protected (Student Dashboard)
- `/student` - Student dashboard
- `/student/attendance` - My attendance
- `/student/exams` - Exam schedule
- `/student/fees` - Fee status

### Protected (Parent Dashboard)
- `/parent` - Parent dashboard
- `/parent/attendance` - Child attendance
- `/parent/fees` - Fee tracking
- `/parent/exams` - Child exam results

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Test connection with Prisma
npx prisma db execute --stdin < /dev/null
```

### "Property 'user' does not exist" Error
```bash
# Regenerate Prisma client
npx prisma generate

# Clear node_modules and reinstall
rm -rf node_modules && npm install
```

### Login Not Working
1. Verify `.env` variables are set
2. Check database is running
3. Ensure seed was executed: `npx prisma db seed`
4. Check browser console for errors
5. Clear cookies and try again

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

---

## 📖 Documentation Files

- **README.md** - Full project documentation
- **IMPLEMENTATION_NOTES.md** - Detailed implementation history
- **AGENTS.md** - Project architecture overview
- **.env.example** - Environment variables template

---

## ✨ Next Steps

After getting authentication working:

1. **Test all roles**: Try logging in as each user type
2. **Explore dashboards**: Check each role's dashboard
3. **Add more data**: Use Prisma Studio to add more records
4. **Implement features**: Build out role-specific features
5. **Connect to database**: Replace mock data with real database queries

---

## 📞 Need Help?

1. Check [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) for detailed setup
2. Review [NextAuth documentation](https://next-auth.js.org/)
3. Check [Prisma documentation](https://www.prisma.io/docs/)
4. Review error logs in terminal

---

**Authentication infrastructure is complete! Ready to build your features.** 🎉
