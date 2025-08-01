import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute
const DOWNLOAD_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const DOWNLOAD_LIMIT_MAX = 50; // 50 downloads per day

export function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  const path = request.nextUrl.pathname;

  // Skip rate limiting for static assets and API routes that don't need it
  if (path.startsWith('/_next') || path.startsWith('/favicon') || path.startsWith('/api/dmca')) {
    return NextResponse.next();
  }

  // Rate limiting for download API
  if (path.startsWith('/api/download-proxy')) {
    const downloadKey = `download:${ip}`;
    const now = Date.now();
    
    const downloadLimit = rateLimitStore.get(downloadKey);
    
    if (!downloadLimit || now > downloadLimit.resetTime) {
      // Reset or create new limit
      rateLimitStore.set(downloadKey, {
        count: 1,
        resetTime: now + DOWNLOAD_LIMIT_WINDOW,
      });
    } else {
      // Check if limit exceeded
      if (downloadLimit.count >= DOWNLOAD_LIMIT_MAX) {
        return NextResponse.json(
          {
            error: 'rateLimitExceeded',
            message: 'Daily download limit exceeded. Please try again tomorrow.',
          },
          { status: 429 }
        );
      }
      
      // Increment count
      downloadLimit.count++;
    }
  }

  // General rate limiting for all requests
  const key = `general:${ip}`;
  const now = Date.now();
  
  const limit = rateLimitStore.get(key);
  
  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
  } else {
    // Check if limit exceeded
    if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(
        {
          error: 'rateLimitExceeded',
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }
    
    // Increment count
    limit.count++;
  }

  // Block suspicious user agents
  const suspiciousAgents = [
    'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python', 'java'
  ];
  
  const isSuspicious = suspiciousAgents.some(agent => 
    userAgent.toLowerCase().includes(agent)
  );
  
  if (isSuspicious && path.startsWith('/api/')) {
    return NextResponse.json(
      {
        error: 'accessDenied',
        message: 'Access denied for automated requests.',
      },
      { status: 403 }
    );
  }

  // Add security headers
  const response = NextResponse.next();
  
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Add rate limit headers
  const currentLimit = rateLimitStore.get(key);
  if (currentLimit) {
    response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
    response.headers.set('X-RateLimit-Remaining', (RATE_LIMIT_MAX_REQUESTS - currentLimit.count).toString());
    response.headers.set('X-RateLimit-Reset', currentLimit.resetTime.toString());
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 