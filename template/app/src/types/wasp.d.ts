declare module "wasp/server" {
  export class HttpError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
  }
  export function env(key: string): string;
}

declare module "wasp/client/operations" {
  export function useQuery<T>(query: unknown): { data?: T; isLoading: boolean };
  export const getAllLeads: unknown;
} 

declare module "wasp/client/router" {
  export const routes: any;
  export function Link(props: any): any;
}

declare module "wasp/entities" {
  export type Lead = {
    id: string;
    createdAt: string;
    phoneNumber: string;
    businessType: string;
    status: string;
    aiSummary: string;
    revenueRecovered: number;
  };
}
