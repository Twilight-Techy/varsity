import Link from "next/link"
import type { Resource } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, FileText, FileQuestion, Download, Star, Eye, Clock, BookMarked } from "lucide-react"

export default function ResourceCard({
  resource,
  view = "grid",
}: {
  resource: Resource
  view?: "grid" | "list"
}) {
  const getIcon = () => {
    switch (resource.type) {
      case "notes":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "textbook":
        return <BookMarked className="h-5 w-5 text-purple-500" />
      case "past-question":
        return <FileQuestion className="h-5 w-5 text-orange-500" />
      case "solution":
        return <BookOpen className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-blue-500" />
    }
  }

  if (view === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-48 h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div className="flex flex-col justify-between flex-1 p-4">
            <div>
              <div className="flex items-center justify-between">
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
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{resource.rating}</span>
                </div>
              </div>
              <Link href={`/resources/${resource.id}`}>
                <h3 className="font-semibold text-lg mt-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{resource.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {resource.course}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {resource.level}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={resource.uploader.avatar || ""} />
                  <AvatarFallback>{resource.uploader.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500 dark:text-gray-400">{resource.uploader.name}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  <span>{resource.views}</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  <span>{resource.downloads}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{resource.uploadDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">{getIcon()}</div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
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
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-medium">{resource.rating}</span>
          </div>
        </div>
        <Link href={`/resources/${resource.id}`}>
          <h3 className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {resource.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{resource.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {resource.course}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {resource.level}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={resource.uploader.avatar || ""} />
            <AvatarFallback>{resource.uploader.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500 dark:text-gray-400">{resource.uploader.name}</span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Download className="h-3.5 w-3.5 mr-1" />
            <span>{resource.downloads}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-3.5 w-3.5 mr-1" />
            <span>{resource.views}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
