export const CLASS_LEVELS = [
  "Nursery", "KG 1", "KG 2",
  "Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6",
  "Basic 7", "Basic 8", "Basic 9",
  "SHS 1", "SHS 2", "SHS 3",
];

export const BASIC_SUBJECTS = [
  "Mathematics", "English Language", "Science", "Computing", "RME",
  "Social Studies", "French", "Creative Arts", "Career Technology", "Ghanaian Language",
];

export const SHS_SUBJECTS = [
  "Core Mathematics", "English Language", "Integrated Science", "Social Studies",
  "Physics", "Chemistry", "Biology", "Elective Mathematics", "Economics",
  "Government", "Geography", "Literature in English", "Financial Accounting",
  "Cost Accounting", "Business Management", "ICT", "Food and Nutrition",
  "General Agriculture", "French",
];

export const ALL_SUBJECTS = [...new Set([...BASIC_SUBJECTS, ...SHS_SUBJECTS])];

export interface Course {
  id: string;
  title: string;
  subject: string;
  level: string;
  teacher: string;
  duration: string;
  price: number; // GHS, 0 = free
  rating: number;
  students: number;
  badge?: string;
  description: string;
  topics: string[];
}

const TEACHERS = ["Mr. Mensah", "Mrs. Adjei", "Mr. Boateng", "Ms. Owusu", "Mr. Asante", "Mrs. Yeboah"];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }

export const COURSES: Course[] = (() => {
  const out: Course[] = [];
  let i = 0;
  for (const level of CLASS_LEVELS) {
    const subjects = level.startsWith("SHS") ? SHS_SUBJECTS : BASIC_SUBJECTS;
    for (const subject of subjects.slice(0, level.startsWith("SHS") ? 6 : 4)) {
      const isSHS = level.startsWith("SHS");
      out.push({
        id: `${level}-${subject}`.replace(/\s+/g, "-").toLowerCase(),
        title: `${subject} — ${level}`,
        subject,
        level,
        teacher: pick(TEACHERS, i),
        duration: isSHS ? "12 weeks" : "8 weeks",
        price: i % 7 === 0 ? 0 : isSHS ? 30 : 20,
        rating: 4 + ((i % 10) / 10),
        students: 50 + (i * 7) % 400,
        badge: isSHS ? pick(["WASSCE Ready", "Science Class", "Business Class", "General Arts"], i) : undefined,
        description: `A comprehensive ${subject} course tailored for ${level} learners on the HELC platform.`,
        topics: [
          `${subject} fundamentals`, "Practice exercises", "Past questions",
          "Live revision", "Mock tests", "Final assessment",
        ],
      });
      i++;
    }
  }
  return out;
})();

export const LIVE_CLASSES = [
  { id: "lc1", subject: "Core Mathematics", teacher: "Mr. Mensah", level: "SHS 2", date: "2026-05-25", time: "18:00", type: "Evening" },
  { id: "lc2", subject: "English Language", teacher: "Mrs. Adjei", level: "Basic 8", date: "2026-05-26", time: "16:00", type: "Weekend Revision" },
  { id: "lc3", subject: "Physics", teacher: "Mr. Boateng", level: "SHS 3", date: "2026-05-27", time: "19:00", type: "WASSCE Bootcamp" },
  { id: "lc4", subject: "Mathematics", teacher: "Ms. Owusu", level: "Basic 6", date: "2026-05-28", time: "15:00", type: "Weekend Revision" },
  { id: "lc5", subject: "Chemistry", teacher: "Mr. Asante", level: "SHS 2", date: "2026-05-29", time: "18:30", type: "Vacation Bootcamp" },
];

export const RESOURCES = [
  { id: "r1", title: "BECE 2024 Mathematics Past Questions", type: "PDF", subject: "Mathematics", level: "Basic 9", free: true },
  { id: "r2", title: "WASSCE Physics Examiner Report", type: "PDF", subject: "Physics", level: "SHS 3", free: false },
  { id: "r3", title: "English Language Notes — Comprehension", type: "Notes", subject: "English Language", level: "Basic 7", free: true },
  { id: "r4", title: "Integrated Science Worksheet", type: "Worksheet", subject: "Integrated Science", level: "SHS 1", free: false },
  { id: "r5", title: "BECE Mock Exam Pack", type: "Mock", subject: "All", level: "Basic 9", free: false },
  { id: "r6", title: "Chemistry Practical Video", type: "Video", subject: "Chemistry", level: "SHS 2", free: false },
  { id: "r7", title: "Financial Accounting Templates", type: "PDF", subject: "Financial Accounting", level: "SHS 2", free: false },
  { id: "r8", title: "Literature Notes — The Anvil and the Hammer", type: "Notes", subject: "Literature in English", level: "SHS 3", free: false },
];

export const COUPONS: Record<string, number> = {
  HELC50: 50, FREECLASS: 100, BECE2026: 25,
};

export const TESTIMONIALS = [
  { name: "Akosua, BECE Graduate", text: "HELC helped me pass BECE with flying colours. The mock exams felt just like the real thing!" },
  { name: "Kwame, SHS 3", text: "The WASSCE bootcamp and live classes gave me the confidence I needed in Elective Maths." },
  { name: "Mrs. Owusu, Parent", text: "I can track my daughter's progress every week. Truly a Ghanaian parent's best friend." },
];

export const BLOG_POSTS = [
  { id: "b1", category: "Study Tips", title: "5 Ways to Master Core Mathematics", date: "May 18, 2026" },
  { id: "b2", category: "WAEC News", title: "WASSCE 2026 Timetable Released", date: "May 12, 2026" },
  { id: "b3", category: "Exam Updates", title: "BECE 2026 Registration Now Open", date: "May 05, 2026" },
  { id: "b4", category: "HELC Announcements", title: "New Vacation Bootcamps for SHS Students", date: "April 28, 2026" },
];
