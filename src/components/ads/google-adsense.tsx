"use client";

import { useEffect } from 'react';

interface GoogleAdSenseProps {
  client: string; // Your AdSense client ID (ca-pub-xxxxxxxxxx)
  slot: string;   // Your ad slot ID
  format?: string; // ad format (auto, rectangle, etc.)
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function GoogleAdSense({ 
  client, 
  slot, 
  format = "auto", 
  responsive = true,
  style,
  className 
}: GoogleAdSenseProps) {
  useEffect(() => {
    // Load Google AdSense script if not already loaded
    if (typeof window !== 'undefined' && !window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-ad-client', client);
      document.head.appendChild(script);
    }

    // Push the ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [client, slot]);

  return (
    <div className={`ad-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

// Predefined ad components for common placements
export function HeaderAd() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <GoogleAdSense
          client="ca-pub-YOUR_CLIENT_ID"
          slot="YOUR_HEADER_SLOT"
          format="auto"
          responsive={true}
          className="text-center"
        />
      </div>
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <GoogleAdSense
        client="ca-pub-YOUR_CLIENT_ID"
        slot="YOUR_SIDEBAR_SLOT"
        format="auto"
        responsive={true}
        className="text-center"
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 py-4 mt-8">
      <div className="container mx-auto px-4">
        <GoogleAdSense
          client="ca-pub-YOUR_CLIENT_ID"
          slot="YOUR_FOOTER_SLOT"
          format="auto"
          responsive={true}
          className="text-center"
        />
      </div>
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="my-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <GoogleAdSense
        client="ca-pub-YOUR_CLIENT_ID"
        slot="YOUR_INCONTENT_SLOT"
        format="auto"
        responsive={true}
        className="text-center"
      />
    </div>
  );
} 