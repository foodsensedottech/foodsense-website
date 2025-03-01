import { Metadata } from "next";
import { BaseLayout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility statement for FoodSense website.",
};

export default function AccessibilityPage() {
  return (
    <BaseLayout>
      <main className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
          <p>
            FoodSense is committed to ensuring digital accessibility for people
            with disabilities. We are continually improving the user experience
            for everyone and applying the relevant accessibility standards.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Conformance Status
          </h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements
            for designers and developers to improve accessibility for people
            with disabilities. It defines three levels of conformance: Level A,
            Level AA, and Level AAA. FoodSense's website is partially conformant
            with WCAG 2.1 level AA. Partially conformant means that some parts
            of the content do not fully conform to the accessibility standard.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Accessibility Features
          </h2>
          <p>Our website includes the following accessibility features:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Semantic HTML structure for better screen reader navigation</li>
            <li>Keyboard navigation support</li>
            <li>Color contrast that meets WCAG 2.1 AA standards</li>
            <li>Text resizing without loss of content or functionality</li>
            <li>Alternative text for images</li>
            <li>ARIA landmarks for improved navigation</li>
            <li>Focus indicators for keyboard users</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Limitations and Alternatives
          </h2>
          <p>
            Despite our best efforts to ensure accessibility of FoodSense's
            website, there may be some limitations. Below is a description of
            known limitations, and potential solutions. Please contact us if you
            observe an issue not listed below.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>PDF Documents:</strong> Some of our older PDF documents
              may not be fully accessible. We are working to remediate these
              documents or provide alternative formats upon request.
            </li>
            <li>
              <strong>Third-Party Content:</strong> Some content provided by
              third-party services may not be fully accessible. We are working
              with our partners to improve the accessibility of these
              components.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of FoodSense's
            website. Please let us know if you encounter accessibility barriers:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use our contact form on the website</li>
            <li>Connect with us on social media</li>
          </ul>
          <p>We try to respond to feedback within 3 business days.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Assessment Approach
          </h2>
          <p>
            FoodSense assessed the accessibility of our website by the following
            approaches:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Self-evaluation</li>
            <li>Automated testing tools</li>
            <li>User testing with assistive technologies</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Compatibility with Browsers and Assistive Technology
          </h2>
          <p>
            FoodSense's website is designed to be compatible with the following
            assistive technologies:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Screen readers (including NVDA, JAWS, and VoiceOver)</li>
            <li>Zoom and magnification tools</li>
            <li>Voice recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>
          <p>
            The website is compatible with recent versions of major browsers
            including Chrome, Firefox, Safari, and Edge.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Technical Specifications
          </h2>
          <p>
            Accessibility of FoodSense's website relies on the following
            technologies to work with the particular combination of web browser
            and any assistive technologies or plugins installed on your
            computer:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>WAI-ARIA</li>
          </ul>
          <p>
            These technologies are relied upon for conformance with the
            accessibility standards used.
          </p>
        </div>
      </main>
    </BaseLayout>
  );
}
