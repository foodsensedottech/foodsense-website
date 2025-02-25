import { Metadata } from "next";
import { BaseLayout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using FoodSense services and website.",
};

export default function TermsAndConditionsPage() {
  return (
    <BaseLayout>
      <main className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using the FoodSense website and services, you
            acknowledge that you have read, understood, and agree to be bound by
            these Terms and Conditions. If you do not agree with any part of
            these terms, please do not use our website or services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Services Description
          </h2>
          <p>
            FoodSense provides restaurant consulting services, including but not
            limited to technology implementation, menu optimization, and
            customer engagement strategies. The specific services provided will
            be outlined in individual agreements with clients.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. User Responsibilities
          </h2>
          <p>Users of our website and services agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Provide accurate and complete information when using our contact
              forms or engaging with our services
            </li>
            <li>Use our website and services only for lawful purposes</li>
            <li>
              Not engage in any activity that could damage, disable, or impair
              our website or services
            </li>
            <li>
              Not attempt to gain unauthorized access to any part of our website
              or services
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Intellectual Property
          </h2>
          <p>
            All content on the FoodSense website, including but not limited to
            text, graphics, logos, images, and software, is the property of
            FoodSense and is protected by copyright and other intellectual
            property laws. Users may not reproduce, distribute, or create
            derivative works from this content without explicit permission.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Limitation of Liability
          </h2>
          <p>
            FoodSense provides its website and services "as is" without any
            warranties, expressed or implied. We shall not be liable for any
            damages arising from the use or inability to use our website or
            services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Changes to Terms
          </h2>
          <p>
            FoodSense reserves the right to modify these Terms and Conditions at
            any time. Changes will be effective immediately upon posting on the
            website. Your continued use of our website or services after any
            changes indicates your acceptance of the modified terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of the jurisdiction in which FoodSense
            operates, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us through our website's contact form.
          </p>
        </div>
      </main>
    </BaseLayout>
  );
}
