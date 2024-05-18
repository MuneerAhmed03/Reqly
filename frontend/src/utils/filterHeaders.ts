import { RequestData } from "../types/interfaces";

const filterHeaders = (requests: RequestData[]): RequestData[] => {
  const headersToRemove = [
    "cdn-loop",
    "cf-connecting-ip",
    "cf-ew-via",
    "cf-ipcountry",
    "cf-ray",
    "cf-worker",
    "render-proxy-ttl",
    "rndr-id",
    "true-client-ip",
    "x-forwarded-for",
    "x-forwarded-proto",
    "x-request-start",
    "cf-visitor",
    "cf-connecting-IPv6",
    "cf-pseudo-IPv4",
  ];

  return requests.map((request) => {
    const updatedHeaders = request.headers.filter(
      ([headerName]) => !headersToRemove.includes(headerName.toLowerCase()),
    );
    return { ...request, headers: updatedHeaders };
  });
};

export default filterHeaders;
