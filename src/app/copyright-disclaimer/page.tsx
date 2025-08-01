import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copyright Disclaimer - InstaSaver",
  description: "Copyright Disclaimer for InstaSaver Instagram Video Downloader",
};

export default function CopyrightDisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Copyright Disclaimer</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Copyright Notice</h2>
            <p className="text-gray-600 dark:text-gray-300">
              InstaSaver respects the intellectual property rights of others and expects users to do the same. 
              This service is designed to download publicly available content from Instagram.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Fair Use Policy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Users are responsible for ensuring their use of downloaded content falls within fair use guidelines 
              and complies with applicable copyright laws in their jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Content Ownership</h2>
            <p className="text-gray-600 dark:text-gray-300">
              InstaSaver does not claim ownership of any content downloaded through our service. 
              All content remains the property of its respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Permitted Uses</h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Personal use and enjoyment</li>
              <li>Educational purposes (with proper attribution)</li>
              <li>Fair use for commentary, criticism, or news reporting</li>
              <li>Content you own or have permission to download</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Uses</h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Commercial use without permission</li>
              <li>Redistribution for profit</li>
              <li>Modification without consent</li>
              <li>Use that violates Instagram's Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. DMCA Compliance</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you believe your copyrighted work has been used inappropriately, please contact us immediately. 
              We will respond to legitimate copyright infringement notices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. User Responsibility</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Users are solely responsible for ensuring their use of downloaded content complies with copyright laws. 
              InstaSaver is not liable for any copyright violations committed by users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact for Copyright Issues</h2>
            <p className="text-gray-600 dark:text-gray-300">
              For copyright-related inquiries or DMCA takedown requests, please contact us through our contact page 
              with detailed information about the alleged infringement.
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