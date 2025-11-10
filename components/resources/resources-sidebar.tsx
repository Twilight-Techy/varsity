import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  FileText,
  FileQuestion,
  Upload,
  Search,
  Filter,
  BookMarked,
  GraduationCap,
  Building,
  Users,
  BookText,
  Plus,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function ResourcesSidebar() {
  return (
    <div className="w-full md:w-72 lg:w-80 shrink-0 border-r bg-white dark:bg-gray-800/40 md:h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Resources</h2>
          <Link href="/resources/upload">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Upload
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
          />
        </div>

        <Separator />

        <div className="space-y-1">
          <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Resource Types</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/resources?type=all">
                <BookOpen className="mr-2 h-4 w-4" />
                All Resources
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/resources?type=notes">
                <FileText className="mr-2 h-4 w-4" />
                Lecture Notes
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/resources?type=textbooks">
                <BookMarked className="mr-2 h-4 w-4" />
                Textbooks
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/resources?type=past-questions">
                <FileQuestion className="mr-2 h-4 w-4" />
                Past Questions
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/resources?type=solutions">
                <BookText className="mr-2 h-4 w-4" />
                Solutions
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/resources?type=my-uploads">
                <Upload className="mr-2 h-4 w-4" />
                My Uploads
              </Link>
            </Button>
          </div>
        </div>

        <Separator />

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="school">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                <span>School</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="school-1" />
                  <label
                    htmlFor="school-1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    University of Lagos
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="school-2" />
                  <label
                    htmlFor="school-2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    University of Ibadan
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="school-3" />
                  <label
                    htmlFor="school-3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Covenant University
                  </label>
                </div>
                <Button variant="link" size="sm" className="text-xs pl-0">
                  Show more
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faculty">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>Faculty</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="faculty-1" />
                  <label
                    htmlFor="faculty-1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Engineering
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="faculty-2" />
                  <label
                    htmlFor="faculty-2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sciences
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="faculty-3" />
                  <label
                    htmlFor="faculty-3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Arts
                  </label>
                </div>
                <Button variant="link" size="sm" className="text-xs pl-0">
                  Show more
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="department">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                <span>Department</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="dept-1" />
                  <label
                    htmlFor="dept-1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Computer Science
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dept-2" />
                  <label
                    htmlFor="dept-2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Electrical Engineering
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dept-3" />
                  <label
                    htmlFor="dept-3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Economics
                  </label>
                </div>
                <Button variant="link" size="sm" className="text-xs pl-0">
                  Show more
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="level">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Level</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="level-1" />
                  <label
                    htmlFor="level-1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    100 Level
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="level-2" />
                  <label
                    htmlFor="level-2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    200 Level
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="level-3" />
                  <label
                    htmlFor="level-3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    300 Level
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="level-4" />
                  <label
                    htmlFor="level-4"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    400 Level
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="level-5" />
                  <label
                    htmlFor="level-5"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    500 Level
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="level-6" />
                  <label
                    htmlFor="level-6"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Postgraduate
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="course">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <BookText className="mr-2 h-4 w-4" />
                <span>Course</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="mb-2 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox id="course-1" />
                  <label
                    htmlFor="course-1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    CSC 101
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="course-2" />
                  <label
                    htmlFor="course-2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    MTH 101
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="course-3" />
                  <label
                    htmlFor="course-3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    PHY 101
                  </label>
                </div>
                <Button variant="link" size="sm" className="text-xs pl-0">
                  Show more
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Rating</h3>
            <Slider defaultValue={[3]} max={5} step={1} className="py-4" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Any</span>
              <span>3★+</span>
              <span>4★+</span>
              <span>5★</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Sort By</h3>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="downloads">Most Downloads</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-2">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
