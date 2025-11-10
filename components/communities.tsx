"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const communities = [
  {
    name: "University of Lagos",
    type: "University",
    members: 15420,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    color: "from-blue-600 to-blue-400",
  },
  {
    name: "Faculty of Engineering",
    type: "Faculty",
    members: 4250,
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    color: "from-purple-600 to-purple-400",
  },
  {
    name: "Computer Science",
    type: "Department",
    members: 1230,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    color: "from-green-600 to-green-400",
  },
  {
    name: "300 Level",
    type: "Level",
    members: 320,
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    color: "from-yellow-600 to-yellow-400",
  },
]

export default function Communities() {
  return (
    <section id="communities" className="py-20 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full filter blur-[150px] opacity-15" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full filter blur-[150px] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Thriving Communities
            </span>
          </h2>
          <p className="text-lg text-foreground/80">
            Automatically connect with communities at every level of your academic journey, from university-wide to your
            specific class.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((community, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg hover:border-blue-500/20 transition-all group relative"
            >
              <div className="h-40 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${community.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                />
                <img
                  src={community.image || "/placeholder.svg"}
                  alt={community.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 bg-foreground/10 backdrop-blur-sm rounded-full text-xs font-medium">
                    {community.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{community.name}</h3>
                <p className="text-foreground/70 text-sm mb-4">{community.members.toLocaleString()} members</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10"
                >
                  View Community
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            Explore All Communities
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
