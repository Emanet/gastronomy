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
/* export interface ChargingStation {
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
} */

  export interface ChargingStation {
    sactive: boolean;
    savailable: boolean;
    scode: string;
    scoordinate: {
      x: number; // longitude
      y: number; // latitude
      srid: number;
    };
    smetadata: {
      city?: string;
      state?: string;
      address?: string;
      capacity?: number;
      provider?: string;
      accessType?: string;
      accessInfo?: string;
      paymentInfo?: string;
      party_id?: string;
      opening_times?: {
        twentyfourseven?: boolean;
      };
    };
    sname: string;
    sorigin: string;
    stype: string;
  }

  export interface ParkingStation {
    sactive: boolean;
    savailable: boolean;
    scode: string;
    scoordinate: {
      x: number; // longitude
      y: number; // latitude
      srid: number;
    };
    smetadata: {
      capacity?: number;
      municipality?: string;
      free_limit?: number;
      occupancy_limit?: number;
      FacilityDescription?: string;
      capacity_short_stay?: number;
      capacity_subscribers?: number;
      free_limit_short_stay?: number;
      free_limit_subscribers?: number;
      occupancy_limit_short_stay?: number;
      occupancy_limit_subscribers?: number;
    };
    sname: string;
    sorigin: string;
    stype: string;
  
    pactive: boolean;
    pavailable: boolean;
    pcode: string;
    pcoordinate: {
      x: number;
      y: number;
      srid: number;
    };
    pmetadata: {
      City?: string;
      Address?: string;
      ZIPCode?: string;
      capacity?: number;
      IdCompany?: number;
      Telephone1?: string;
      Telephone2?: string;
      municipality?: string;
      capacity_short_stay?: number;
      capacity_subscribers?: number;
    };
    pname: string;
    porigin: string;
    ptype: string;
  }
  
  export interface Restaurant {
    Id: string;
    // Add other restaurant properties as needed
  }