import type { Course } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Video, LinkIcon, Download, ExternalLink, File } from "lucide-react"

export default function CourseResources({ course }: { course: Course }) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "video":
        return <Video className="h-5 w-5 text-blue-500" />
      case "link":
        return <LinkIcon className="h-5 w-5 text-green-500" />
      case "document":
        return <File className="h-5 w-5 text-purple-500" />
      case "book":
        return <BookOpen className="h-5 w-5 text-orange-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Course Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="readings">Readings</TabsTrigger>
              <TabsTrigger value="lectures">Lectures</TabsTrigger>
              <TabsTrigger value="additional">Additional</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-6">
            {course.resources.map((section, index) => (
              <div key={index}>
                <h3 className="font-medium mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((resource, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getResourceIcon(resource.type)}
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-sm text-muted-foreground">{resource.description}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {resource.type === "link" ? (
                              <Button size="sm" variant="outline" className="gap-1">
                                <ExternalLink className="h-4 w-4" />
                                <span>Open</span>
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="gap-1">
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Textbooks & References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {course.textbooks.map((book, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">by {book.author}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {book.publisher}, {book.year}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{book.required ? "Required" : "Optional"}</Badge>
                        {book.isbn && <Badge variant="outline">ISBN: {book.isbn}</Badge>}
                      </div>
                    </div>

                    {book.link && (
                      <Button size="sm" variant="outline" className="gap-1 flex-shrink-0">
                        <ExternalLink className="h-4 w-4" />
                        <span>Purchase</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
