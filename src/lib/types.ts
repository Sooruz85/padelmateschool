export type Level = "DEBUTANT" | "INTERMEDIAIRE" | "AVANCE";
export type City = "BORDEAUX" | "TOULOUSE" | "MONTPELLIER";
export type Visibility = "PUBLIC" | "PRIVATE";

export type Profile = {
  id: string;
  username: string;
  level: Level;
  city: City;
  prefers_indoor: boolean;
  prefers_outdoor: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
};
