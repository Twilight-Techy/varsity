"use client"

import { motion } from "framer-motion"
import { BookOpen, Calendar, Clock, FileText, MessageSquare, PenTool, Share2, Users } from "lucide-react"

const features = [
  {
    icon: <FileText className="h-10 w-10 text-blue-500" />,
    title: "Rich Post Creation",
    description: "Create posts for assignments, announcements, questions with rich formatting and media support.",
    delay: 0.1,
  },
  {
    icon: <Users className="h-10 w-10 text-blue-500" />,
    title: "Hierarchical Communities",
    description: "Automatically join tree-based communities for your school, faculty, department, and level.",
    delay: 0.2,
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
    title: "AI Learning Assistant",
    description: "Get help from our AI assistant fine-tuned on Nigerian curriculum and lecturer-specific patterns.",
    delay: 0.3,
  },
  {
    icon: <Calendar className="h-10 w-10 text-blue-500" />,
    title: "Class & Lab Scheduling",
    description: "Add and track classes and labs with automatic reminders and notifications.",
    delay: 0.4,
  },
  {
    icon: <PenTool className="h-10 w-10 text-blue-500" />,
    title: "Assignment Solutions",
    description: "Post solutions to assignments and questions, with comments and nested replies.",
    delay: 0.5,
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-500" />,
    title: "Smart Notifications",
    description: "Receive timely notifications for posts, deadlines, classes, and more.",
    delay: 0.6,
  },
  {
    icon: <Share2 className="h-10 w-10 text-blue-500" />,
    title: "Community Broadcasting",
    description: "Include metadata in posts to broadcast to specific communities and set deadlines.",
    delay: 0.7,
  },
  {
    icon: <BookOpen className="h-10 w-10 text-blue-500" />,
    title: "Academic Focus",
    description: "Everything is designed around academic collaboration and success.",
    delay: 0.8,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full filter blur-[150px] opacity-15" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full filter blur-[150px] opacity-15" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Academic Success
            </span>
          </h2>
          <p className="text-lg text-foreground/80">
            Varsity combines social networking with academic tools to create the ultimate platform for university
            students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-6 hover:shadow-lg hover:border-blue-500/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg inline-block group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
