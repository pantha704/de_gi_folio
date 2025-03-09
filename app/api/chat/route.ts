import { NextResponse } from 'next/server'

// This API route handles chatbot interactions
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would:
    // 1. Connect to an AI service (like OpenAI, HuggingFace, etc.)
    // 2. Send the message and context to get a response
    // 3. Potentially store the conversation history
    // 4. Return the AI's response

    // For demo purposes, we'll implement a simple rule-based response system
    let response = ''

    // Convert message to lowercase for easier matching
    const lowercaseMessage = message.toLowerCase()

    // Simple rule-based responses
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      response =
        "Hello! I'm DeGi Assistant. I can help analyze your skills and find opportunities. Have you submitted your profiles yet?"
    } else if (lowercaseMessage.includes('github')) {
      response =
        'GitHub repositories are a great way to showcase your coding skills. I can analyze your repositories to identify your tech stack and expertise level.'
    } else if (
      lowercaseMessage.includes('twitter') ||
      lowercaseMessage.includes('x')
    ) {
      response =
        "Twitter/X can reveal your interests and networking in the tech community. I'll look for tech keywords and mentions in your tweets."
    } else if (lowercaseMessage.includes('linkedin')) {
      response =
        "LinkedIn profiles contain valuable information about your professional experience and skills. Make sure your profile is public or you've provided the correct URL."
    } else if (
      lowercaseMessage.includes('job') ||
      lowercaseMessage.includes('opportunity')
    ) {
      response =
        "I can help find job opportunities that match your skill set. Once I analyze your profiles, I'll recommend relevant positions."
    } else if (
      lowercaseMessage.includes('skill') ||
      lowercaseMessage.includes('analysis')
    ) {
      response =
        'Skill analysis involves examining your GitHub repositories, Twitter activity, and LinkedIn profile to identify your technical expertise and experience level.'
    } else {
      // Default response
      response =
        "I'm still learning how to respond to that. Try asking about GitHub, Twitter, LinkedIn, skill analysis, or job opportunities."
    }

    // Return the response
    return NextResponse.json({ reply: response })
  } catch (error) {
    console.error('Error in chat handler:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
