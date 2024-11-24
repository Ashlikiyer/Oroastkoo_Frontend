import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/oroastko",
});

const getHeaders = (token: string | null, isFormData: boolean): Record<string, string> => {
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export default async function dataFetch<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown,
  token?: string
): Promise<T> {
  try {
    const response = await api.request<T>({
      url: endpoint,
      method,
      data,
      headers: getHeaders(token || null, data instanceof FormData),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<T>;
      console.error("Axios error:", axiosError.response?.data || axiosError.message);
      throw new Error((axiosError.response?.data as any)?.message || "Request failed.");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}
