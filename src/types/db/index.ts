export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  email_verified: string;
  is_admin: boolean;
  user_active: boolean;
}

export interface ExtendedUser {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  email_verified: string;
  deactivated: boolean;
  is_admin: boolean;
  created_at: Date;
  last_login_time: Date;
}

export interface UsersResult {
  users: ExtendedUser[];
}

export interface Entity {
  id: string;
  onboarding_completed: boolean;
  user: User;
}

export interface Patient {
  onboarding_completed: boolean;
  date_of_birth: string;
  gender: string;
  place_of_residence: string;
  reason_to_referral: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_phone: string;
  profile_picture: string;
}

export interface Provider {
  onboarding_completed: string;
  bio: string;
  country: string;
  phone: string;
  gender: string;
  date_of_birth: string | Date;
  information_public: string;
  profile_picture: string;
  academic_histories: AcademicHistory[];
  rate_and_services: RateAndService[];

  expertises: string[];
  theoretical_approaches: string[];
  area_of_focus: string[];
  populations_serve: string[];
  health_cares: string[];
  spoken_languages: string[];
  provider_code: string;
  id: number;
  provider_id: number;
}

export interface AcademicHistory {
  degree: string;
  institution: string;
  year: number;
}

export interface RateAndService {
  cost: string;
  session_type: string;
  session_length: string;
}

export interface ChatHistory {
  chat_id: number;
  users: {
    first_name: string;
    last_name: string;
    name: string;
    profile_picture: string;
    user_type: string;
    id: number;
  }[];
  messages: {
    content: string;
    date: string;
  }[];
  unread_messages: {
    [key: number]: number;
  };
  status: string;
}

export type ChatHistories = ChatHistory[];
