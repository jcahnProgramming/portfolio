import { useEffect, useState } from 'react'

const GITHUB_USERNAME = 'jcahnProgramming'

type RepoType = {
  title: string
  description: string
  github: string
  image: string
  tech: string[]
}

export default function useGitHubRepos() {
  const [repos, setRepos] = useState<RepoType[]>([])

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
        const data = await res.json()

        const mapped = await Promise.all(
          data.map(async (repo: any) => {
            const imageUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/main/default-image.png`
            const imageExists = await fetch(imageUrl).then(res => res.ok)

            return {
              title: repo.name,
              description: repo.description,
              github: repo.html_url,
              image: imageExists
                ? imageUrl
                : '/src/assets/placeholder-dev.png',
              tech: [repo.language]
            }
          })
        )

        setRepos(mapped)
      } catch (err) {
        console.error('GitHub fetch failed:', err)
      }
    }

    fetchRepos()
  }, [])

  return repos
}
