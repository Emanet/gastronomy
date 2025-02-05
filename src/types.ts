export interface Restaurant {
    Id: string;
    Detail: {
      de: {
        Title: string;
      };
      en: {
        Title: string;
      };
      it: {
        Title: string;
      };
    };
    ImageGallery?: {
      ImageUrl: string;
      ImageDesc: {
        de: string;
        en: string;
        it: string;
      };
    }[];
    ContactInfos: {
      de: {
        Address?: string;
        Email?: string;
        Phonenumber?: string;
        Url?: string;
      };
    };
    GpsInfo: {
      Latitude: number;
      Longitude: number;
      Altitude: number;
    }[];
  }
  
  export interface RestaurantListProps {
    restaurants: Restaurant[];
    onRestaurantClick: (restaurant: Restaurant) => void;
  }
  
  export interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
  }

  // src/types/types.ts


export interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

// src/types/types.ts içine ekleyin
export interface ChargingStation {
  pcode: string;
  pname: string;
  pcoordinate: {
      x: number;
      y: number;
      srid: number;
  };
  pmetadata: {
      city: string;
      address: string;
      capacity: number;
  };
  smetadata: {
      outlets: Array<{
          maxPower: number;
          outletTypeCode: string;
      }>;
  };
}