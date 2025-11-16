export const logger = {
  async error(message: string, error: unknown, context: Record<string, unknown> = {}) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const errorData = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : { message: String(error) };

    const logEntry = {
      level: "error",
      timestamp: new Date().toISOString(),
      message,
      error: errorData,
      context,
    };

    fetch(`${API_URL}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logEntry),
    }).catch(() => { });
  },
};

