import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - InstaSaver",
  description: "Terms of Service for InstaSaver Instagram Video Downloader",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing and using InstaSaver, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="text-gray-600 dark:text-gray-300">
              InstaSaver is a web-based tool that allows users to download public Instagram content including videos, photos, reels, and stories.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>You are responsible for ensuring you have the right to download any content</li>
              <li>You must respect copyright laws and intellectual property rights</li>
              <li>You agree not to use our service for any illegal or unauthorized purpose</li>
              <li>You must not violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Copyright and Fair Use</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Users are responsible for ensuring their use of downloaded content complies with copyright laws. 
              We do not claim ownership of any content downloaded through our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Service Availability</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We strive to maintain service availability but do not guarantee uninterrupted access. 
              We reserve the right to modify or discontinue the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300">
              InstaSaver is provided "as is" without warranties of any kind. 
              We are not liable for any damages arising from the use of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to modify these terms at any time. 
              Continued use of the service constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300">
              For questions about these terms, please contact us through our contact page.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 