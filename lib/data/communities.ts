import type { Community } from "@/lib/types"

export const communities: Community[] = [
  {
    id: "unilag",
    name: "University of Lagos",
    type: "university",
    description:
      "The official community for University of Lagos students and staff. Share campus news, events, and connect with fellow students across all faculties and departments.",
    members: 15420,
    avatar: null,
    coverImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    joined: true,
    isAdmin: false,
    createdAt: "January 2022",
    activity: "Very Active",
    privacy: "Public",
    location: "Lagos, Nigeria",
    links: [
      {
        title: "Official Website",
        url: "https://unilag.edu.ng",
      },
      {
        title: "Student Portal",
        url: "https://studentportal.unilag.edu.ng",
      },
    ],
    rules: [
      {
        title: "Respectful Communication",
        description: "Treat all members with respect and courtesy.",
      },
      {
        title: "No Spam",
        description: "Do not post irrelevant or promotional content.",
      },
      {
        title: "Academic Integrity",
        description: "Do not share exam answers or violate academic integrity policies.",
      },
    ],
  },
  {
    id: "engineering",
    name: "Faculty of Engineering",
    type: "faculty",
    description:
      "A community for all engineering students at the University of Lagos. Discuss coursework, share resources, and connect with peers across all engineering departments.",
    members: 4250,
    avatar: null,
    coverImage:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    joined: true,
    isAdmin: false,
    createdAt: "February 2022",
    activity: "Very Active",
    privacy: "Public",
    links: [
      {
        title: "Faculty Website",
        url: "https://engineering.unilag.edu.ng",
      },
    ],
  },
  {
    id: "compsci",
    name: "Computer Science",
    type: "department",
    description:
      "The official community for Computer Science students. Get help with assignments, discuss course materials, and stay updated on department announcements.",
    members: 1230,
    avatar: null,
    coverImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    joined: true,
    isAdmin: true,
    createdAt: "March 2022",
    activity: "Very Active",
    privacy: "Public",
    rules: [
      {
        title: "Help, Don't Solve",
        description: "Guide others toward solutions rather than solving problems for them.",
      },
      {
        title: "Proper Attribution",
        description: "Always cite sources and give credit for code or ideas that aren't your own.",
      },
    ],
  },
  {
    id: "level300",
    name: "300 Level",
    type: "level",
    description:
      "A community for all 300 level students across departments. Discuss common courses, share experiences, and collaborate on projects.",
    members: 320,
    avatar: null,
    coverImage:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    joined: true,
    isAdmin: false,
    createdAt: "September 2022",
    activity: "Active",
    privacy: "Public",
  },
  {
    id: "ui",
    name: "University of Ibadan",
    type: "university",
    description: "The official community for University of Ibadan students and staff.",
    members: 12800,
    avatar: null,
    coverImage:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    joined: false,
    isAdmin: false,
    createdAt: "January 2022",
    activity: "Very Active",
    privacy: "Public",
    location: "Ibadan, Nigeria",
  },
  {
    id: "medicine",
    name: "College of Medicine",
    type: "faculty",
    description: "A community for medical students to discuss coursework, clinical rotations, and more.",
    members: 3200,
    avatar: null,
    coverImage:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    joined: false,
    isAdmin: false,
    createdAt: "February 2022",
    activity: "Active",
    privacy: "Public",
  },
  {
    id: "physics",
    name: "Physics Department",
    type: "department",
    description: "Connect with fellow physics students, share resources, and discuss coursework.",
    members: 850,
    avatar: null,
    coverImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    joined: false,
    isAdmin: false,
    createdAt: "March 2022",
    activity: "Moderate",
    privacy: "Public",
  },
  {
    id: "level200",
    name: "200 Level",
    type: "level",
    description: "A community for all 200 level students to connect and collaborate.",
    members: 450,
    avatar: null,
    coverImage:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    joined: false,
    isAdmin: false,
    createdAt: "September 2022",
    activity: "Active",
    privacy: "Public",
  },
]
