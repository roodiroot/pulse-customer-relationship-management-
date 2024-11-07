"use client";

import { z } from "zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { SearchSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const SearchPanel = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: z.infer<typeof SearchSchema>) {
    router.push(`/search?text=${values.text}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="search"
                    placeholder="Enter at least 4 characters to search."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default SearchPanel;
