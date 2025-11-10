import type { Resource } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Download,
  Share2,
  Bookmark,
  ThumbsUp,
  Flag,
  FileText,
  BookMarked,
  FileQuestion,
  BookOpen,
  Star,
  Eye,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ResourceDetail({ resource }: { resource: Resource }) {
  const getIcon = () => {
    switch (resource.type) {
      case "notes":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "textbook":
        return <BookMarked className="h-6 w-6 text-purple-500" />
      case "past-question":
        return <FileQuestion className="h-6 w-6 text-orange-500" />
      case "solution":
        return <BookOpen className="h-6 w-6 text-green-500" />
      default:
        return <FileText className="h-6 w-6 text-blue-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Link
        href="/resources"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Resources
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge
                variant="outline"
                className={`
                  ${
                    resource.type === "notes"
                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                      : resource.type === "textbook"
                        ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"
                        : resource.type === "past-question"
                          ? "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300"
                          : "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
                  }
                `}
              >
                {resource.type.replace("-", " ")}
              </Badge>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(resource.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-sm font-medium ml-1">{resource.rating}</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">{resource.title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{resource.course}</Badge>
              <Badge variant="secondary">{resource.department}</Badge>
              <Badge variant="secondary">{resource.level}</Badge>
              <Badge variant="secondary">{resource.school}</Badge>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={resource.uploader.avatar || ""} />
                  <AvatarFallback>{resource.uploader.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{resource.uploader.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded on {resource.uploadDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{resource.views} views</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  <span>{resource.downloads} downloads</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="ghost" size="icon">
                <Flag className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-2">
              <h2 className="text-lg font-semibold mb-3">About this resource</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{resource.description}</p>

              {resource.contents && (
                <>
                  <h3 className="text-md font-semibold mb-2">Contents</h3>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    {resource.contents.map((item, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">File Format</h3>
                  <p>{resource.fileFormat}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">File Size</h3>
                  <p>{resource.fileSize}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Pages</h3>
                  <p>{resource.pages || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Language</h3>
                  <p>{resource.language || "English"}</p>
                </div>
              </div>

              {resource.tags && resource.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="preview" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-2">
              <div className="flex items-center justify-center h-80 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
                <div className="text-center">
                  <div className="flex justify-center mb-4">{getIcon()}</div>
                  <h3 className="text-lg font-medium mb-2">Preview Available</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Download the resource to view the full content
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Now
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-4">
                {resource.reviews && resource.reviews.length > 0 ? (
                  resource.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={review.user.avatar || ""} />
                            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{review.user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3.5 w-3.5 ${
                                star <= review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">No reviews yet</p>
                    <Button variant="outline">Be the first to review</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Resource Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Course</span>
                  <span className="font-medium">{resource.course}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Department</span>
                  <span className="font-medium">{resource.department}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Level</span>
                  <span className="font-medium">{resource.level}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">School</span>
                  <span className="font-medium">{resource.school}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Format</span>
                  <span className="font-medium">{resource.fileFormat}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Size</span>
                  <span className="font-medium">{resource.fileSize}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Uploaded</span>
                  <span className="font-medium">{resource.uploadDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Uploader</h2>
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={resource.uploader.avatar || ""} />
                  <AvatarFallback>{resource.uploader.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{resource.uploader.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{resource.uploader.role || "Student"}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Related Resources</h2>
              <div className="space-y-4">
                {resource.related && resource.related.length > 0 ? (
                  resource.related.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                    >
                      <div className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center shrink-0">
                        {item.type === "notes" ? (
                          <FileText className="h-5 w-5 text-blue-500" />
                        ) : item.type === "textbook" ? (
                          <BookMarked className="h-5 w-5 text-purple-500" />
                        ) : item.type === "past-question" ? (
                          <FileQuestion className="h-5 w-5 text-orange-500" />
                        ) : (
                          <BookOpen className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/resources/${item.id}`}
                          className="font-medium text-sm hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.course}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No related resources found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
