"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CheckboxGroup } from "@/components/ui/form/checkbox-group";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";

// Real restaurant types from HubSpot
const RESTAURANT_TYPES = [
  { label: "Fast Casual", value: "fast_casual" },
  { label: "Quick Service", value: "quick_service" },
  { label: "Fine Dining", value: "fine_dining" },
  { label: "Casual Dining", value: "casual_dining" },
  { label: "Food Truck", value: "food_truck" },
];

// Real POS systems from HubSpot
export const POS_SYSTEMS = [
  { label: "Square", value: "square" },
  { label: "Toast", value: "toast" },
  { label: "Clover", value: "clover" },
  { label: "Revel", value: "revel" },
  { label: "TouchBistro", value: "touchbistro" },
];

// Real delivery partners from HubSpot
const DELIVERY_PARTNERS = [
  { label: "UberEats", value: "ubereats" },
  { label: "DoorDash", value: "doordash" },
  { label: "GrubHub", value: "grubhub" },
  { label: "Postmates", value: "postmates" },
];

export function FormComponentsPreview() {
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedPartners, setSelectedPartners] = React.useState<string[]>([]);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-6 text-secondary">
        Form Components Preview
      </h2>

      {/* Text Input */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-secondary dark:text-primary">
          Text Inputs
        </h3>
        <FormField label="Default Input">
          <Input placeholder="Restaurant name" />
        </FormField>
        <FormField
          label="Error Input"
          error
          helperText="This field is required"
        >
          <Input error placeholder="Restaurant name" />
        </FormField>
      </section>

      {/* Number Input */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Number Inputs
        </h3>
        <FormField label="Number of Locations">
          <Input type="number" placeholder="Enter number" />
        </FormField>
        <FormField label="Monthly Orders">
          <Input type="number" placeholder="Enter amount" />
        </FormField>
      </section>

      {/* Select */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Dropdowns
        </h3>
        <FormField label="Restaurant Type">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {RESTAURANT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </section>

      {/* Checkbox Group */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Checkbox Groups
        </h3>
        <FormField label="Delivery Partners">
          <CheckboxGroup
            options={DELIVERY_PARTNERS}
            value={selectedPartners}
            onChange={setSelectedPartners}
          />
        </FormField>
      </section>

      {/* Textarea */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Text Area
        </h3>
        <FormField label="Notes">
          <Textarea placeholder="Enter additional notes..." />
        </FormField>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Buttons
        </h3>
        <div className="flex gap-4">
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </div>
  );
}
