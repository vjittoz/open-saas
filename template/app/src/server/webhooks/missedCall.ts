import { HttpError } from "wasp/server";

function generateMissedCallSummary(businessType: string): string {
  const businessLabel = businessType?.trim()
    ? businessType.trim()
    : "your business";

  return `Hey there! I’m sorry I missed your call. This is LeadBot 360 from ${businessLabel}, and I’d love to help you as quickly as possible. Please text back with your preferred time, details about the work you need, and any address information. We can get you booked immediately and make sure everything is handled professionally.`;
}

export const missedCallWebhook = async (
  request: any,
  response: any,
  context: any,
) => {
  try {
    const payload = request.body || {};
    const phoneNumber = (
      payload.From ||
      payload.from ||
      payload.phone ||
      payload.Phone ||
      ""
    )
      .toString()
      .trim();

    if (!phoneNumber) {
      return response
        .status(400)
        .json({ error: "Missing phone number in payload" });
    }

    const businessType = (
      payload.BusinessType ||
      payload.businessType ||
      payload.business ||
      "Plumber"
    )
      .toString()
      .trim();

    const aiSummary = generateMissedCallSummary(businessType);

    const newLead = await context.entities.Lead.create({
      data: {
        phoneNumber,
        businessType,
        status: "Texted",
        aiSummary,
        revenueRecovered: 2000,
      },
    });

    return response.status(200).json({
      message: "Missed call AI text draft created",
      phoneNumber,
      businessType,
      aiSummary,
      lead: newLead,
    });
  } catch (e: unknown) {
    console.error("missedCallWebhook error:", e);
    if (e instanceof HttpError) {
      return response.status(e.statusCode || 500).json({ error: e.message });
    }

    const message = e instanceof Error ? e.message : "Failed to process missed call webhook";
    return response.status(500).json({ error: message });
  }
};
