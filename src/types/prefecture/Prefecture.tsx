import { CityWardTown } from "../citywardtown/CityWardTown";

export type Prefecture = {
  index?: number;
  prefecture_id: number;
  name: string;
  city_ward_town: CityWardTown[];
  created_at?: string;
  updated_at?: string;
};
