export type DeliveryAddressList = {
    address_id: number;
    user_id: number;
    prefecture_id: number;
    city_ward_town_id: number;
    family_name: string;
    name: string;
    status: number;
    main_address: number;
    address_name: string;
    post_code: string;
    phone: string;
    created_at: string;
    updated_at: string;
    prefecture: Prefecture;
    city_ward_town: CityWardTown;
  };

  type Prefecture = {
    prefecture_id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }

  type CityWardTown = {
    city_ward_town_id: number;
    prefecture_id: number;
    code: string;
    name: string;
    address: string;
    created_at: string;
    updated_at: string;
  }