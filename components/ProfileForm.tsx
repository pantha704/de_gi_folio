'use client'

import { useState } from 'react'
import { GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-react'

// Interface for form data
interface ProfileFormData {
  github: string
  twitter: string
  linkedin: string
}

// Interface for form props
interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void
  isLoading?: boolean
}

export default function ProfileForm({
  onSubmit,
  isLoading = false,
}: ProfileFormProps) {
  // State for form data
  const [formData, setFormData] = useState<ProfileFormData>({
    github: '',
    twitter: '',
    linkedin: '',
  })

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="github"
          className="flex items-center gap-1.5 font-medium"
        >
          <GithubIcon className="w-4 h-4" /> GitHub Username
        </label>
        <div className="relative">
          <div
            className="absolute inset-y-0 left-0 flex items-center pl-3 
            pointer-events-none text-[--muted-foreground]"
          >
            <GithubIcon className="w-4 h-4" />
          </div>
          <input
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="e.g. octocat"
            className="w-full pl-10 px-3 py-2 border border-[--border] 
              bg-[--background] text-[--foreground] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[--primary]"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="twitter"
          className="flex items-center gap-1.5 font-medium"
        >
          <TwitterIcon className="w-4 h-4" /> Twitter/X Handle
        </label>
        <div className="relative">
          <div
            className="absolute inset-y-0 left-0 flex items-center pl-3 
            pointer-events-none text-[--muted-foreground]"
          >
            <TwitterIcon className="w-4 h-4" />
          </div>
          <input
            id="twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="e.g. twitter (without @)"
            className="w-full pl-10 px-3 py-2 border border-[--border] 
              bg-[--background] text-[--foreground] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[--primary]"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="linkedin"
          className="flex items-center gap-1.5 font-medium"
        >
          <LinkedinIcon className="w-4 h-4" /> LinkedIn Profile
        </label>
        <div className="relative">
          <div
            className="absolute inset-y-0 left-0 flex items-center pl-3 
            pointer-events-none text-[--muted-foreground]"
          >
            <LinkedinIcon className="w-4 h-4" />
          </div>
          <input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="e.g. linkedin.com/in/username"
            className="w-full pl-10 px-3 py-2 border border-[--border] 
              bg-[--background] text-[--foreground] rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[--primary]"
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-2 px-4 
          bg-gradient-to-r from-[--primary] to-[--accent] 
          hover:from-[--primary]/90 hover:to-[--accent]/90 
          text-white font-medium rounded-md"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze My Profiles'
        )}
      </button>
    </form>
  )
}
