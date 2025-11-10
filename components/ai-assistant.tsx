"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function AiAssistant() {
  return (
    <section id="ai-assistant" className="py-20 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-500 rounded-full filter blur-[120px] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg">
              <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                  <div>
                    <h3 className="font-medium">Varsity AI Assistant</h3>
                    <p className="text-xs text-foreground/70">Fine-tuned for Nigerian curriculum</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-green-500/10 rounded-full text-green-500 text-xs font-medium">Online</div>
              </div>
              <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                  <div className="bg-foreground/5 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      Hello! I'm your AI learning assistant. How can I help you with your studies today?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 self-end">
                  <div className="bg-blue-600/10 text-blue-500 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      Can you explain the concept of polymorphism in object-oriented programming?
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    JD
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                  <div className="bg-foreground/5 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      Polymorphism is one of the core concepts in OOP. It allows objects of different classes to be
                      treated as objects of a common superclass. The most common use is when a parent class reference is
                      used to refer to a child class object.
                    </p>
                    <p className="text-sm mt-2">
                      For example, consider a base class <code>Shape</code> with a method <code>calculateArea()</code>.
                      Subclasses like <code>Circle</code> and <code>Rectangle</code> can override this method with their
                      own implementations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-foreground/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask anything about your studies..."
                    className="flex-1 bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button
                    size="icon"
                    className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Personal{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                AI Learning Assistant
              </span>
            </h2>
            <p className="text-lg text-foreground/80 mb-6">
              Get help with your studies from our AI assistant, fine-tuned specifically for Nigerian curriculum and
              academic patterns.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="font-medium">Nigerian Curriculum Focus</h3>
                  <p className="text-foreground/70">Trained on Nigerian educational materials and standards</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="font-medium">Lecturer-Specific Patterns</h3>
                  <p className="text-foreground/70">Understand different lecturers' marking patterns and preferences</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="font-medium">24/7 Learning Support</h3>
                  <p className="text-foreground/70">Get help with assignments, exam prep, and concepts anytime</p>
                </div>
              </li>
            </ul>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white">
              Try AI Assistant
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
