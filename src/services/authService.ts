import { SignupFormData, LoginFormData } from "@/types/auth";

// API endpoints
const API_ENDPOINTS = {
  SIGNUP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REFRESH: "/api/auth/refresh",
} as const;

export class AuthService {
  private static async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  static async signup(
    data: SignupFormData
  ): Promise<{ user: any; token: string }> {
    return this.makeRequest(API_ENDPOINTS.SIGNUP, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async login(
    data: LoginFormData
  ): Promise<{ user: any; token: string }> {
    return this.makeRequest(API_ENDPOINTS.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async logout(): Promise<void> {
    return this.makeRequest(API_ENDPOINTS.LOGOUT, {
      method: "POST",
    });
  }
}
