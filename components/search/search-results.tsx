"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserCard from "./result-cards/user-card"
import CommunityCard from "./result-cards/community-card"
import PostCard from "./result-cards/post-card"
import CourseCard from "./result-cards/course-card"
import { Skeleton } from "@/components/ui/skeleton"
import { getSearchResults } from "@/lib/data/search-results"
import type { SearchResult } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface SearchResultsProps {
  query: string
  filters: any
}

const SearchResults = ({ query, filters }: SearchResultsProps) => {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const data = getSearchResults(query, filters)
        setResults(data)
        setHasMore(data.length >= 10)
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, filters])

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const moreResults = getSearchResults(query, filters)
      setResults((prev) => [...prev, ...moreResults.slice(0, 5)])
      setHasMore(moreResults.length >= 5)
    } catch (error) {
      console.error("Error loading more results:", error)
    } finally {
      setLoadingMore(false)
    }
  }

  const filteredResults = (type: string) => {
    if (type === "all") return results
    return results.filter((result) => result.type === type)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-4 border">
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredResults("all").map((result) => (
            <div key={result.id}>
              {result.type === "user" && <UserCard user={result} />}
              {result.type === "community" && <CommunityCard community={result} />}
              {result.type === "post" && <PostCard post={result} />}
              {result.type === "course" && <CourseCard course={result} />}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          {filteredResults("user").length > 0 ? (
            filteredResults("user").map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="communities" className="space-y-4">
          {filteredResults("community").length > 0 ? (
            filteredResults("community").map((community) => <CommunityCard key={community.id} community={community} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No communities found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          {filteredResults("post").length > 0 ? (
            filteredResults("post").map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          {filteredResults("course").length > 0 ? (
            filteredResults("course").map((course) => <CourseCard key={course.id} course={course} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No courses found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={loadMore}
            disabled={loadingMore}
            variant="outline"
            className="w-full max-w-xs bg-transparent"
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Results"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

export { SearchResults }
export default SearchResults
