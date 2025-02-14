import { getServiceOptions } from "@/lib/contentful/client";
import { ContactForm } from "./contact-form";

export async function Contact() {
  const services = await getServiceOptions();

  if (!services?.length) {
    console.warn("No service options available");
    return (
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Please contact us directly for service inquiries.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
          <p className="text-lg text-gray-600">
            Ready to transform your restaurant's performance? Fill out the form
            below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <ContactForm services={services} />
        </div>
      </div>
    </section>
  );
}
