import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Determine form type
    const formType = type || "general";

    // Log the submission with type information
    console.log(`[Contact Form Submission] Type: ${formType}`, {
      type: formType,
      name,
      email,
      phone: body.phone || "",
      county: body.county || "",
      skills: body.skills || "",
      availability: body.availability || "",
      contactPerson: body.contactPerson || "",
      partnershipType: body.partnershipType || "",
      orgName: body.orgName || "",
      message: message.substring(0, 200),
      timestamp: new Date().toISOString(),
    });

    // Determine response message based on type
    const responseMessages: Record<string, string> = {
      volunteer:
        "Thank you for your volunteer application! We'll review it and get back to you within 48 hours.",
      partner:
        "Thank you for your partnership inquiry! Our team will review and respond to you soon.",
      donate:
        "Thank you for your interest in supporting BINTI Rising! Visit our M-Pesa or bank details to complete your donation.",
      general:
        "Thank you for reaching out! We will get back to you soon.",
    };

    return NextResponse.json(
      {
        success: true,
        type: formType,
        message: responseMessages[formType] || responseMessages.general,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
