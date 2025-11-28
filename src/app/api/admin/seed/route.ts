import { NextRequest, NextResponse } from "next/server";
import { seedWorkflows } from "@/scripts/seed-workflows";
import { seedRepos } from "@/scripts/seed-repos";
import { seedMCPs } from "@/scripts/seed-mcps";
import { updateAppsSchema } from "@/scripts/update-apps-schema";
import { seedAll, clearAllData } from "@/scripts/seed-all";

/**
 * Admin API endpoint for database seeding
 * POST /api/admin/seed?type=workflows|repos|mcps|apps|all&clear=true
 * 
 * Requires ADMIN_SECRET in Authorization header
 * Returns JSON with success status, counts, and any errors
 */

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get("authorization");
    const adminSecret = process.env.ADMIN_SECRET;
    
    if (!adminSecret) {
      return NextResponse.json(
        { error: "Admin secret not configured" },
        { status: 500 }
      );
    }
    
    const providedSecret = authHeader?.replace("Bearer ", "");
    
    if (providedSecret !== adminSecret) {
      return NextResponse.json(
        { error: "Unauthorized - invalid admin secret" },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const shouldClear = searchParams.get("clear") === "true";
    
    // Clear data if requested
    if (shouldClear) {
      await clearAllData();
    }
    
    const startTime = Date.now();
    const errors: string[] = [];
    let counts = {
      workflows: 0,
      repos: 0,
      mcps: 0,
      apps: 0,
    };
    
    // Execute seed based on type
    try {
      switch (type) {
        case "workflows":
          await seedWorkflows();
          break;
          
        case "repos":
          await seedRepos();
          break;
          
        case "mcps":
          await seedMCPs();
          break;
          
        case "apps":
          await updateAppsSchema();
          break;
          
        case "all":
          const result = await seedAll(false); // Already cleared above if requested
          counts = result.counts;
          errors.push(...result.errors);
          break;
          
        default:
          return NextResponse.json(
            { error: `Invalid type: ${type}. Use workflows, repos, mcps, apps, or all` },
            { status: 400 }
          );
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      errors.push(errorMsg);
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    return NextResponse.json({
      success: errors.length === 0,
      type,
      cleared: shouldClear,
      counts,
      errors,
      duration: parseFloat(duration),
    });
  } catch (error) {
    console.error("Seed API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Return 405 for other methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
