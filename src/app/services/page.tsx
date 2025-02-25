import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | FoodSense",
  description:
    "Restaurant optimization and analytics services provided by FoodSense",
  openGraph: {
    title: "Services | FoodSense",
    description:
      "Restaurant optimization and analytics services provided by FoodSense",
    url: "https://foodsense.tech/services",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | FoodSense",
    description:
      "Restaurant optimization and analytics services provided by FoodSense",
  },
};

export const revalidate = 3600; // Revalidate at most once per hour

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Service Cards */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Menu Optimization</h2>
          <p className="text-gray-600">
            Data-driven menu analysis and optimization to maximize profitability
            and customer satisfaction.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Cost Management</h2>
          <p className="text-gray-600">
            Comprehensive cost analysis and management solutions to improve your
            bottom line.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
          <p className="text-gray-600">
            Real-time analytics and reporting to make informed business
            decisions.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
          <p className="text-gray-600">
            Smart inventory tracking and optimization to reduce waste and costs.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Staff Optimization</h2>
          <p className="text-gray-600">
            Data-based scheduling and staff management to improve efficiency.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Consulting</h2>
          <p className="text-gray-600">
            Expert consultation on restaurant operations and technology
            implementation.
          </p>
        </div>
      </div>
    </div>
  );
}
