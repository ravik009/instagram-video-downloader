"use client";

import { useState, useEffect } from 'react';
import { ADS_CONFIG, AD_STATES } from '@/lib/ads-config';
import { GoogleAdSense } from './google-adsense';
import { AdBlockDetector } from './ad-block-detector';

interface AdComponentProps {
  type: 'header' | 'sidebar' | 'footer' | 'incontent' | 'download';
  className?: string;
  fallback?: React.ReactNode;
}

export function AdComponent({ type, className, fallback }: AdComponentProps) {
  const [adState, setAdState] = useState<typeof AD_STATES[keyof typeof AD_STATES]>(AD_STATES.LOADING);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Delay ad loading to improve page performance
    const timer = setTimeout(() => {
      setShowAd(true);
    }, ADS_CONFIG.SETTINGS.LOADING_DELAY);

    return () => clearTimeout(timer);
  }, []);

  // Don't show ads if disabled
  if (!ADS_CONFIG.SETTINGS.ENABLED) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  const getAdConfig = () => {
    switch (type) {
      case 'header':
        return {
          client: ADS_CONFIG.CLIENT_ID,
          slot: ADS_CONFIG.SLOTS.HEADER,
          format: ADS_CONFIG.SETTINGS.FORMAT,
          responsive: ADS_CONFIG.SETTINGS.RESPONSIVE,
          style: {
            maxWidth: ADS_CONFIG.PLACEMENTS.HEADER.maxWidth,
            minHeight: ADS_CONFIG.PLACEMENTS.HEADER.minHeight,
          },
        };
      case 'sidebar':
        return {
          client: ADS_CONFIG.CLIENT_ID,
          slot: ADS_CONFIG.SLOTS.SIDEBAR,
          format: ADS_CONFIG.SETTINGS.FORMAT,
          responsive: ADS_CONFIG.SETTINGS.RESPONSIVE,
          style: {
            maxWidth: ADS_CONFIG.PLACEMENTS.SIDEBAR.maxWidth,
            minHeight: ADS_CONFIG.PLACEMENTS.SIDEBAR.minHeight,
          },
        };
      case 'footer':
        return {
          client: ADS_CONFIG.CLIENT_ID,
          slot: ADS_CONFIG.SLOTS.FOOTER,
          format: ADS_CONFIG.SETTINGS.FORMAT,
          responsive: ADS_CONFIG.SETTINGS.RESPONSIVE,
          style: {
            maxWidth: ADS_CONFIG.PLACEMENTS.FOOTER.maxWidth,
            minHeight: ADS_CONFIG.PLACEMENTS.FOOTER.minHeight,
          },
        };
      case 'incontent':
        return {
          client: ADS_CONFIG.CLIENT_ID,
          slot: ADS_CONFIG.SLOTS.INCONTENT,
          format: ADS_CONFIG.SETTINGS.FORMAT,
          responsive: ADS_CONFIG.SETTINGS.RESPONSIVE,
          style: {
            maxWidth: ADS_CONFIG.PLACEMENTS.INCONTENT.maxWidth,
            minHeight: ADS_CONFIG.PLACEMENTS.INCONTENT.minHeight,
          },
        };
      case 'download':
        return {
          client: ADS_CONFIG.CLIENT_ID,
          slot: ADS_CONFIG.SLOTS.DOWNLOAD_PAGE,
          format: ADS_CONFIG.SETTINGS.FORMAT,
          responsive: ADS_CONFIG.SETTINGS.RESPONSIVE,
          style: {
            maxWidth: ADS_CONFIG.PLACEMENTS.DOWNLOAD_PAGE.maxWidth,
            minHeight: ADS_CONFIG.PLACEMENTS.DOWNLOAD_PAGE.minHeight,
          },
        };
      default:
        return null;
    }
  };

  const adConfig = getAdConfig();

  if (!adConfig) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  const adContent = (
    <div className={`ad-wrapper ${className || ''}`}>
      {showAd && adState !== AD_STATES.ERROR ? (
        <GoogleAdSense
          {...adConfig}
          className="ad-content"
        />
      ) : adState === AD_STATES.ERROR && fallback ? (
        <div className="ad-fallback">{fallback}</div>
      ) : (
        <div className="ad-loading">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-20"></div>
        </div>
      )}
    </div>
  );

  return (
    <AdBlockDetector fallback={fallback}>
      {adContent}
    </AdBlockDetector>
  );
}

// Specific ad components for different placements
export function HeaderAd() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <AdComponent
          type="header"
          className="text-center"
          fallback={
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Advertisement
            </div>
          }
        />
      </div>
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <AdComponent
        type="sidebar"
        className="text-center"
        fallback={
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Advertisement
          </div>
        }
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 py-4 mt-8">
      <div className="container mx-auto px-4">
        <AdComponent
          type="footer"
          className="text-center"
          fallback={
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Advertisement
            </div>
          }
        />
      </div>
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="my-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <AdComponent
        type="incontent"
        className="text-center"
        fallback={
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Advertisement
          </div>
        }
      />
    </div>
  );
}

export function DownloadPageAd() {
  return (
    <div className="my-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <AdComponent
        type="download"
        className="text-center"
        fallback={
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Advertisement
          </div>
        }
      />
    </div>
  );
} 