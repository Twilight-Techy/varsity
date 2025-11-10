"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { Loader2, ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import Link from "next/link"
import { courses } from "@/lib/data/courses"

const createStudyGroupSchema = z.object({
  name: z.string().min(3, { message: "Group name must be at least 3 characters" }).max(50),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(500),
  courseId: z.string().optional(),
  privacy: z.enum(["public", "private", "course"]),
  location: z.string().optional(),
  meetingType: z.enum(["in-person", "online", "hybrid"]),
  meetingDate: z.date().optional(),
  meetingTime: z.string().optional(),
  meetingLink: z.string().optional(),
  maxMembers: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

type CreateStudyGroupFormValues = z.infer<typeof createStudyGroupSchema>

export default function CreateStudyGroupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const availableTags = [
    "Exam Prep",
    "Assignment Help",
    "Project Collaboration",
    "Weekly Review",
    "Problem Solving",
    "Reading Group",
    "Lab Work",
  ]

  const form = useForm<CreateStudyGroupFormValues>({
    resolver: zodResolver(createStudyGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      courseId: "",
      privacy: "public",
      location: "",
      meetingType: "in-person",
      meetingTime: "",
      meetingLink: "",
      maxMembers: "10",
      tags: [],
    },
  })

  function onSubmit(data: CreateStudyGroupFormValues) {
    setIsLoading(true)
    data.tags = selectedTags

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
      router.push("/study-groups")
    }, 1500)
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />
      <div className="flex-1 container mx-auto px-4 py-6 pt-20">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/study-groups">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Study Groups
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Create a Study Group</h1>
            <p className="text-foreground/70">Connect with classmates and study together</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg p-6"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter study group name" {...field} />
                      </FormControl>
                      <FormDescription>Choose a clear, descriptive name for your study group.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your study group..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormDescription>
                        Explain the purpose, goals, and what participants can expect from this group.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Course (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">No specific course</SelectItem>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.code}: {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Link this study group to a specific course if applicable.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Privacy Setting</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="public" />
                            </FormControl>
                            <FormLabel className="font-normal">Public - Anyone can view and join</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="course" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Course Only - Only students enrolled in the selected course can join
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="private" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Private - Only invited members can view and join
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meetingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meeting type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="in-person">In-Person</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="hybrid">Hybrid (Both)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How will your study group meet?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="meetingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>First Meeting Date (Optional)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>When will your first meeting take place?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meetingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meeting Time (Optional)</FormLabel>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-foreground/60" />
                          <FormControl>
                            <Input type="time" placeholder="Select time" {...field} />
                          </FormControl>
                        </div>
                        <FormDescription>What time will your meetings start?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Optional)</FormLabel>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-foreground/60" />
                        <FormControl>
                          <Input placeholder="e.g., Library Room 204, Campus Center" {...field} />
                        </FormControl>
                      </div>
                      <FormDescription>Where will in-person meetings take place?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meetingLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Link (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Zoom or Google Meet link" {...field} />
                      </FormControl>
                      <FormDescription>Provide a link for online meetings.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxMembers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Members</FormLabel>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-foreground/60" />
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select maximum members" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">5 members</SelectItem>
                            <SelectItem value="10">10 members</SelectItem>
                            <SelectItem value="15">15 members</SelectItem>
                            <SelectItem value="20">20 members</SelectItem>
                            <SelectItem value="25">25 members</SelectItem>
                            <SelectItem value="30">30 members</SelectItem>
                            <SelectItem value="unlimited">No limit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormDescription>Limit the number of participants in your group.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Tags (Optional)</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableTags.map((tag) => (
                      <div
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                          selectedTags.includes(tag)
                            ? "bg-blue-600 text-white"
                            : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                        }`}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <FormDescription className="mt-2">
                    Select tags that describe the focus of your study group.
                  </FormDescription>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Study Group...
                    </>
                  ) : (
                    "Create Study Group"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
