import DashboardNav from "@/components/dashboard/dashboard-nav"
import PostFeed from "@/components/dashboard/post-feed"
import RightSidebar from "@/components/dashboard/right-sidebar"
import CreatePostButton from "@/components/dashboard/create-post-button"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg">
                <div className="p-4 border-b border-foreground/10">
                  <h2 className="font-semibold">Your Communities</h2>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                      UL
                    </div>
                    <div>
                      <p className="font-medium text-sm">University of Lagos</p>
                      <p className="text-xs text-foreground/70">15.4K members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                      FE
                    </div>
                    <div>
                      <p className="font-medium text-sm">Faculty of Engineering</p>
                      <p className="text-xs text-foreground/70">4.2K members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      CS
                    </div>
                    <div>
                      <p className="font-medium text-sm">Computer Science</p>
                      <p className="text-xs text-foreground/70">1.2K members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                      300
                    </div>
                    <div>
                      <p className="font-medium text-sm">300 Level</p>
                      <p className="text-xs text-foreground/70">320 members</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-foreground/10">
                  <button className="w-full text-sm text-blue-500 hover:text-blue-600 font-medium">
                    View All Communities
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg">
                <div className="p-4 border-b border-foreground/10">
                  <h2 className="font-semibold">Upcoming Classes</h2>
                </div>
                <div className="p-4 space-y-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">Data Structures</h3>
                      <span className="px-2 py-1 bg-blue-600/10 rounded-full text-blue-500 text-xs font-medium">
                        In 30 mins
                      </span>
                    </div>
                    <p className="text-xs text-foreground/70 mb-2">Room 401, Computer Science Building</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-foreground/70">10:00 AM - 12:00 PM</span>
                      <button className="text-xs text-blue-500 font-medium">Set Reminder</button>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">Database Systems</h3>
                      <span className="px-2 py-1 bg-purple-600/10 rounded-full text-purple-500 text-xs font-medium">
                        Tomorrow
                      </span>
                    </div>
                    <p className="text-xs text-foreground/70 mb-2">Lab 2, Computer Science Building</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-foreground/70">2:00 PM - 4:00 PM</span>
                      <button className="text-xs text-purple-500 font-medium">Set Reminder</button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-foreground/10">
                  <button className="w-full text-sm text-blue-500 hover:text-blue-600 font-medium">
                    View Full Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <CreatePostButton />
            <PostFeed />
          </div>

          {/* Right Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
