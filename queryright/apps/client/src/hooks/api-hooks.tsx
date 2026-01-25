import { env } from '@/env'
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import axios, { type AxiosProgressEvent } from 'axios'
import { useCallback, useRef, useEffect } from 'react'

// Create axios instance with proper configuration
const API_URL = env.VITE_SERVER_URL || 'http://localhost:4000'

const Axios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const AxiosFile = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
  timeout: 600000,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
})

interface UseApiGetProps {
  key: readonly [string, ...unknown[]]
  path: string
  config?: object
  staleTime?: number
  enabled?: boolean
  initialData?: unknown
}

export const useApiGet = ({
  key,
  path,
  config = {},
  enabled = true,
  staleTime = Infinity,
  initialData,
}: UseApiGetProps) => {
  const fn = async () => {
    const response = await Axios.get(path, config)
    return response.data
  }

  return useQuery({
    queryKey: key,
    queryFn: fn,
    staleTime,
    enabled,
    initialData,
  })
}

interface UseApiPostProps {
  type: 'post' | 'put' | 'delete' | 'patch'
  key: readonly [string, ...unknown[]]
  path: string
  config?: object
  sendingFile?: boolean
  setUploadProgress?: (progress: number) => void
  onCancel?: () => void
}

export const useApiPost = ({
  type,
  key,
  path,
  sendingFile = false,
  setUploadProgress,
  onCancel,
}: UseApiPostProps) => {
  const abortControllerRef = useRef<AbortController | null>(null)

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      onCancel?.()
    }
  }, [onCancel])

  useEffect(() => {
    const handleBeforeUnload = () => {
      cancelRequest()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      cancelRequest()
    }
  }, [cancelRequest])

  const fn = async (data: any) => {
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      if (sendingFile) {
        const formData = new FormData()
        const relativePaths: string[] = []

        if (data?.subDomain) formData.append('subDomain', data.subDomain)
        if (data?.cdnProjectID)
          formData.append('cdnProjectID', data.cdnProjectID)

        for (const file of data.files) {
          let relativePath = file.webkitRelativePath || file.name
          const idx = relativePath.indexOf('/')
          if (idx !== -1) {
            relativePath = relativePath.slice(idx)
          }
          formData.append('files', file, relativePath)
          relativePaths.push(relativePath)
        }

        const config = {
          headers: {
            'X-Relative-Paths': JSON.stringify(relativePaths),
          },
          signal,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (
              typeof progressEvent.total === 'number' &&
              progressEvent.total > 0
            ) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              )
              setUploadProgress?.(progress)
            }
          },
        }

        let response
        switch (type) {
          case 'put':
            response = await AxiosFile.put(path, formData, config)
            break
          case 'delete':
            response = await AxiosFile.delete(path, {
              data: formData,
              ...config,
            })
            break
          case 'post':
            response = await AxiosFile.post(path, formData, config)
            break
          case 'patch':
            response = await AxiosFile.patch(path, formData, config)
            break
          default:
            throw new Error('Unsupported method type')
        }

        abortControllerRef.current = null
        return response.data
      } else {
        const config = { signal }
        let response

        switch (type) {
          case 'put':
            response = await Axios.put(path, data, config)
            break
          case 'delete':
            response = await Axios.delete(path, { data, signal })
            break
          case 'post':
            response = await Axios.post(path, data, config)
            break
          case 'patch':
            response = await Axios.patch(path, data, config)
            break
          default:
            throw new Error('Unsupported method type')
        }

        abortControllerRef.current = null
        return response.data
      }
    } catch (error: any) {
      if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
        abortControllerRef.current = null
        throw new Error('Request cancelled')
      }

      abortControllerRef.current = null
      throw error
    }
  }

  const mutation = useMutation({
    mutationKey: key,
    mutationFn: fn,
  })

  ;(mutation as any).cancel = cancelRequest
  ;(mutation as any).isAborted = () =>
    abortControllerRef.current?.signal.aborted ?? false

  return mutation
}

interface UseApiInfiniteQueryProps {
  key: readonly [string, ...unknown[]]
  path: string
  config?: object
  enabled?: boolean
  staleTime?: number
  limit?: number
  tags?: string
  query?: string
  getNextPageParam: (lastPage: any, allPages: any[]) => number | undefined
  initialPageParam?: number
  getPreviousPageParam?: (firstPage: any, allPages: any[]) => number | undefined
}

export const useApiInfiniteQuery = ({
  key,
  path,
  config = {},
  enabled = true,
  staleTime = Infinity,
  getNextPageParam,
  initialPageParam = 1,
  limit = 10,
  tags = '',
  query = '',
  getPreviousPageParam,
}: UseApiInfiniteQueryProps) => {
  const fn = async ({ pageParam }: any) => {
    const url = path.includes('?')
      ? `${path}&query=${query}&page=${pageParam}&limit=${limit}&tags=${tags}`
      : `${path}?query=${query}&page=${pageParam}&limit=${limit}&tags=${tags}`

    const response = await Axios.get(url, config)
    return response.data
  }

  return useInfiniteQuery({
    queryKey: key,
    queryFn: fn,
    getNextPageParam,
    getPreviousPageParam,
    initialPageParam,
    staleTime,
    enabled,
  })
}
