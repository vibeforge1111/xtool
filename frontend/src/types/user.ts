export interface User {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  publicMetrics?: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
}

export interface AuthTokens {
  accessToken: string;
  twitterAccessToken: string;
  twitterRefreshToken?: string;
  expiresIn: number;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  tokens: AuthTokens;
}

export interface OAuthInitResponse {
  authUrl: string;
  codeVerifier: string;
  state: string;
}