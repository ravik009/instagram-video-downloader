"use client";

import { useEffect } from 'react';

interface AdAnalyticsProps {
  adType: string;
  placement: string;
  page: string;
}

export function AdAnalytics({ adType, placement, page }: AdAnalyticsProps) {
  useEffect(() => {
    // Track ad impressions
    const trackImpression = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ad_impression', {
          ad_type: adType,
          placement: placement,
          page: page,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Track ad clicks
    const trackClick = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ad_click', {
          ad_type: adType,
          placement: placement,
          page: page,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Track when ad is loaded
    const trackLoad = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ad_load', {
          ad_type: adType,
          placement: placement,
          page: page,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Track when ad fails to load
    const trackError = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ad_error', {
          ad_type: adType,
          placement: placement,
          page: page,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Add event listeners for ad interactions
    const adElements = document.querySelectorAll('.adsbygoogle');
    adElements.forEach((element) => {
      element.addEventListener('load', trackLoad);
      element.addEventListener('error', trackError);
      element.addEventListener('click', trackClick);
    });

    // Track initial impression
    trackImpression();

    return () => {
      // Cleanup event listeners
      adElements.forEach((element) => {
        element.removeEventListener('load', trackLoad);
        element.removeEventListener('error', trackError);
        element.removeEventListener('click', trackClick);
      });
    };
  }, [adType, placement, page]);

  return null; // This component doesn't render anything
}

// Analytics wrapper for ad components
export function withAdAnalytics<T extends object>(
  Component: React.ComponentType<T>,
  adType: string,
  placement: string
) {
  return function WrappedComponent(props: T) {
    return (
      <>
        <Component {...props} />
        <AdAnalytics
          adType={adType}
          placement={placement}
          page={typeof window !== 'undefined' ? window.location.pathname : '/'}
        />
      </>
    );
  };
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export {};