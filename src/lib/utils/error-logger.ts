/**
 * Error logging utility
 * Central place for error handling and logging
 * Future: integrate with Sentry, LogRocket, or other error tracking services
 */

interface LogContext {
  [key: string]: unknown;
}

/**
 * Log an error with optional context
 */
export function logError(error: Error, context?: LogContext): void {
  console.error('[ERROR]', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });

  // Future: Send to error tracking service
  // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  //   Sentry.captureException(error, { extra: context });
  // }
}

/**
 * Log a warning with optional context
 */
export function logWarning(message: string, context?: LogContext): void {
  console.warn('[WARNING]', {
    message,
    context,
    timestamp: new Date().toISOString(),
  });

  // Future: Send to logging service
}

/**
 * Log an info message with optional context
 */
export function logInfo(message: string, context?: LogContext): void {
  console.info('[INFO]', {
    message,
    context,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Create a safe error response for API routes
 */
export function createErrorResponse(
  error: unknown,
  defaultMessage = 'An error occurred'
): { error: string; details?: string } {
  if (error instanceof Error) {
    logError(error);
    return {
      error: defaultMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
  }

  logWarning('Unknown error type', { error });
  return {
    error: defaultMessage,
  };
}
