"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample Nigerian universities
const schools = [
  { value: "unilag", label: "University of Lagos" },
  { value: "ui", label: "University of Ibadan" },
  { value: "unn", label: "University of Nigeria, Nsukka" },
  { value: "oau", label: "Obafemi Awolowo University" },
  { value: "uniben", label: "University of Benin" },
  { value: "abu", label: "Ahmadu Bello University" },
  { value: "uniport", label: "University of Port Harcourt" },
  { value: "futa", label: "Federal University of Technology, Akure" },
  { value: "futminna", label: "Federal University of Technology, Minna" },
  { value: "lasu", label: "Lagos State University" },
  { value: "aaua", label: "Adekunle Ajasin University" },
  { value: "abuad", label: "Afe Babalola University" },
  { value: "babcock", label: "Babcock University" },
  { value: "covenant", label: "Covenant University" },
  { value: "lautech", label: "Ladoke Akintola University of Technology" },
  { value: "unilorin", label: "University of Ilorin" },
  { value: "unijos", label: "University of Jos" },
  { value: "unimaid", label: "University of Maiduguri" },
  { value: "rsust", label: "Rivers State University of Science and Technology" },
  { value: "delsu", label: "Delta State University" },
]

interface SchoolSelectorProps {
  value: string
  onChange: (value: string) => void
}

export default function SchoolSelector({ value, onChange }: SchoolSelectorProps) {
  const [open, setOpen] = useState(false)

  const selectedSchool = schools.find((school) => school.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between h-10">
          {value ? selectedSchool?.label : "Select your university..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search university..."
              className="flex h-9 w-full rounded-md border-0 bg-transparent py-3 text-sm outline-none placeholder:text-foreground/60 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <ScrollArea className="h-60">
            <CommandList>
              <CommandEmpty>No university found.</CommandEmpty>
              <CommandGroup>
                {schools.map((school) => (
                  <CommandItem
                    key={school.value}
                    value={school.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === school.value ? "opacity-100" : "opacity-0")} />
                    {school.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
