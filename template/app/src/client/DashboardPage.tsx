import { useMemo } from "react";
import type { Lead } from "wasp/entities";
import { getAllLeads, useQuery } from "wasp/client/operations";

export default function DashboardPage() {
  const { data: leads, isLoading } = useQuery<Lead[]>(getAllLeads);

  const totalRevenue = useMemo(() => {
    if (!leads || !Array.isArray(leads)) {
      return 0;
    }
    return leads.reduce((sum, lead) => sum + (lead.revenueRecovered || 0), 0);
  }, [leads]);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-xl border border-green-500/40 bg-black/70 p-8">
          <h1 className="text-4xl font-black tracking-tight text-[#39ff14]">
            REVENUE RECOVERED
          </h1>
          <p className="mt-4 text-5xl font-extrabold text-white">
            $
            {totalRevenue.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        <div className="rounded-xl border border-green-500/40 bg-black/80 p-6">
          <h2 className="text-2xl font-bold text-[#39ff14]">Leads Texted</h2>

          {isLoading && <p className="mt-3 text-green-200">Loading leads...</p>}
          {!isLoading && (!leads || leads.length === 0) && (
            <p className="mt-3 text-green-200">
              No leads yet. First missed call will appear here.
            </p>
          )}

          {!isLoading && leads && leads.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-green-600/40 text-green-200">
                    <th className="px-3 py-2">Phone Number</th>
                    <th className="px-3 py-2">Business Type</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Revenue</th>
                    <th className="px-3 py-2">AI Summary</th>
                    <th className="px-3 py-2">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-green-500/20 hover:bg-white/5"
                    >
                      <td className="px-3 py-2">{lead.phoneNumber}</td>
                      <td className="px-3 py-2">{lead.businessType}</td>
                      <td className="px-3 py-2">{lead.status}</td>
                      <td className="px-3 py-2">
                        ${(lead.revenueRecovered || 0).toFixed(2)}
                      </td>
                      <td className="max-w-xl break-words px-3 py-2">
                        {lead.aiSummary}
                      </td>
                      <td className="px-3 py-2">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
