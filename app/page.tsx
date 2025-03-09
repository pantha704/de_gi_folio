'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  BookOpen as BookOpenIcon,
  LayoutGrid as LayoutGridIcon,
  MessagesSquare as MessagesSquareIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  User as UserIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ChatbotWidget from '@/components/ChatbotWidget'
import ProfileForm from '@/components/ProfileForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false)

  // State for analysis results
  const [results, setResults] = useState<any>(null)

  // Dummy language data for histogram
  const languageData = [
    { name: 'JavaScript', value: 85 },
    { name: 'TypeScript', value: 70 },
    { name: 'Python', value: 60 },
    { name: 'HTML/CSS', value: 90 },
    { name: 'React', value: 75 },
    { name: 'Node.js', value: 65 },
  ]

  // Function to handle form submission
  const handleProfileSubmit = async (data: {
    github: string
    twitter: string
    linkedin: string
  }) => {
    setIsLoading(true)
    setResults(null)

    try {
      // Call GitHub scraper API
      const githubResponse = await fetch('/api/scrape/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: data.github }),
      })

      if (!githubResponse.ok) {
        throw new Error('Failed to fetch GitHub data')
      }

      const githubData = await githubResponse.json()

      // In a real implementation, you would also call the Twitter and LinkedIn APIs
      // For now, we'll use mock data

      // Mock skill analysis based on GitHub data
      const skillAnalysis = {
        primaryLanguages: ['JavaScript', 'TypeScript'],
        experienceLevel: 'Intermediate',
        strengths: ['Web Development', 'Frontend'],
        areasToImprove: ['DevOps', 'Testing'],
        recommendations: [
          {
            type: 'job',
            title: 'Frontend Developer',
            company: 'TechCorp',
            link: '#',
          },
          {
            type: 'course',
            title: 'Advanced React Patterns',
            platform: 'Coursera',
            link: '#',
          },
          {
            type: 'hackathon',
            title: 'Web3 Hackathon',
            organizer: 'ETHGlobal',
            link: '#',
          },
        ],
      }

      // Set results
      setResults({
        github: githubData,
        twitter: {
          /* mock Twitter data */
        },
        linkedin: {
          /* mock LinkedIn data */
        },
        analysis: skillAnalysis,
      })
    } catch (error) {
      console.error('Error analyzing profiles:', error)
      // You could set an error state here and display an error message
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-32">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 sm:pt-10">
        <Badge className="px-3 py-1 text-sm font-medium">Beta Release</Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-heading leading-tight pb-4">
          Discover Your Digital Potential
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect your online profiles, analyze your skills, and discover
          personalized job opportunities with AI-powered insights.
        </p>

        {/* Feature tiles */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          <Card className="hover-card border-primary/20">
            <CardHeader className="pb-2">
              <div
                className="w-10 h-10 rounded-lg bg-primary/10
                flex items-center justify-center text-primary mb-2"
              >
                <UserIcon className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl">Profile Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect GitHub, Twitter, and LinkedIn to analyze your digital
                footprint.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-card border-accent/20">
            <CardHeader className="pb-2">
              <div
                className="w-10 h-10 rounded-lg bg-accent/10
                flex items-center justify-center text-accent mb-2"
              >
                <TrendingUpIcon className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl">Skill Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Uncover your strengths and areas for growth with our AI
                analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-card border-primary/20">
            <CardHeader className="pb-2">
              <div
                className="w-10 h-10 rounded-lg bg-primary/10
                flex items-center justify-center text-primary mb-2"
              >
                <LayoutGridIcon className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl">Job Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Discover personalized career opportunities that match your
                unique skill set.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Language Proficiency Histogram */}
        <Card className="mt-12 p-6">
          <CardHeader>
            <CardTitle className="text-xl">Your Language Proficiency</CardTitle>
            <CardDescription>
              Based on your GitHub repositories and contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {languageData.map((lang) => (
                <div key={lang.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{lang.name}</span>
                    <span className="text-muted-foreground">{lang.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${lang.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            DeGi Folio leverages advanced AI to transform your digital presence
            into career opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-6">
          <div className="bg-accent/5 rounded-lg p-8 flex items-center justify-center">
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src="/dashboard-preview.png"
                alt="Dashboard preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
                className="border"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Intelligent Analysis</h3>
            <p className="text-muted-foreground">
              Enter your social profiles, and our AI will scrape relevant data
              about your skills, experience, and interests. The chatbot
              assistant helps you navigate the platform and provides
              personalized career advice.
            </p>
            <Card className="bg-card border hover-card mt-4">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div
                  className="w-12 h-12 rounded-full bg-primary/10
                  flex items-center justify-center text-primary"
                >
                  <BookOpenIcon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Try it yourself</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use the tools below to enter your profiles or ask our AI
                  assistant for help.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Enter Your Profiles</CardTitle>
            <CardDescription>
              Connect your social accounts to analyze your digital footprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm
              onSubmit={(data: any) => console.log(data)}
              isLoading={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ask Our AI Assistant</CardTitle>
            <CardDescription>
              Get personalized guidance and answer your questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChatbotWidget />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
