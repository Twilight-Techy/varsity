"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Paperclip,
  ImageIcon,
  FileCode,
  Sparkles,
  Lightbulb,
  BookOpen,
  GraduationCap,
  Copy,
  Check,
  Loader2,
} from "lucide-react"
import ChatMessage from "./chat-message"
import { cn } from "@/lib/utils"

// Sample messages for demonstration
const initialMessages = [
  {
    id: "1",
    role: "assistant",
    content:
      "👋 Hello! I'm your AI learning assistant, fine-tuned specifically for Nigerian university curriculum. How can I help you with your studies today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  // Simple response generation for demo purposes
  const getAIResponse = (query: string) => {
    if (query.toLowerCase().includes("recursion")) {
      return `
Recursion is a programming concept where a function calls itself to solve a problem. It's particularly useful for problems that can be broken down into smaller, similar subproblems.

Here's a simple example of recursion in tree traversal:

\`\`\`python
def inorder_traversal(node):
    if node is None:
        return
    
    # First, visit left subtree
    inorder_traversal(node.left)
    
    # Then, visit the current node
    print(node.value)
    
    # Finally, visit right subtree
    inorder_traversal(node.right)
\`\`\`

The key components of recursion are:
1. **Base case**: A condition that stops the recursion (in this example, when node is None)
2. **Recursive case**: Where the function calls itself with a simpler version of the problem

When working with recursion, it's important to ensure you have a proper base case to avoid infinite recursion, which would cause a stack overflow.

Would you like me to explain a specific aspect of recursion in more detail?
      `
    } else if (query.toLowerCase().includes("database") || query.toLowerCase().includes("normalization")) {
      return `
Database normalization is the process of structuring a database to reduce data redundancy and improve data integrity. It involves organizing fields and tables to minimize duplication and dependency.

The main normal forms are:

1. **First Normal Form (1NF)**:
   - Each table cell should contain a single value
   - Each record needs to be unique

2. **Second Normal Form (2NF)**:
   - Table is in 1NF
   - All non-key attributes are fully dependent on the primary key

3. **Third Normal Form (3NF)**:
   - Table is in 2NF
   - No transitive dependencies (non-key attributes depend only on the primary key)

4. **Boyce-Codd Normal Form (BCNF)**:
   - A stricter version of 3NF
   - For any dependency A → B, A should be a super key

5. **Fourth Normal Form (4NF)**:
   - Table is in BCNF
   - No multi-valued dependencies

Here's a simple example of normalization:

**Unnormalized Table**:
| StudentID | Name | Courses | Grades |
|-----------|------|---------|--------|
| 1 | John | Math, Physics | A, B |

**After 1NF**:
| StudentID | Name | Course | Grade |
|-----------|------|--------|-------|
| 1 | John | Math | A |
| 1 | John | Physics | B |

Would you like me to explain any specific normal form in more detail?
      `
    } else {
      return `
I'd be happy to help you with that! Based on your question, I can provide information about ${query}.

Nigerian university curriculum often covers this topic in depth, and I can offer explanations tailored to your specific course requirements.

Some key points to consider:
1. Understanding the fundamental concepts
2. Applying theoretical knowledge to practical scenarios
3. Preparing effectively for examinations on this topic

Would you like me to:
- Explain basic concepts related to this topic?
- Provide example problems and solutions?
- Suggest study resources specific to your university's curriculum?

Let me know how I can best assist you with your studies!
      `
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = () => {
    const text = messages.map((msg) => `${msg.role === "user" ? "You" : "AI"}: ${msg.content}`).join("\n\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="border-b border-foreground/10">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <TabsList className="h-14 bg-transparent">
                <TabsTrigger
                  value="chat"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4"
                >
                  <BookOpen className="mr-2 h-4 w-4 text-purple-500" />
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="exam-prep"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4"
                >
                  <GraduationCap className="mr-2 h-4 w-4 text-green-500" />
                  Exam Prep
                </TabsTrigger>
              </TabsList>

              <Button
                variant="ghost"
                size="sm"
                className="text-foreground/60 hover:text-foreground"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Chat
                  </>
                )}
              </Button>
            </div>
          </div>

          <TabsContent value="chat" className="flex-1 m-0 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-foreground/5 rounded-lg p-3 max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        <p className="text-sm text-foreground/70">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t border-foreground/10 p-4">
              <div className="max-w-3xl mx-auto">
                <div className="bg-background rounded-lg border border-foreground/10 shadow-sm">
                  <div className="flex items-end">
                    <Textarea
                      placeholder="Ask anything about your studies..."
                      className="min-h-[80px] border-0 focus-visible:ring-0 resize-none"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border-t border-foreground/10">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Paperclip className="h-4 w-4 text-foreground/60" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <ImageIcon className="h-4 w-4 text-foreground/60" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <FileCode className="h-4 w-4 text-foreground/60" />
                      </Button>
                    </div>
                    <Button
                      className={cn(
                        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                        (!inputValue.trim() || isLoading) && "opacity-50 cursor-not-allowed",
                      )}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Send
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Lightbulb className="h-3 w-3 mr-1 text-yellow-500" />
                    Explain recursion
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Lightbulb className="h-3 w-3 mr-1 text-blue-500" />
                    Database normalization
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Lightbulb className="h-3 w-3 mr-1 text-purple-500" />
                    Algorithm complexity
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="flex-1 m-0 overflow-auto p-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-4">Learning Resources</h2>
              <p className="text-foreground/70 mb-6">
                Access curated learning materials tailored to your Nigerian university curriculum.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                  <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="font-semibold mb-1">Computer Science</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Data structures, algorithms, programming languages, and more.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Browse Resources
                  </Button>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                  <BookOpen className="h-8 w-8 text-purple-500 mb-2" />
                  <h3 className="font-semibold mb-1">Engineering</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Mechanics, electronics, thermodynamics, and engineering principles.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Browse Resources
                  </Button>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                  <BookOpen className="h-8 w-8 text-green-500 mb-2" />
                  <h3 className="font-semibold mb-1">Mathematics</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Calculus, linear algebra, statistics, and mathematical concepts.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Browse Resources
                  </Button>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                  <BookOpen className="h-8 w-8 text-orange-500 mb-2" />
                  <h3 className="font-semibold mb-1">Business Studies</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Economics, accounting, management, and business principles.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Browse Resources
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exam-prep" className="flex-1 m-0 overflow-auto p-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-4">Exam Preparation</h2>
              <p className="text-foreground/70 mb-6">
                Get help preparing for your exams with practice questions, study guides, and more.
              </p>

              <div className="space-y-4">
                <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Practice Questions</h3>
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-sm text-foreground/70 mb-3">
                    Test your knowledge with practice questions from previous exams.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Start Practice
                  </Button>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Study Guides</h3>
                    <BookOpen className="h-5 w-5 text-purple-500" />
                  </div>
                  <p className="text-sm text-foreground/70 mb-3">Access comprehensive study guides for your courses.</p>
                  <Button variant="outline" className="w-full">
                    View Study Guides
                  </Button>
                </div>

                <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Exam Strategies</h3>
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-sm text-foreground/70 mb-3">
                    Learn effective strategies for exam preparation and time management.
                  </p>
                  <Button variant="outline" className="w-full">
                    Read Strategies
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
