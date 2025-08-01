"use client";

import { useState } from "react";
import { Metadata } from "next";
import { AlertTriangle, CheckCircle, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

const dmcaSchema = z.object({
  copyrightOwner: z.string().min(1, "Copyright owner name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  contentUrl: z.string().url("Valid Instagram URL is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  statement: z.boolean().refine(val => val === true, "You must agree to the statement"),
  signature: z.string().min(1, "Digital signature is required"),
});

export default function DmcaPage() {
  const [formData, setFormData] = useState({
    copyrightOwner: "",
    email: "",
    phone: "",
    contentUrl: "",
    description: "",
    statement: false,
    signature: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = dmcaSchema.parse(formData);
      
      const response = await fetch('/api/dmca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ submit: "An error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">DMCA Takedown Request</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          If you believe your copyrighted work has been used without permission, please submit a takedown request.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Request Submitted</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your DMCA takedown request has been received. We will review and take appropriate action within 24-48 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Submit Another Request
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Information Panel */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3">Important Information</h3>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Only submit requests for content you own</li>
                <li>• Provide accurate and complete information</li>
                <li>• We respond within 24-48 hours</li>
                <li>• False claims may result in legal action</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p><strong>Email:</strong> dmca@instasaver.app</p>
                <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
                <p><strong>Response Time:</strong> 24-48 hours</p>
              </div>
            </div>
          </div>

          {/* DMCA Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="copyrightOwner" className="block text-sm font-medium mb-2">
                      Copyright Owner Name *
                    </label>
                    <Input
                      id="copyrightOwner"
                      name="copyrightOwner"
                      type="text"
                      required
                      value={formData.copyrightOwner}
                      onChange={handleChange}
                      placeholder="Your name or company name"
                      className={errors.copyrightOwner ? "border-red-500" : ""}
                    />
                    {errors.copyrightOwner && (
                      <p className="text-red-500 text-sm mt-1">{errors.copyrightOwner}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number (Optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="contentUrl" className="block text-sm font-medium mb-2">
                    Instagram URL of Infringing Content *
                  </label>
                  <Input
                    id="contentUrl"
                    name="contentUrl"
                    type="url"
                    required
                    value={formData.contentUrl}
                    onChange={handleChange}
                    placeholder="https://www.instagram.com/p/..."
                    className={errors.contentUrl ? "border-red-500" : ""}
                  />
                  {errors.contentUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.contentUrl}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description of Infringement *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe how your copyrighted work is being used without permission..."
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="signature" className="block text-sm font-medium mb-2">
                    Digital Signature *
                  </label>
                  <Input
                    id="signature"
                    name="signature"
                    type="text"
                    required
                    value={formData.signature}
                    onChange={handleChange}
                    placeholder="Type your full name as digital signature"
                    className={errors.signature ? "border-red-500" : ""}
                  />
                  {errors.signature && (
                    <p className="text-red-500 text-sm mt-1">{errors.signature}</p>
                  )}
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    id="statement"
                    name="statement"
                    type="checkbox"
                    checked={formData.statement}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <label htmlFor="statement" className="text-sm text-gray-600 dark:text-gray-300">
                    I declare, under penalty of perjury, that I am the copyright owner or authorized to act on behalf of the copyright owner, and that the information provided is accurate.
                  </label>
                </div>
                {errors.statement && (
                  <p className="text-red-500 text-sm mt-1">{errors.statement}</p>
                )}

                {errors.submit && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-red-600 dark:text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Submit DMCA Request
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 