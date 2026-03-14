import booleanReducer from "./booleanSlice";

interface AuthState {
    token: string | null;
    user: any;
    loading: boolean;
    error: string | null;
    mobileUserList: any;
    fcmToken: any;
    Companyid: any;
    ProfileData: any;
    selectedImage: any;
    selectedImageData: any;
    percentageUpdated: boolean;
    overallPercentage: string;
    previousEmploymentHistory: any;
    adhar: any;
}

interface UsersState {
    list: any[];
    userDetail: any | null;
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

type RootState = {
    auth: AuthState;
    users: UsersState;
    boolean: ReturnType<typeof booleanReducer>;
};

export type { AuthState, UsersState, RootState };
