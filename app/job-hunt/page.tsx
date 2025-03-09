// app/job-hunt/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Building2, Globe, MapPin } from 'lucide-react'

export default function JobHuntPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState<any[]>([])
  const [filter, setFilter] = useState({
    search: '',
    jobType: 'all',
    location: 'all',
  })

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'TechCorp',
          location: 'Remote',
          type: 'Full-time',
          skills: ['React', 'JavaScript', 'CSS'],
          description:
            "We're looking for a Frontend Developer with experience in React to join our team.",
          link: '#',
        },
        {
          id: 2,
          title: 'Full Stack Engineer',
          company: 'StartupXYZ',
          location: 'New York, USA',
          type: 'Full-time',
          skills: ['Node.js', 'React', 'MongoDB'],
          description:
            'Join our fast-growing startup as a Full Stack Engineer working on exciting products.',
          link: '#',
        },
        {
          id: 3,
          title: 'React Native Developer',
          company: 'MobileApp Inc',
          location: 'Remote',
          type: 'Contract',
          skills: ['React Native', 'JavaScript', 'Mobile Development'],
          description:
            'Looking for a React Native developer to help build our mobile applications.',
          link: '#',
        },
        {
          id: 4,
          title: 'Frontend Intern',
          company: 'LearnTech',
          location: 'San Francisco, USA',
          type: 'Internship',
          skills: ['HTML', 'CSS', 'JavaScript'],
          description:
            'Great opportunity for beginners to gain experience in web development.',
          link: '#',
        },
      ])
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filter.search.toLowerCase()) ||
      job.skills.some((skill: string) =>
        skill.toLowerCase().includes(filter.search.toLowerCase())
      )

    const matchesJobType =
      filter.jobType === 'all' || job.type === filter.jobType
    const matchesLocation =
      filter.location === 'all' || job.location === filter.location

    return matchesSearch && matchesJobType && matchesLocation
  })

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Job Hunt</h1>
        <p className="text-muted-foreground mb-8">
          Discover opportunities that match your skills and experience
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <Input
              placeholder="Search jobs, companies, or skills..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>
          <div>
            <Select
              value={filter.jobType}
              onValueChange={(value) =>
                setFilter({ ...filter, jobType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={filter.location}
              onValueChange={(value) =>
                setFilter({ ...filter, location: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="New York, USA">New York, USA</SelectItem>
                <SelectItem value="San Francisco, USA">
                  San Francisco, USA
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job listings */}
        <div className="space-y-6">
          {isLoading ? (
            <>
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <div className="border-l-4 border-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building2 className="h-4 w-4 mr-1" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          job.type === 'Internship' ? 'outline' : 'default'
                        }
                      >
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>

                    <p>{job.description}</p>

                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill: string) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Save Job
                    </Button>
                    <Button size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <p className="text-muted-foreground">
                No jobs match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
