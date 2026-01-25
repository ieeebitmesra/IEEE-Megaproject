import { useRef, useState } from 'react'
import {
  AlertCircle,
  CheckCircle,
  Database,
  Loader2,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type MongoDataLoaderProps = {
  onLoadDefault: () => Promise<void>
  onLoadCustom: (jsonText: string) => Promise<void>
  isLoading: boolean
}

export function MongoDataLoader({
  onLoadDefault,
  onLoadCustom,
  isLoading,
}: MongoDataLoaderProps) {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLoadDefault = async () => {
    try {
      setStatus('loading')
      setErrorMessage(null)

      // Check for required browser APIs
      if (
        typeof window === 'undefined' ||
        !window.crypto ||
        !window.indexedDB
      ) {
        throw new Error(
          'Your browser does not support required APIs (IndexedDB and Web Crypto). Please use a modern browser like Chrome, Firefox, or Edge.',
        )
      }

      await onLoadDefault()
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to load default data',
      )
    }
  }

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.json')) {
      setStatus('error')
      setErrorMessage('Please select a .json file')
      return
    }

    try {
      setStatus('loading')
      setErrorMessage(null)

      // Check for required browser APIs
      if (
        typeof window === 'undefined' ||
        !window.crypto ||
        !window.indexedDB
      ) {
        throw new Error(
          'Your browser does not support required APIs (IndexedDB and Web Crypto). Please use a modern browser like Chrome, Firefox, or Edge.',
        )
      }

      const text = await file.text()
      await onLoadCustom(text)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to load custom data',
      )
    }
  }

  const handleUploadClick = () => fileInputRef.current?.click()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Default Dataset
              </CardTitle>
              <CardDescription className="mt-2">
                Load pre-configured bookstore collections with sample documents
              </CardDescription>
            </div>
            <Badge variant="secondary">Recommended</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Collections: authors, books, reviews, customers, orders</p>
              <p>• Good for aggregation practice</p>
              <p>• Ready-to-use example queries</p>
            </div>

            <Button
              onClick={handleLoadDefault}
              disabled={isLoading || status === 'loading'}
              className="w-full"
              variant="default"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Loaded!
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Load Default Data
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Custom Collections
            </CardTitle>
            <CardDescription className="mt-2">
              Upload JSON: {`{ collections: { name: [docs...] } }`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Upload .json file</p>
              <p>• Keys are collection names</p>
              <p>• Values are arrays of documents</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              className="hidden"
            />

            <Button
              onClick={handleUploadClick}
              disabled={isLoading || status === 'loading'}
              className="w-full"
              variant="outline"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Loaded!
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload JSON File
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {status === 'error' && errorMessage && (
        <div className="md:col-span-2">
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-destructive mb-1">
                Error Loading Data
              </h4>
              <p className="text-sm text-destructive/90">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
