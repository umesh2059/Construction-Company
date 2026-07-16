export interface Application {
  id?: string;
  career_id: string;
  job_title: string;
  company: string;
  applicant_name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  portfolio_url?: string | null;
  resume_url: string;
  cover_letter?: string | null;
  created_at?: string;
}
