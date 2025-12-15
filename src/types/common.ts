// 기본 응답
export interface ApiBaseResponse {
  success: boolean;
  error: any | null;
}

// 단건 응답
export interface ApiResponse<T> extends ApiBaseResponse {
  data: T;
}

// 리스트 응답
export interface ApiListResponse<T> extends ApiBaseResponse {
  data: {
    items: T[];
  };
}
