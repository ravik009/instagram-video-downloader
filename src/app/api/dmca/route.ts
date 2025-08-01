import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// DMCA request schema
const dmcaSchema = z.object({
  copyrightOwner: z.string().min(1, "Copyright owner name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  contentUrl: z.string().url("Valid Instagram URL is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  statement: z.boolean().refine(val => val === true, "You must agree to the statement"),
  signature: z.string().min(1, "Digital signature is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = dmcaSchema.parse(body);

    // Here you would typically:
    // 1. Store the DMCA request in database
    // 2. Send notification emails
    // 3. Log the request for legal compliance
    // 4. Potentially block the content temporarily

    console.log("DMCA Takedown Request:", {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
      userAgent: request.headers.get("user-agent"),
    });

    // Send notification email (implement your email service)
    // await sendDmcaNotification(validatedData);

    return NextResponse.json({
      success: true,
      message: "DMCA takedown request received. We will review and take appropriate action within 24-48 hours.",
      caseId: `DMCA-${Date.now()}`,
    }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: "Invalid request data",
        errors: error.errors,
      }, { status: 400 });
    }

    console.error("DMCA API Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "DMCA takedown requests should be sent via POST",
    contact: "dmca@instasaver.app",
  });
} 