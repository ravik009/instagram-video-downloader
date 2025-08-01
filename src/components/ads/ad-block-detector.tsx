"use client";

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdBlockDetectorProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdBlockDetector({ children, fallback }: AdBlockDetectorProps) {
  const [adBlocked, setAdBlocked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Check for ad blocker
    const checkAdBlocker = () => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      testAd.style.top = '-1000px';
      testAd.style.width = '1px';
      testAd.style.height = '1px';
      
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0;
        setAdBlocked(isBlocked);
        
        if (isBlocked) {
          setShowMessage(true);
        }
        
        document.body.removeChild(testAd);
      }, 100);
    };

    // Check after page load
    const timer = setTimeout(checkAdBlocker, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDisableAdBlocker = () => {
    setShowMessage(false);
    // Reload page to re-check
    window.location.reload();
  };

  const handleSupportUs = () => {
    // Redirect to support page or show donation modal
    window.open('/contact', '_blank');
  };

  if (adBlocked && showMessage) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Ad Blocker Detected
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We noticed you're using an ad blocker. Our service is free and ads help us keep it running.
          Please consider disabling your ad blocker to support us.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleDisableAdBlocker}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Disable Ad Blocker
          </Button>
          <Button
            onClick={handleSupportUs}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400"
          >
            <Heart className="h-4 w-4 mr-2" />
            Support Us
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          After disabling your ad blocker, please refresh the page.
        </p>
      </div>
    );
  }

  if (adBlocked && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Hook to check ad blocker status
export function useAdBlocker() {
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    const checkAdBlocker = () => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      testAd.style.top = '-1000px';
      testAd.style.width = '1px';
      testAd.style.height = '1px';
      
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0;
        setAdBlocked(isBlocked);
        document.body.removeChild(testAd);
      }, 100);
    };

    const timer = setTimeout(checkAdBlocker, 2000);
    return () => clearTimeout(timer);
  }, []);

  return adBlocked;
} 