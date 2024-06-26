import { config } from "@/config"
import { tmdbApiUri } from "@/utils/constants"
import { NextRequest, NextResponse } from "next/server"

const { tmdb_access_key } = config

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl

    try {
        const response = await fetch(`${tmdbApiUri}/search/tv?query=${searchParams.get("query")}`, {
            headers: {
                'Authorization': `Bearer ${tmdb_access_key}`,
                'Accept': 'application/json'
            },
            next: {
                revalidate: 60
            }
        })

        const result = await response.json()
        return NextResponse.json(result.results[0])
    } catch (error: any) {
        return NextResponse.json({ error, message: `This just happed in tmdb route: ${error}` })
    }
}

// not used