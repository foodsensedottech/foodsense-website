"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/data-display/card";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/form/select";
import { Checkbox } from "@/components/ui/form/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/form/radio-group";
import { useTheme } from "next-themes";
import { Icon } from "@/lib/icons";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function UIShowcase() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-10 space-y-10">
          {/* Theme Toggle */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Icon
                name={theme === "dark" ? "sun" : "moon"}
                className="h-5 w-5"
              />
            </Button>
          </div>

          {/* Buttons Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="error">Error</Button>
              <Button isLoading>Loading</Button>
            </div>
          </section>

          {/* Cards Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Cards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content with some text</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Form Elements */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Form Elements</h2>
            <div className="grid gap-6 max-w-sm">
              <Input placeholder="Enter text..." />
              <Textarea placeholder="Enter longer text..." />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Checkbox id="terms" />
                <label htmlFor="terms">Accept terms</label>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
