"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, DownloadCard } from "@/components/ui/card"
import { FileIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react"
// import {downloadFileFromS3} from "@/app/create/actions"

interface DownloadableContentProps {
  title: string
  fileType: string
  fileSize: string
  previewUrl?: string
  downloadUrl: string
}

export default function Component({ 
  title, 
  fileType, 
  fileSize, 
  previewUrl, 
  downloadUrl 
}: DownloadableContentProps = {
  title: "Sample Document",
  fileType: "PDF",
  fileSize: "2.5 MB",
  previewUrl: "/placeholder.svg?height=200&width=200&text=Preview",
  downloadUrl: "/sample-document.pdf"
}) {
  const [isHovered, setIsHovered] = useState(false)

  const safeTitle = title || "Untitled Document"
  const fileName = safeTitle.toLowerCase().replace(/\s+/g, '-')


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      
      <DownloadCard 
        className="w-full max-w-sm bg-background text-foreground overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <motion.div 
              className="rounded-full bg-primary/10 p-2"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            >
              <FileIcon className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <motion.h3 
                className="font-semibold text-lg"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {safeTitle}
              </motion.h3>
              <p className="text-sm text-muted-foreground">{fileType} - {fileSize}</p>
            </div>
          </div>
          {previewUrl && (
            <motion.div 
              className="rounded-md overflow-hidden mb-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <img 
                src={previewUrl} 
                alt={`Preview of ${safeTitle}`} 
                className="w-full h-32 object-cover"
              />
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="justify-between p-4 pt-0 ">
          <Button asChild variant="outline" size="sm">
            <motion.a 
              href={downloadUrl} 
              download={fileName}
              className="inline-flex items-center justify-center "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </motion.a>
          </Button>
        </CardFooter>
      </DownloadCard>
    </motion.div>
  )
}