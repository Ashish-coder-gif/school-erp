import { PrismaClient } from "../src/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 10)
  const teacherPassword = await bcrypt.hash("teacher123", 10)
  const studentPassword = await bcrypt.hash("student123", 10)
  const parentPassword = await bcrypt.hash("parent123", 10)

  // Clean up existing data
  await prisma.announcement.deleteMany()
  await prisma.bookIssue.deleteMany()
  await prisma.book.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.fee.deleteMany()
  await prisma.mark.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.timetable.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.student.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.parent.deleteMany()
  await prisma.class.deleteMany()
  await prisma.user.deleteMany()

  console.log("Seeding database...")

  // Seed Users
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@school.com",
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  })

  const teacherUser = await prisma.user.create({
    data: {
      email: "teacher1@school.com",
      password: teacherPassword,
      name: "John Teacher",
      role: "TEACHER",
    },
  })

  const studentUser = await prisma.user.create({
    data: {
      email: "student1@school.com",
      password: studentPassword,
      name: "Alice Student",
      role: "STUDENT",
    },
  })

  const parentUser = await prisma.user.create({
    data: {
      email: "parent1@school.com",
      password: parentPassword,
      name: "Bob Parent",
      role: "PARENT",
    },
  })

  // Seed Classes
  const class1 = await prisma.class.create({
    data: {
      name: "Class X",
      section: "A",
    },
  })

  // Seed Teacher
  const teacher = await prisma.teacher.create({
    data: {
      userId: teacherUser.id,
      employeeId: "T001",
      phone: "9876543210",
      address: "123 Teacher Street",
      joiningDate: new Date("2020-01-15"),
    },
  })

  // Update class with teacher
  await prisma.class.update({
    where: { id: class1.id },
    data: { teacherId: teacher.id },
  })

  // Seed Parent
  const parent = await prisma.parent.create({
    data: {
      userId: parentUser.id,
      phone: "9123456789",
      address: "456 Parent Avenue",
      occupation: "Engineer",
    },
  })

  // Seed Student
  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      rollNo: "S001",
      classId: class1.id,
      parentId: parent.id,
      dob: new Date("2008-05-20"),
      address: "123 Student Lane",
      phone: "9999999999",
    },
  })

  // Seed Subjects
  const mathSubject = await prisma.subject.create({
    data: {
      name: "Mathematics",
      code: "MATH101",
      classId: class1.id,
      teacherId: teacher.id,
    },
  })

  const scienceSubject = await prisma.subject.create({
    data: {
      name: "Science",
      code: "SCI101",
      classId: class1.id,
      teacherId: teacher.id,
    },
  })

  // Seed Timetable
  await prisma.timetable.create({
    data: {
      classId: class1.id,
      subjectId: mathSubject.id,
      teacherId: teacher.id,
      day: "Monday",
      startTime: "09:00",
      endTime: "10:00",
      room: "Room 101",
    },
  })

  // Seed Exam
  const exam = await prisma.exam.create({
    data: {
      name: "Mid Term Exam",
      classId: class1.id,
      subjectId: mathSubject.id,
      date: new Date("2024-03-15"),
      totalMarks: 100,
      passingMarks: 40,
    },
  })

  // Seed Marks
  await prisma.mark.create({
    data: {
      examId: exam.id,
      studentId: student.id,
      marksObtained: 85,
      grade: "A",
      remarks: "Excellent performance",
    },
  })

  // Seed Attendance
  await prisma.attendance.create({
    data: {
      studentId: student.id,
      teacherId: teacher.id,
      date: new Date(),
      status: "PRESENT",
    },
  })

  // Seed Books
  const book = await prisma.book.create({
    data: {
      title: "Advanced Mathematics",
      author: "R.S. Aggarwal",
      isbn: "ISBN123456",
      quantity: 10,
      available: 8,
    },
  })

  // Seed Book Issue
  await prisma.bookIssue.create({
    data: {
      bookId: book.id,
      studentId: student.id,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    },
  })

  // Seed Fees
  const fee = await prisma.fee.create({
    data: {
      studentId: student.id,
      amount: 5000,
      type: "Tuition",
      dueDate: new Date("2024-04-30"),
      status: "PENDING",
    },
  })

  // Seed Announcements
  await prisma.announcement.create({
    data: {
      title: "School Holidays",
      content: "School will be closed from March 20-30 for summer break",
      targetRole: "STUDENT",
      createdById: adminUser.id,
    },
  })

  console.log("Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

