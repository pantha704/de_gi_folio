import { NextResponse } from 'next/server'

// This API route fetches job opportunities based on user skills
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { skills, level } = await request.json()

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: 'Skills array is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would:
    // 1. Use provided skills to search job sites (e.g., via their APIs or scraping)
    // 2. Filter results based on the user's skill level
    // 3. Return a structured list of opportunities

    // Mock opportunities based on skill level
    let mockOpportunities = []

    // Create different recommendations based on level
    switch (level?.toLowerCase()) {
      case 'beginner':
        mockOpportunities = [
          {
            type: 'course',
            title: 'Web Development Fundamentals',
            platform: 'Udemy',
            link: 'https://udemy.com',
            skills: ['HTML', 'CSS', 'JavaScript'],
          },
          {
            type: 'course',
            title: 'Git & GitHub for Beginners',
            platform: 'Coursera',
            link: 'https://coursera.org',
            skills: ['Git'],
          },
          {
            type: 'hackathon',
            title: 'Beginner Friendly Hackathon',
            organizer: 'MLH',
            link: 'https://mlh.io',
            skills: ['Any'],
          },
        ]
        break

      case 'intermediate':
        mockOpportunities = [
          {
            type: 'job',
            title: 'Frontend Developer',
            company: 'TechCorp',
            link: '#',
            skills: ['JavaScript', 'React', 'CSS'],
          },
          {
            type: 'bounty',
            title: 'Fix UI Bug in Open Source Project',
            platform: 'Gitcoin',
            link: 'https://gitcoin.co',
            skills: ['JavaScript', 'React'],
          },
          {
            type: 'hackathon',
            title: 'Web3 Hackathon',
            organizer: 'ETHGlobal',
            link: 'https://ethglobal.com',
            skills: ['JavaScript', 'Solidity'],
          },
        ]
        break

      case 'advanced':
        mockOpportunities = [
          {
            type: 'job',
            title: 'Senior Full-Stack Developer',
            company: 'BigTech Inc',
            link: '#',
            skills: ['TypeScript', 'Node.js', 'React'],
          },
          {
            type: 'job',
            title: 'Lead Frontend Engineer',
            company: 'Startup XYZ',
            link: '#',
            skills: ['JavaScript', 'React', 'Redux', 'GraphQL'],
          },
          {
            type: 'bounty',
            title: 'Implement New Feature in Popular Framework',
            platform: 'Open Collective',
            link: 'https://opencollective.com',
            skills: ['TypeScript', 'Testing'],
          },
        ]
        break

      default:
        // Default to intermediate if level is not specified
        mockOpportunities = [
          {
            type: 'job',
            title: 'Web Developer',
            company: 'GenericCompany',
            link: '#',
            skills: ['JavaScript', 'HTML', 'CSS'],
          },
          {
            type: 'course',
            title: 'Modern JavaScript',
            platform: 'Frontend Masters',
            link: 'https://frontendmasters.com',
            skills: ['JavaScript'],
          },
        ]
    }

    // Filter opportunities to match at least one of the user's skills
    const filteredOpportunities = mockOpportunities.filter((opp) => {
      return opp.skills.some(
        (skill) => skills.includes(skill) || opp.skills.includes('Any')
      )
    })

    // Return opportunities
    return NextResponse.json({
      opportunities: filteredOpportunities,
      count: filteredOpportunities.length,
    })
  } catch (error) {
    console.error('Error in opportunities scraper:', error)
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    )
  }
}
