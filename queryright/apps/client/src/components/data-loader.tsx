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

type DataLoaderProps = {
  onLoadDefault: () => Promise<void>
  onLoadCustom: (sql: string) => Promise<void>
  isLoading: boolean
}

export function DataLoader({
  onLoadDefault,
  onLoadCustom,
  isLoading,
}: DataLoaderProps) {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLoadDefault = async () => {
    try {
      setStatus('loading')
      setErrorMessage(null)
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

    // Validate file type
    if (!file.name.endsWith('.sql')) {
      setStatus('error')
      setErrorMessage('Please select a .sql file')
      return
    }

    try {
      setStatus('loading')
      setErrorMessage(null)

      const text = await file.text()
      await onLoadCustom(text)

      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to load custom data',
      )
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Default Data Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Default Database
              </CardTitle>
              <CardDescription className="mt-2">
                Load pre-configured bookstore database with sample data
              </CardDescription>
            </div>
            <Badge variant="secondary">Recommended</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Authors, books, customers</p>
              <p>• Orders and reviews</p>
              <p>• Ready-to-use sample queries</p>
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

      {/* Custom Data Card */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Custom Database
            </CardTitle>
            <CardDescription className="mt-2">
              Upload your own SQL file to create custom database
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Upload .sql file</p>
              <p>• CREATE, INSERT statements</p>
              <p>• Use your own schema</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".sql"
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
                  Upload SQL File
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
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
