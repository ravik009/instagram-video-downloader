// Google AdSense Configuration
export const ADS_CONFIG = {
  // Your Google AdSense Publisher ID (ca-pub-xxxxxxxxxx)
  CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || 'ca-pub-YOUR_CLIENT_ID',
  
  // Ad Slot IDs - Replace with your actual slot IDs
  SLOTS: {
    HEADER: process.env.NEXT_PUBLIC_ADS_HEADER_SLOT || 'YOUR_HEADER_SLOT',
    SIDEBAR: process.env.NEXT_PUBLIC_ADS_SIDEBAR_SLOT || 'YOUR_SIDEBAR_SLOT',
    FOOTER: process.env.NEXT_PUBLIC_ADS_FOOTER_SLOT || 'YOUR_FOOTER_SLOT',
    INCONTENT: process.env.NEXT_PUBLIC_ADS_INCONTENT_SLOT || 'YOUR_INCONTENT_SLOT',
    DOWNLOAD_PAGE: process.env.NEXT_PUBLIC_ADS_DOWNLOAD_SLOT || 'YOUR_DOWNLOAD_SLOT',
  },
  
  // Ad Display Settings
  SETTINGS: {
    ENABLED: process.env.NEXT_PUBLIC_ADS_ENABLED === 'true',
    RESPONSIVE: true,
    FORMAT: 'auto',
    LOADING_DELAY: 1000, // Delay before loading ads (ms)
  },
  
  // Ad Placement Rules
  PLACEMENTS: {
    HEADER: {
      enabled: true,
      maxWidth: '728px',
      minHeight: '90px',
    },
    SIDEBAR: {
      enabled: true,
      maxWidth: '300px',
      minHeight: '250px',
    },
    FOOTER: {
      enabled: true,
      maxWidth: '728px',
      minHeight: '90px',
    },
    INCONTENT: {
      enabled: true,
      maxWidth: '728px',
      minHeight: '90px',
    },
    DOWNLOAD_PAGE: {
      enabled: true,
      maxWidth: '728px',
      minHeight: '90px',
    },
  },
} as const;

// Ad Types
export const AD_TYPES = {
  BANNER: 'banner',
  SIDEBAR: 'sidebar',
  INCONTENT: 'incontent',
  FOOTER: 'footer',
} as const;

// Ad Loading States
export const AD_STATES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
  DISABLED: 'disabled',
} as const; 