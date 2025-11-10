"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { marketplaceCategories } from "@/lib/data/marketplace-items"
import { ImagePlus, Trash2 } from "lucide-react"
import DashboardNav from "@/components/dashboard/dashboard-nav"

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters.",
    })
    .max(2000, {
      message: "Description must not exceed 2000 characters.",
    }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  originalPrice: z.coerce
    .number()
    .positive({
      message: "Original price must be a positive number.",
    })
    .optional(),
  category: z.string({
    required_error: "Please select a category.",
  }),
  condition: z.string({
    required_error: "Please select a condition.",
  }),
  location: z.string({
    required_error: "Please select a location.",
  }),
  isNegotiable: z.boolean().default(false),
  course: z.string().optional(),
  isbn: z.string().optional(),
  warranty: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateListingForm() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(["/placeholder.svg?height=300&width=300"])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      category: "",
      condition: "",
      location: "",
      isNegotiable: false,
    },
  })

  const selectedCategory = form.watch("category")

  const onSubmit = (values: FormValues) => {
    console.log({ ...values, images })
    // In a real app, this would call an API to create the listing
    router.push("/marketplace")
  }

  const addImage = () => {
    if (images.length < 5) {
      setImages([...images, "/placeholder.svg?height=300&width=300"])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Calculus Textbook 8th Edition" {...field} />
                          </FormControl>
                          <FormDescription>Be specific about what you're selling.</FormDescription>
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
                            <Textarea
                              placeholder="Describe your item in detail. Include condition, features, and any other relevant information."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Be honest about the condition and include all relevant details.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="originalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Original Price ($) (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {marketplaceCategories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="condition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Condition</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Like New">Like New</SelectItem>
                                <SelectItem value="Excellent">Excellent</SelectItem>
                                <SelectItem value="Good">Good</SelectItem>
                                <SelectItem value="Fair">Fair</SelectItem>
                                <SelectItem value="Poor">Poor</SelectItem>
                              </SelectContent>
                            </Select>
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
                          <FormLabel>Location</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="On Campus">On Campus</SelectItem>
                              <SelectItem value="Off Campus (1 mile)">Off Campus (1 mile)</SelectItem>
                              <SelectItem value="Off Campus (2 miles)">Off Campus (2 miles)</SelectItem>
                              <SelectItem value="Off Campus (3+ miles)">Off Campus (3+ miles)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isNegotiable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Price is negotiable</FormLabel>
                            <FormDescription>Allow buyers to make offers on your item.</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Conditional fields based on category */}
                    {selectedCategory === "textbooks" && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="course"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Course (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., MATH 101" {...field} />
                              </FormControl>
                              <FormDescription>Enter the course this textbook is used for.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isbn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ISBN (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 978-1234567890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {selectedCategory === "electronics" && (
                      <FormField
                        control={form.control}
                        name="warranty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warranty Information (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., AppleCare+ until November 2023" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Images</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add up to 5 images of your item. The first image will be the cover image.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Item image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeImage(index)}
                              type="button"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        {images.length < 5 && (
                          <button
                            type="button"
                            onClick={addImage}
                            className="aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:border-blue-600 transition-colors"
                          >
                            <ImagePlus className="h-8 w-8 mb-2" />
                            <span className="text-sm">Add Image</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="text-lg font-medium mb-2">Listing Guidelines</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="rounded-full bg-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>Be honest about the condition of your item</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="rounded-full bg-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>Include clear photos from multiple angles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="rounded-full bg-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>Set a fair price based on condition and market value</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="rounded-full bg-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>Respond promptly to buyer inquiries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="rounded-full bg-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>Meet in safe, public locations for exchanges</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Create Listing
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
