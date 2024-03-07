import axios, { AxiosRequestConfig } from "axios";

export async function fetchAuthenticatedData(
  url: string,
  method: string,
  token?: string,
  data?: any
) {
  console.log("here inamu");
  // const session = useSession();
  // const got = getSession();
  // const customized: CustomUser = session
  // const accessToken = session?.accessToken;
  // const serverSession = await getServerSession();
  // const accessToken = serverSession?.user.
  // console.log("api utils", { session });

  if (!token) {
    console.error("Access token not found");
    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
  };

  try {
    const response = await axios(config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Util error:", error);
    // throw new Error("Failed to fetch data");
  }
}
