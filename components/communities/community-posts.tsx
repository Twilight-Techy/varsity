"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Paperclip, ImageIcon, Send, Filter } from "lucide-react"
import PostCard from "@/components/dashboard/post-card"
import { communityPosts } from "@/lib/data/community-posts"

interface CommunityPostsProps {
  communityId: string
}

export default function CommunityPosts({ communityId }: CommunityPostsProps) {
  const [postContent, setPostContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filter posts for this community
  const posts = communityPosts.filter((post) => post.communityId === communityId)

  const handleCreatePost = () => {
    if (!postContent.trim() || isLoading) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Creating post:", postContent)
      setPostContent("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Create post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm rounded-xl border border-foreground/10 p-4"
      >
        <Textarea
          placeholder="Share something with the community..."
          className="min-h-[100px] mb-4 bg-background/50 border-foreground/10 focus-visible:ring-blue-500"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <Paperclip className="h-4 w-4 text-foreground/60" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <ImageIcon className="h-4 w-4 text-foreground/60" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <FileText className="h-4 w-4 text-foreground/60" />
            </Button>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={handleCreatePost}
            disabled={!postContent.trim() || isLoading}
          >
            <Send className="mr-2 h-4 w-4" /> Post
          </Button>
        </div>
      </motion.div>

      {/* Posts filter */}
      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm border border-foreground/10 p-1">
            <TabsTrigger
              value="all"
              className="rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              All Posts
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Announcements
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Assignments
            </TabsTrigger>
            <TabsTrigger
              value="questions"
              className="rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Questions
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="sm" className="ml-2 hidden md:flex">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Posts list */}
      <TabsContent value="all" className="mt-0 space-y-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No posts yet</h3>
            <p className="text-foreground/70">Be the first to post in this community!</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="announcements" className="mt-0 space-y-4">
        {posts.filter((post) => post.type === "announcement").length > 0 ? (
          posts
            .filter((post) => post.type === "announcement")
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No announcements yet</h3>
            <p className="text-foreground/70">Check back later for community announcements.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="assignments" className="mt-0 space-y-4">
        {posts.filter((post) => post.type === "assignment").length > 0 ? (
          posts
            .filter((post) => post.type === "assignment")
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No assignments yet</h3>
            <p className="text-foreground/70">There are no assignments posted in this community.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="questions" className="mt-0 space-y-4">
        {posts.filter((post) => post.type === "question").length > 0 ? (
          posts
            .filter((post) => post.type === "question")
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No questions yet</h3>
            <p className="text-foreground/70">Be the first to ask a question in this community!</p>
          </div>
        )}
      </TabsContent>
    </div>
  )
}
