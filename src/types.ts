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