export type JobListProps = {
  id: number;
  image: string;
  title: string;
  location: string;
  salary_range: string;
  createdAt: string;
  company_name: string;
  company_profile_link: string;
  job_link: string;
  description: string;
};

export interface JobApplication {
  first_name: string;
  last_name: string;
  resume: string;
  exp: {
    year: string;
    month: string;
  };
  ctc: string;
  ectc: string;
  brief_intro: string;
  notice_period: string;
  mobile_no: string;
  email: string;
  address: {
    state: string;
    city: string;
    zip: number;
  };
  location: {
    preferred_loc: string;
    current_loc: string;
  };
  jobId?: string;
}
