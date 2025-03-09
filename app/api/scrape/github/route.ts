import { NextResponse } from 'next/server'

// This API route fetches GitHub profile data
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
      )
    }

    // Fetch basic user info
    // Note: You'll need to use Fetch API with GitHub API
    // For production use, you should add proper authentication with GitHub tokens
    // See GitHub API docs: https://docs.github.com/en/rest/users/users

    // Example fetch (uncomment and implement with proper error handling for production)
    /*
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub profile' }, 
        { status: userResponse.status }
      );
    }
    const userData = await userResponse.json();
    
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!reposResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub repositories' }, 
        { status: reposResponse.status }
      );
    }
    const reposData = await reposResponse.json();
    */

    // For demo purposes, return mock data
    // In a real implementation, you would return the actual GitHub API response
    return NextResponse.json({
      profile: {
        login: username,
        name: 'Demo User',
        bio: 'This is a mock response',
        public_repos: 10,
        followers: 50,
        following: 30,
      },
      repositories: [
        {
          name: 'demo-repo-1',
          description: 'A demo repository',
          language: 'JavaScript',
          stargazers_count: 5,
          forks_count: 2,
        },
        {
          name: 'demo-repo-2',
          description: 'Another demo repository',
          language: 'TypeScript',
          stargazers_count: 3,
          forks_count: 1,
        },
      ],
    })
  } catch (error) {
    console.error('Error in GitHub scraper:', error)
    return NextResponse.json(
      { error: 'Failed to process GitHub data' },
      { status: 500 }
    )
  }
}
