// app/analytics/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

// Define types for your data structure
interface SkillData {
  name: string
  level: number
}

interface GrowthArea {
  area: string
  resources: string[]
}

interface CareerPathData {
  current: string
  next: string
  requirements: string[]
}

interface DashboardData {
  skillBreakdown: SkillData[]
  growthOpportunities: GrowthArea[]
  careerPath: CareerPathData
}

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setData({
        skillBreakdown: [
          { name: 'JavaScript', level: 80 },
          { name: 'React', level: 75 },
          { name: 'TypeScript', level: 65 },
          { name: 'Node.js', level: 60 },
          { name: 'CSS', level: 70 },
        ],
        growthOpportunities: [
          { area: 'DevOps', resources: ['Docker Basics', 'CI/CD Pipelines'] },
          { area: 'Testing', resources: ['Jest', 'Cypress'] },
          { area: 'Database', resources: ['MongoDB', 'PostgreSQL'] },
        ],
        careerPath: {
          current: 'Junior Developer',
          next: 'Mid-level Developer',
          requirements: [
            'Project Management',
            'Technical Leadership',
            'System Design',
          ],
        },
      })
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Analytics Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          In-depth analysis of your skills and growth opportunities
        </p>

        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : (
          <Tabs defaultValue="skills">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="skills">Skill Breakdown</TabsTrigger>
              <TabsTrigger value="growth">Growth Areas</TabsTrigger>
              <TabsTrigger value="career">Career Path</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Skill Proficiency</CardTitle>
                  <CardDescription>
                    Detailed breakdown of your technical abilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {data?.skillBreakdown.map((skill: SkillData) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {skill.level}%
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="growth" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Opportunities</CardTitle>
                  <CardDescription>
                    Areas to focus on to advance your career
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {data?.growthOpportunities.map((area: GrowthArea) => (
                      <div key={area.area} className="rounded-lg border p-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {area.area}
                        </h3>
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground mb-2">
                            Recommended resources:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {area.resources.map((resource: string) => (
                              <Badge key={resource} variant="outline">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="career" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Career Path</CardTitle>
                  <CardDescription>
                    Current position and next steps in your professional journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-muted-foreground">
                        Current Level
                      </h3>
                      <div className="text-xl font-bold">
                        {data?.careerPath.current}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-muted-foreground">
                        Next Level
                      </h3>
                      <div className="text-xl font-bold">
                        {data?.careerPath.next}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-muted-foreground">
                        Requirements to Advance
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {data?.careerPath.requirements.map((req: string) => (
                          <Badge key={req} variant="secondary">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
