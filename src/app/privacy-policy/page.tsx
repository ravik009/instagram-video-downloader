import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - InstaSaver",
  description: "Privacy Policy for InstaSaver Instagram Video Downloader",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300">
              InstaSaver does not collect, store, or process any personal information from users. 
              We do not require registration, login, or any personal data to use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Since we do not collect personal information, there is no personal data to use. 
              Our service operates by processing Instagram URLs that you provide to download content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We implement appropriate security measures to protect any data processed through our service. 
              All downloads are processed securely and no data is stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our service interacts with Instagram's servers to fetch content. 
              We are not responsible for Instagram's privacy practices or data collection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may use essential cookies for website functionality. 
              No tracking or advertising cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update this privacy policy from time to time. 
              Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have any questions about this privacy policy, please contact us through our contact page.
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