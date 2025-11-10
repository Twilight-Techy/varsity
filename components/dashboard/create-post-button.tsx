"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, PlusCircle, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreatePostButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="post" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="post" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Post
            </TabsTrigger>
            <TabsTrigger value="assignment" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Assignment
            </TabsTrigger>
            <TabsTrigger value="question" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Question
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="post-title">Title</Label>
              <Input id="post-title" placeholder="Enter a title for your post" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-content">Content</Label>
              <Textarea id="post-content" placeholder="What would you like to share?" className="min-h-[150px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-community">Community</Label>
              <Select>
                <SelectTrigger id="post-community">
                  <SelectValue placeholder="Select a community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="university">University of Lagos</SelectItem>
                  <SelectItem value="faculty">Faculty of Engineering</SelectItem>
                  <SelectItem value="department">Computer Science</SelectItem>
                  <SelectItem value="level">300 Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Send className="mr-2 h-4 w-4" /> Post
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="assignment" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assignment-title">Assignment Title</Label>
              <Input id="assignment-title" placeholder="Enter a title for your assignment" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-content">Description</Label>
              <Textarea id="assignment-content" placeholder="Describe the assignment" className="min-h-[150px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignment-community">Community</Label>
                <Select>
                  <SelectTrigger id="assignment-community">
                    <SelectValue placeholder="Select a community" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="university">University of Lagos</SelectItem>
                    <SelectItem value="faculty">Faculty of Engineering</SelectItem>
                    <SelectItem value="department">Computer Science</SelectItem>
                    <SelectItem value="level">300 Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignment-deadline">Deadline</Label>
                <Input id="assignment-deadline" type="datetime-local" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Send className="mr-2 h-4 w-4" /> Post Assignment
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="question" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question-title">Question Title</Label>
              <Input id="question-title" placeholder="What's your question?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="question-content">Details</Label>
              <Textarea
                id="question-content"
                placeholder="Provide more details about your question"
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="question-community">Community</Label>
              <Select>
                <SelectTrigger id="question-community">
                  <SelectValue placeholder="Select a community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="university">University of Lagos</SelectItem>
                  <SelectItem value="faculty">Faculty of Engineering</SelectItem>
                  <SelectItem value="department">Computer Science</SelectItem>
                  <SelectItem value="level">300 Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Send className="mr-2 h-4 w-4" /> Ask Question
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
