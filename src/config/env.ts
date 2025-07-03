import { z } from "zod";

// Define the environment schema
const envSchema = z.object({
  // API Configuration
  EXPO_PUBLIC_API_URL: z
    .string()
    .url("EXPO_PUBLIC_API_URL must be a valid URL")
    .default("https://api.example.com"),

  // You can add more environment variables here as needed
  // For example:
  // EXPO_PUBLIC_API_KEY: z.string().min(1, "API key is required"),
  // EXPO_PUBLIC_APP_NAME: z.string().default("SquareMe"),
  // EXPO_PUBLIC_DEBUG: z.string().transform((val) => val === "true").default("false"),
});

// Type for the validated environment
export type Env = z.infer<typeof envSchema>;

// Validate and parse environment variables
function validateEnv(): Env {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );

      console.error("❌ Environment validation failed:");
      console.error(formattedErrors.join("\n"));

      // In development, log the current env vars for debugging
      if (__DEV__) {
        console.log("Current environment variables:");
        console.log(JSON.stringify(process.env, null, 2));
      }

      throw new Error(
        `Environment validation failed: ${formattedErrors.join(", ")}`
      );
    }
    throw error;
  }
}

// Export the validated environment
export const env = validateEnv();

// Helper function to check if we're in development
export const isDev = __DEV__;

// Export individual environment variables for convenience
export const { EXPO_PUBLIC_API_URL } = env;
