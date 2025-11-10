"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Globe, MapPin, LinkIcon, Edit } from "lucide-react"
import type { Community } from "@/lib/types"

interface CommunityAboutProps {
  community: Community
}

export default function CommunityAbout({ community }: CommunityAboutProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">About</h2>
          {community.isAdmin && (
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          )}
        </div>
        <p className="text-foreground/80 whitespace-pre-line">{community.description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm rounded-xl border border-foreground/10 p-5">
          <h3 className="font-semibold mb-4">Community Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-foreground/70">{community.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Activity</p>
                <p className="text-sm text-foreground/70">{community.activity}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Privacy</p>
                <p className="text-sm text-foreground/70">{community.privacy}</p>
              </div>
            </div>
            {community.location && (
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-foreground/70">{community.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm rounded-xl border border-foreground/10 p-5">
          <h3 className="font-semibold mb-4">Related Links</h3>
          {community.links && community.links.length > 0 ? (
            <div className="space-y-3">
              {community.links.map((link, index) => (
                <div key={index} className="flex items-center gap-3">
                  <LinkIcon className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{link.title}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-foreground/70">No related links available.</p>
          )}
        </div>
      </motion.div>

      {community.rules && community.rules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm rounded-xl border border-foreground/10 p-5"
        >
          <h3 className="font-semibold mb-4">Community Rules</h3>
          <ol className="list-decimal list-inside space-y-2">
            {community.rules.map((rule, index) => (
              <li key={index} className="text-foreground/80">
                <span className="font-medium">{rule.title}:</span> {rule.description}
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </div>
  )
}
