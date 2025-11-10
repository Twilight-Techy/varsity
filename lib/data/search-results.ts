// Mock data for search results
const users = [
  {
    id: "user1",
    type: "user",
    name: "Alex Johnson",
    username: "alexj",
    avatar: "",
    university: "Stanford University",
    department: "Computer Science",
    year: "Junior",
    bio: "CS major focusing on AI and machine learning. Always looking to collaborate on interesting projects!",
    isConnected: false,
  },
  {
    id: "user2",
    type: "user",
    name: "Samantha Lee",
    username: "samlee",
    avatar: "",
    university: "MIT",
    department: "Engineering",
    year: "Senior",
    bio: "Robotics enthusiast and researcher. Working on autonomous systems and computer vision.",
    isConnected: true,
  },
  {
    id: "user3",
    type: "user",
    name: "David Chen",
    username: "dchen",
    avatar: "",
    university: "UC Berkeley",
    department: "Computer Science",
    year: "Sophomore",
    bio: "Full-stack developer and hackathon enthusiast. Love building tools that help people learn.",
    isConnected: false,
  },
  {
    id: "user4",
    type: "user",
    name: "Emily Rodriguez",
    username: "emilyr",
    avatar: "",
    university: "Harvard University",
    department: "Business",
    year: "Senior",
    bio: "Studying business with a focus on tech startups. Passionate about entrepreneurship and innovation.",
    isConnected: false,
  },
  {
    id: "user5",
    type: "user",
    name: "Michael Wilson",
    username: "mikew",
    avatar: "",
    university: "Stanford University",
    department: "Medicine",
    year: "Graduate",
    bio: "MD/PhD student researching applications of AI in healthcare. Looking to connect with CS students.",
    isConnected: true,
  },
]

const communities = [
  {
    id: "comm1",
    type: "community",
    name: "AI Enthusiasts",
    slug: "ai-enthusiasts",
    description:
      "A community for students interested in artificial intelligence, machine learning, and deep learning. Share papers, projects, and learning resources.",
    memberCount: 1243,
    category: "Technology",
    isMember: true,
    image: "",
  },
  {
    id: "comm2",
    type: "community",
    name: "Hackathon Heroes",
    slug: "hackathon-heroes",
    description:
      "For students who love participating in hackathons. Find teammates, share project ideas, and discuss upcoming events.",
    memberCount: 876,
    category: "Programming",
    isMember: false,
    image: "",
  },
  {
    id: "comm3",
    type: "community",
    name: "CS Study Group",
    slug: "cs-study-group",
    description:
      "A place to find study partners for CS courses, share notes, and help each other with assignments and exam prep.",
    memberCount: 1502,
    category: "Academic",
    isMember: true,
    image: "",
  },
  {
    id: "comm4",
    type: "community",
    name: "Startup Founders",
    slug: "startup-founders",
    description:
      "Connect with other student entrepreneurs, share resources, and find co-founders for your next venture.",
    memberCount: 654,
    category: "Business",
    isMember: false,
    image: "",
  },
  {
    id: "comm5",
    type: "community",
    name: "Research Opportunities",
    slug: "research-opportunities",
    description:
      "Find research positions, discuss ongoing projects, and connect with professors looking for research assistants.",
    memberCount: 921,
    category: "Academic",
    isMember: true,
    image: "",
  },
]

const posts = [
  {
    id: "post1",
    type: "post",
    title: "Looking for teammates for the upcoming AI hackathon",
    content:
      "Hey everyone! I'm looking for 2-3 teammates for the AI for Good hackathon next month. I'm experienced in ML and computer vision, and would love to work with people who have web dev and UI/UX skills. Let me know if you're interested!",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "",
    },
    community: {
      name: "Hackathon Heroes",
      slug: "hackathon-heroes",
    },
    createdAt: "2023-04-15T14:30:00Z",
    likes: 24,
    comments: 12,
  },
  {
    id: "post2",
    type: "post",
    title: "Resources for learning React and Next.js",
    content:
      "I've compiled a list of the best resources for learning React and Next.js that helped me land my internship. Includes tutorials, documentation, project ideas, and more. Hope this helps others who are just starting out!",
    author: {
      name: "David Chen",
      username: "dchen",
      avatar: "",
    },
    community: {
      name: "CS Study Group",
      slug: "cs-study-group",
    },
    createdAt: "2023-04-10T09:15:00Z",
    likes: 87,
    comments: 32,
  },
  {
    id: "post3",
    type: "post",
    title: "Study group for Algorithms final exam",
    content:
      "I'm organizing a study group for the CS332 Algorithms final exam. We'll be meeting in the library every Tuesday and Thursday from 6-8pm. We'll go through past exams and practice problems. Comment if you want to join!",
    author: {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "",
    },
    community: {
      name: "CS Study Group",
      slug: "cs-study-group",
    },
    createdAt: "2023-04-05T18:45:00Z",
    likes: 42,
    comments: 28,
  },
  {
    id: "post4",
    type: "post",
    title: "New research paper on transformer models",
    content:
      "Just published a new paper on efficient transformer models for NLP tasks. We achieved state-of-the-art results with 30% less computational resources. Check it out and let me know your thoughts!",
    author: {
      name: "Michael Wilson",
      username: "mikew",
      avatar: "",
    },
    community: {
      name: "AI Enthusiasts",
      slug: "ai-enthusiasts",
    },
    createdAt: "2023-04-02T11:20:00Z",
    likes: 56,
    comments: 19,
  },
  {
    id: "post5",
    type: "post",
    title: "Startup idea validation - feedback needed",
    content:
      "I'm working on a startup idea for a platform that connects students with short-term research opportunities. I've created a landing page and would love to get feedback from the community before I start building the MVP.",
    author: {
      name: "Emily Rodriguez",
      username: "emilyr",
      avatar: "",
    },
    community: {
      name: "Startup Founders",
      slug: "startup-founders",
    },
    createdAt: "2023-03-28T15:10:00Z",
    likes: 31,
    comments: 24,
  },
]

const courses = [
  {
    id: "course1",
    type: "course",
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    instructor: "Prof. Alan Turing",
    studentCount: 156,
    description:
      "Fundamental concepts of programming and computer science. Covers basic algorithms, data structures, and problem-solving techniques.",
    isEnrolled: true,
  },
  {
    id: "course2",
    type: "course",
    code: "CS332",
    name: "Algorithms and Data Structures",
    department: "Computer Science",
    instructor: "Prof. Ada Lovelace",
    studentCount: 98,
    description:
      "Advanced algorithms and data structures. Topics include sorting, searching, graph algorithms, and computational complexity.",
    isEnrolled: false,
  },
  {
    id: "course3",
    type: "course",
    code: "CS425",
    name: "Artificial Intelligence",
    department: "Computer Science",
    instructor: "Prof. John McCarthy",
    studentCount: 112,
    description:
      "Introduction to artificial intelligence concepts including search, knowledge representation, reasoning, planning, and machine learning.",
    isEnrolled: true,
  },
  {
    id: "course4",
    type: "course",
    code: "BUS201",
    name: "Entrepreneurship and Innovation",
    department: "Business",
    instructor: "Prof. Elon Musk",
    studentCount: 87,
    description: "Fundamentals of entrepreneurship, business model development, and startup growth strategies.",
    isEnrolled: false,
  },
  {
    id: "course5",
    type: "course",
    code: "ENG350",
    name: "Robotics Engineering",
    department: "Engineering",
    instructor: "Prof. Rodney Brooks",
    studentCount: 64,
    description:
      "Design and implementation of robotic systems. Covers mechanical design, control systems, and programming for autonomous robots.",
    isEnrolled: false,
  },
]

// Function to filter and return mock search results
export function getMockSearchResults(
  type: "all" | "people" | "communities" | "posts" | "courses",
  query: string,
  filters: {
    university: string
    department: string
    year: string
    sortBy: string
  },
  page = 1,
) {
  const pageSize = 5
  let results: any[] = []

  // Filter by search type
  if (type === "all" || type === "people") {
    const filteredUsers = users.filter((user) => {
      const matchesQuery =
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.bio.toLowerCase().includes(query.toLowerCase())

      const matchesUniversity = !filters.university || user.university === filters.university
      const matchesDepartment = !filters.department || user.department === filters.department
      const matchesYear = !filters.year || user.year === filters.year

      return matchesQuery && matchesUniversity && matchesDepartment && matchesYear
    })

    results = [...results, ...filteredUsers]
  }

  if (type === "all" || type === "communities") {
    const filteredCommunities = communities.filter((community) => {
      return (
        community.name.toLowerCase().includes(query.toLowerCase()) ||
        community.description.toLowerCase().includes(query.toLowerCase())
      )
    })

    results = [...results, ...filteredCommunities]
  }

  if (type === "all" || type === "posts") {
    const filteredPosts = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      )
    })

    results = [...results, ...filteredPosts]
  }

  if (type === "all" || type === "courses") {
    const filteredCourses = courses.filter((course) => {
      const matchesQuery =
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.code.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())

      const matchesDepartment = !filters.department || course.department === filters.department

      return matchesQuery && matchesDepartment
    })

    results = [...results, ...filteredCourses]
  }

  // Sort results
  if (filters.sortBy === "recent") {
    // For posts, we can sort by date
    const postsWithDate = results.filter((r) => r.type === "post")
    const othersWithoutDate = results.filter((r) => r.type !== "post")

    postsWithDate.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    results = [...postsWithDate, ...othersWithoutDate]
  } else if (filters.sortBy === "popular") {
    // For posts, we can sort by likes
    const postsWithLikes = results.filter((r) => r.type === "post")
    const othersWithoutLikes = results.filter((r) => r.type !== "post")

    postsWithLikes.sort((a, b) => b.likes - a.likes)
    results = [...postsWithLikes, ...othersWithoutLikes]
  }

  // Paginate results
  const startIndex = (page - 1) * pageSize
  const paginatedResults = results.slice(startIndex, startIndex + pageSize)

  return {
    results: paginatedResults,
    hasMore: startIndex + pageSize < results.length,
  }
}

export function getSearchResults(
  type: "all" | "people" | "communities" | "posts" | "courses" = "all",
  query = "",
  filters: {
    university?: string
    department?: string
    year?: string
    sortBy?: string
  } = {},
  page = 1,
) {
  return getMockSearchResults(type, query, filters, page)
}
