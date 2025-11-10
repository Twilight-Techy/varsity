import { notFound } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import PostDetail from "@/components/posts/post-detail"
import CommentSection from "@/components/posts/comment-section"
import RelatedSidebar from "@/components/posts/related-sidebar"

// This would normally come from a database
const posts = [
  {
    id: 1,
    type: "assignment",
    author: {
      name: "Dr. Adebayo",
      avatar: null,
      role: "Lecturer",
    },
    community: "Computer Science 301",
    title: "Data Structures Assignment",
    content: `
      <p>Implement a balanced binary search tree with insertion, deletion, and traversal methods. Your implementation should handle the following operations:</p>
      
      <ul>
        <li>Insert a new node</li>
        <li>Delete an existing node</li>
        <li>Search for a node</li>
        <li>In-order traversal</li>
        <li>Pre-order traversal</li>
        <li>Post-order traversal</li>
      </ul>
      
      <p>Your code should be well-documented and include appropriate error handling. Additionally, write a brief report (2-3 pages) explaining your implementation, the time complexity of each operation, and any challenges you faced.</p>
      
      <p>Submission Guidelines:</p>
      <ol>
        <li>Submit your code files and report as a single ZIP archive</li>
        <li>Include a README file with instructions on how to run your code</li>
        <li>Make sure your code is properly commented</li>
      </ol>
      
      <p>This assignment is worth 15% of your final grade for this course.</p>
    `,
    deadline: "2023-06-15T23:59:59",
    attachments: [
      {
        name: "assignment_details.pdf",
        size: "245 KB",
        type: "pdf",
      },
    ],
    comments: 8,
    solutions: 3,
    createdAt: "2023-06-01T10:30:00",
  },
  {
    id: 2,
    type: "question",
    author: {
      name: "Chioma Okafor",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
      role: "Student",
    },
    community: "Computer Science",
    title: "Help with Recursion",
    content: `
      <p>I'm struggling to understand how recursion works in the context of tree traversal. Can someone explain with a simple example?</p>
      
      <p>Specifically, I'm confused about:</p>
      <ul>
        <li>How the call stack works during recursion</li>
        <li>When to use the base case</li>
        <li>How to visualize what's happening during recursive calls</li>
      </ul>
      
      <p>I've tried looking at examples online, but I'm still having trouble grasping the concept. Any help would be greatly appreciated!</p>
    `,
    deadline: null,
    attachments: [],
    comments: 12,
    solutions: 5,
    createdAt: "2023-06-02T14:20:00",
  },
]

export default function PostPage({ params }: { params: { id: string } }) {
  const postId = Number.parseInt(params.id)
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-5">
            <PostDetail post={post} />
            <CommentSection postId={postId} postType={post.type} />
          </div>

          {/* Right Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2">
            <RelatedSidebar community={post.community} postType={post.type} currentPostId={postId} />
          </div>
        </div>
      </div>
    </div>
  )
}
