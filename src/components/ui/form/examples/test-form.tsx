"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const testSchema = z.object({
  testField: z.string().min(1, "This field is required"),
});

type TestFormData = z.infer<typeof testSchema>;

export function TestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
  });

  const onSubmit = (data: TestFormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("testField")} className="border p-2 rounded" />
        {errors.testField && (
          <p className="text-red-500">{errors.testField.message}</p>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Test Submit
      </button>
    </form>
  );
}
