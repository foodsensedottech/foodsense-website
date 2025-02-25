import { Metadata } from "next";
import { BaseLayout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for FoodSense services and website.",
};

export default function PrivacyPolicyPage() {
  return (
    <BaseLayout>
      <main className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            FoodSense ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or use our
            services. Please read this privacy policy carefully. If you do not
            agree with the terms of this privacy policy, please do not access
            the site.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Information We Collect
          </h2>
          <p>
            We may collect information about you in a variety of ways. The
            information we may collect includes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Personal Data:</strong> Personally identifiable
              information, such as your name, email address, telephone number,
              and business information that you voluntarily give to us when you
              register with our website or when you choose to participate in
              various activities related to our website, such as online contact
              forms.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers
              automatically collect when you access our website, such as your IP
              address, browser type, operating system, access times, and the
              pages you have viewed directly before and after accessing the
              website.
            </li>
            <li>
              <strong>Financial Data:</strong> Financial information, such as
              data related to your payment method (e.g., valid credit card
              number, card brand, expiration date) that we may collect when you
              purchase our services.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Use of Your Information
          </h2>
          <p>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the website to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Create and manage your account.</li>
            <li>Process your transactions.</li>
            <li>
              Send you email newsletters, if you have opted in to receive them.
            </li>
            <li>Respond to your inquiries and customer service requests.</li>
            <li>
              Deliver targeted advertising, newsletters, and other information
              regarding our services to you.
            </li>
            <li>Administer promotions, surveys, and contests.</li>
            <li>
              Compile anonymous statistical data for our own use or for a third
              party's use.
            </li>
            <li>Assist law enforcement as necessary.</li>
            <li>Prevent fraudulent activity on our website.</li>
            <li>Improve our website and marketing efforts.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Disclosure of Your Information
          </h2>
          <p>
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the
              release of information about you is necessary to respond to legal
              process, to investigate or remedy potential violations of our
              policies, or to protect the rights, property, and safety of
              others, we may share your information as permitted or required by
              any applicable law, rule, or regulation.
            </li>
            <li>
              <strong>Third-Party Service Providers:</strong> We may share your
              information with third parties that perform services for us or on
              our behalf, including payment processing, data analysis, email
              delivery, hosting services, customer service, and marketing
              assistance.
            </li>
            <li>
              <strong>Marketing Communications:</strong> With your consent, or
              with an opportunity for you to withdraw consent, we may share your
              information with third parties for marketing purposes.
            </li>
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Security of Your Information
          </h2>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Policy for Children
          </h2>
          <p>
            We do not knowingly solicit information from or market to children
            under the age of 13. If you become aware of any data we have
            collected from children under age 13, please contact us using the
            contact information provided below.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights</h2>
          <p>
            You have the right to request access to the personal information we
            collect from you, change that information, or delete it in some
            circumstances. To request to review, update, or delete your personal
            information, please contact us using the information provided below.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            We reserve the right to make changes to this Privacy Policy at any
            time and for any reason. We will alert you about any changes by
            updating the "Last Updated" date of this Privacy Policy. You are
            encouraged to periodically review this Privacy Policy to stay
            informed of updates.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us through our website's contact form.
          </p>
        </div>
      </main>
    </BaseLayout>
  );
}
