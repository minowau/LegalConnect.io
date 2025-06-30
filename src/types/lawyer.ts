export interface Lawyer {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  experience: number;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  bio: string;
  education: string[];
  certifications: string[];
  available: boolean;
}