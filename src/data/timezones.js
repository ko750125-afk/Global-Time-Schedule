export const CONTINENTS = [
  { id: 'asia', name: 'Asia', icon: '🌏' },
  { id: 'europe', name: 'Europe', icon: '🌍' },
  { id: 'north-america', name: 'North America', icon: '🌎' },
  { id: 'south-america', name: 'South America', icon: '🌎' },
  { id: 'oceania', name: 'Oceania', icon: '🏝️' },
  { id: 'others', name: 'Others / Middle East', icon: '🕌' }
];

export const TIMEZONE_DATA = {
  asia: {
    countries: [
      {
        id: 'kr', name: 'South Korea',
        cities: [
          { id: 'seoul', name: 'Seoul', tz: 'Asia/Seoul' },
          { id: 'busan', name: 'Busan', tz: 'Asia/Seoul' },
          { id: 'incheon', name: 'Incheon', tz: 'Asia/Seoul' },
          { id: 'daegu', name: 'Daegu', tz: 'Asia/Seoul' },
          { id: 'daejeon', name: 'Daejeon', tz: 'Asia/Seoul' },
          { id: 'gwangju', name: 'Gwangju', tz: 'Asia/Seoul' },
          { id: 'yeongju', name: 'Yeongju', tz: 'Asia/Seoul' },
          { id: 'jeju', name: 'Jeju Island', tz: 'Asia/Seoul' }
        ]
      },
      {
        id: 'jp', name: 'Japan',
        cities: [
          { id: 'tokyo', name: 'Tokyo', tz: 'Asia/Tokyo' },
          { id: 'osaka', name: 'Osaka', tz: 'Asia/Tokyo' },
          { id: 'nagoya', name: 'Nagoya', tz: 'Asia/Tokyo' },
          { id: 'yokohama', name: 'Yokohama', tz: 'Asia/Tokyo' },
          { id: 'fukuoka', name: 'Fukuoka', tz: 'Asia/Tokyo' },
          { id: 'sapporo', name: 'Sapporo', tz: 'Asia/Tokyo' },
          { id: 'kyoto', name: 'Kyoto', tz: 'Asia/Tokyo' },
          { id: 'sendai', name: 'Sendai', tz: 'Asia/Tokyo' }
        ]
      },
      {
        id: 'cn', name: 'China',
        cities: [
          { id: 'beijing', name: 'Beijing', tz: 'Asia/Shanghai' },
          { id: 'shanghai', name: 'Shanghai', tz: 'Asia/Shanghai' },
          { id: 'guangzhou', name: 'Guangzhou', tz: 'Asia/Shanghai' },
          { id: 'shenzhen', name: 'Shenzhen', tz: 'Asia/Shanghai' },
          { id: 'chengdu', name: 'Chengdu', tz: 'Asia/Shanghai' },
          { id: 'chongqing', name: 'Chongqing', tz: 'Asia/Shanghai' },
          { id: 'tianjin', name: 'Tianjin', tz: 'Asia/Shanghai' },
          { id: 'wuhan', name: 'Wuhan', tz: 'Asia/Shanghai' },
          { id: 'hongkong', name: 'Hong Kong', tz: 'Asia/Hong_Kong' },
          { id: 'macau', name: 'Macau', tz: 'Asia/Macau' }
        ]
      },
      {
        id: 'in', name: 'India',
        cities: [
          { id: 'delhi', name: 'New Delhi', tz: 'Asia/Kolkata' },
          { id: 'mumbai', name: 'Mumbai', tz: 'Asia/Kolkata' },
          { id: 'bangalore', name: 'Bangalore', tz: 'Asia/Kolkata' },
          { id: 'chennai', name: 'Chennai', tz: 'Asia/Kolkata' },
          { id: 'hyderabad', name: 'Hyderabad', tz: 'Asia/Kolkata' },
          { id: 'kolkata', name: 'Kolkata', tz: 'Asia/Kolkata' }
        ]
      },
      {
        id: 'tw', name: 'Taiwan',
        cities: [
          { id: 'taipei', name: 'Taipei', tz: 'Asia/Taipei' },
          { id: 'kaohsiung', name: 'Kaohsiung', tz: 'Asia/Taipei' },
          { id: 'taichung', name: 'Taichung', tz: 'Asia/Taipei' },
          { id: 'hsinchu', name: 'Hsinchu', tz: 'Asia/Taipei' }
        ]
      },
      {
        id: 'ph', name: 'Philippines',
        cities: [
          { id: 'manila', name: 'Manila', tz: 'Asia/Manila' },
          { id: 'cebu', name: 'Cebu City', tz: 'Asia/Manila' },
          { id: 'davao', name: 'Davao City', tz: 'Asia/Manila' },
          { id: 'quezon', name: 'Quezon City', tz: 'Asia/Manila' }
        ]
      },
      {
        id: 'sg', name: 'Singapore',
        cities: [
          { id: 'singapore', name: 'Singapore', tz: 'Asia/Singapore' }
        ]
      },
      {
        id: 'th', name: 'Thailand',
        cities: [
          { id: 'bangkok', name: 'Bangkok', tz: 'Asia/Bangkok' },
          { id: 'chiangmai', name: 'Chiang Mai', tz: 'Asia/Bangkok' },
          { id: 'phuket', name: 'Phuket', tz: 'Asia/Bangkok' }
        ]
      },
      {
        id: 'vn', name: 'Vietnam',
        cities: [
          { id: 'hochiminh', name: 'Ho Chi Minh City', tz: 'Asia/Ho_Chi_Minh' },
          { id: 'hanoi', name: 'Hanoi', tz: 'Asia/Ho_Chi_Minh' },
          { id: 'danang', name: 'Da Nang', tz: 'Asia/Ho_Chi_Minh' }
        ]
      },
      {
        id: 'id', name: 'Indonesia',
        cities: [
          { id: 'jakarta', name: 'Jakarta', tz: 'Asia/Jakarta' },
          { id: 'bali', name: 'Bali (Denpasar)', tz: 'Asia/Makassar' },
          { id: 'surabaya', name: 'Surabaya', tz: 'Asia/Jakarta' },
          { id: 'bandung', name: 'Bandung', tz: 'Asia/Jakarta' }
        ]
      },
      {
        id: 'my', name: 'Malaysia',
        cities: [
          { id: 'kualalumpur', name: 'Kuala Lumpur', tz: 'Asia/Kuala_Lumpur' },
          { id: 'penang', name: 'Penang', tz: 'Asia/Kuala_Lumpur' },
          { id: 'johorbahru', name: 'Johor Bahru', tz: 'Asia/Kuala_Lumpur' }
        ]
      },
      {
        id: 'uz', name: 'Uzbekistan',
        cities: [{ id: 'tashkent', name: 'Tashkent', tz: 'Asia/Tashkent' }]
      },
      {
        id: 'kz', name: 'Kazakhstan',
        cities: [
          { id: 'almaty', name: 'Almaty', tz: 'Asia/Almaty' },
          { id: 'astana', name: 'Astana', tz: 'Asia/Almaty' }
        ]
      }
    ]
  },
  'europe': {
    countries: [
      {
        id: 'uk', name: 'United Kingdom',
        cities: [
          { id: 'london', name: 'London', tz: 'Europe/London' },
          { id: 'manchester', name: 'Manchester', tz: 'Europe/London' },
          { id: 'edinburgh', name: 'Edinburgh', tz: 'Europe/London' }
        ]
      },
      {
        id: 'fr', name: 'France',
        cities: [
          { id: 'paris', name: 'Paris', tz: 'Europe/Paris' },
          { id: 'lyon', name: 'Lyon', tz: 'Europe/Paris' },
          { id: 'marseille', name: 'Marseille', tz: 'Europe/Paris' }
        ]
      },
      {
        id: 'de', name: 'Germany',
        cities: [
          { id: 'berlin', name: 'Berlin', tz: 'Europe/Berlin' },
          { id: 'frankfurt', name: 'Frankfurt', tz: 'Europe/Berlin' },
          { id: 'munich', name: 'Munich', tz: 'Europe/Berlin' },
          { id: 'hamburg', name: 'Hamburg', tz: 'Europe/Berlin' }
        ]
      },
      {
        id: 'it', name: 'Italy',
        cities: [
          { id: 'rome', name: 'Rome', tz: 'Europe/Rome' },
          { id: 'milan', name: 'Milan', tz: 'Europe/Rome' }
        ]
      },
      {
        id: 'es', name: 'Spain',
        cities: [
          { id: 'madrid', name: 'Madrid', tz: 'Europe/Madrid' },
          { id: 'barcelona', name: 'Barcelona', tz: 'Europe/Madrid' }
        ]
      },
      {
        id: 'nl', name: 'Netherlands',
        cities: [
          { id: 'amsterdam', name: 'Amsterdam', tz: 'Europe/Amsterdam' }
        ]
      },
      {
        id: 'ru', name: 'Russia',
        cities: [
          { id: 'moscow', name: 'Moscow', tz: 'Europe/Moscow' },
          { id: 'petersburg', name: 'St. Petersburg', tz: 'Europe/Moscow' }
        ]
      },
      {
        id: 'ch', name: 'Switzerland',
        cities: [
          { id: 'zurich', name: 'Zurich', tz: 'Europe/Zurich' },
          { id: 'geneva', name: 'Geneva', tz: 'Europe/Zurich' }
        ]
      }
    ]
  },
  'north-america': {
    countries: [
      {
        id: 'us', name: 'United States',
        cities: [
          { id: 'newyork', name: 'New York', tz: 'America/New_York' },
          { id: 'losangeles', name: 'Los Angeles', tz: 'America/Los_Angeles' },
          { id: 'chicago', name: 'Chicago', tz: 'America/Chicago' },
          { id: 'sanfrancisco', name: 'San Francisco', tz: 'America/Los_Angeles' },
          { id: 'seattle', name: 'Seattle', tz: 'America/Los_Angeles' },
          { id: 'boston', name: 'Boston', tz: 'America/New_York' },
          { id: 'miami', name: 'Miami', tz: 'America/New_York' },
          { id: 'austin', name: 'Austin', tz: 'America/Chicago' },
          { id: 'denver', name: 'Denver', tz: 'America/Denver' },
          { id: 'phoenix', name: 'Phoenix', tz: 'America/Phoenix' }
        ]
      },
      {
        id: 'ca', name: 'Canada',
        cities: [
          { id: 'toronto', name: 'Toronto', tz: 'America/Toronto' },
          { id: 'vancouver', name: 'Vancouver', tz: 'America/Vancouver' },
          { id: 'montreal', name: 'Montreal', tz: 'America/Toronto' }
        ]
      },
      {
        id: 'mx', name: 'Mexico',
        cities: [
          { id: 'mexicocity', name: 'Mexico City', tz: 'America/Mexico_City' }
        ]
      }
    ]
  },
  'south-america': {
    countries: [
      {
        id: 'br', name: 'Brazil',
        cities: [
          { id: 'saopaulo', name: 'Sao Paulo', tz: 'America/Sao_Paulo' },
          { id: 'rio', name: 'Rio de Janeiro', tz: 'America/Sao_Paulo' },
          { id: 'brasilia', name: 'Brasilia', tz: 'America/Sao_Paulo' }
        ]
      },
      {
        id: 'ar', name: 'Argentina',
        cities: [
          { id: 'buenosaires', name: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires' }
        ]
      },
      {
        id: 'cl', name: 'Chile',
        cities: [
          { id: 'santiago', name: 'Santiago', tz: 'America/Santiago' }
        ]
      },
      {
        id: 'co', name: 'Colombia',
        cities: [
          { id: 'bogota', name: 'Bogota', tz: 'America/Bogota' }
        ]
      },
      {
        id: 'pe', name: 'Peru',
        cities: [
          { id: 'lima', name: 'Lima', tz: 'America/Lima' }
        ]
      }
    ]
  },
  'oceania': {
    countries: [
      {
        id: 'au', name: 'Australia',
        cities: [
          { id: 'sydney', name: 'Sydney', tz: 'Australia/Sydney' },
          { id: 'melbourne', name: 'Melbourne', tz: 'Australia/Melbourne' },
          { id: 'brisbane', name: 'Brisbane', tz: 'Australia/Brisbane' },
          { id: 'perth', name: 'Perth', tz: 'Australia/Perth' }
        ]
      },
      {
        id: 'nz', name: 'New Zealand',
        cities: [
          { id: 'auckland', name: 'Auckland', tz: 'Pacific/Auckland' }
        ]
      }
    ]
  },
  'others': {
    countries: [
      {
        id: 'uae', name: 'United Arab Emirates',
        cities: [
          { id: 'dubai', name: 'Dubai', tz: 'Asia/Dubai' },
          { id: 'abudhabi', name: 'Abu Dhabi', tz: 'Asia/Dubai' }
        ]
      },
      {
        id: 'sa', name: 'Saudi Arabia',
        cities: [
          { id: 'riyadh', name: 'Riyadh', tz: 'Asia/Riyadh' },
          { id: 'jeddah', name: 'Jeddah', tz: 'Asia/Riyadh' }
        ]
      },
      {
        id: 'eg', name: 'Egypt',
        cities: [
          { id: 'cairo', name: 'Cairo', tz: 'Africa/Cairo' }
        ]
      },
      {
        id: 'za', name: 'South Africa',
        cities: [
          { id: 'johannesburg', name: 'Johannesburg', tz: 'Africa/Johannesburg' },
          { id: 'capetown', name: 'Cape Town', tz: 'Africa/Johannesburg' }
        ]
      },
      {
        id: 'ng', name: 'Nigeria',
        cities: [
          { id: 'lagos', name: 'Lagos', tz: 'Africa/Lagos' }
        ]
      },
      {
        id: 'ke', name: 'Kenya',
        cities: [
          { id: 'nairobi', name: 'Nairobi', tz: 'Africa/Nairobi' }
        ]
      },
      {
        id: 'tr', name: 'Turkey',
        cities: [
          { id: 'istanbul', name: 'Istanbul', tz: 'Europe/Istanbul' }
        ]
      }
    ]
  }
};
