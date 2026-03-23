import type { Lead } from "wasp/entities";
import { HttpError } from "wasp/server";

export const createLead = async (
  rawArgs: {
    phoneNumber: string;
    businessType?: string;
    status?: "Texted" | "Booked";
    aiSummary: string;
    revenueRecovered?: number;
  },
  context: any,
): Promise<Lead> => {
  const { phoneNumber, businessType, status, aiSummary, revenueRecovered } =
    rawArgs;

  if (!phoneNumber) {
    throw new HttpError(400, "Missing 'phoneNumber' for Lead creation.");
  }

  return await context.entities.Lead.create({
    data: {
      phoneNumber,
      businessType: businessType ?? "General",
      status: status ?? "Texted",
      aiSummary,
      revenueRecovered: revenueRecovered ?? 2000,
    },
  });
};

export const getAllLeads = async (
  _args: unknown,
  context: any,
): Promise<Lead[]> => {
  return context.entities.Lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
