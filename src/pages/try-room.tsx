"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X, Download, Loader2, Settings, ImageIcon, Shirt, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mocked for the demo - replace with your actual implementation
const supabase = {
  auth: {
    getUser: async () => ({ data: { user: { id: "123" } } }),
  },
}

export function TryRoom() {
  const [image, setImage] = useState<File | null>(null)
  const [clothing, setClothing] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [clothingPreview, setClothingPreview] = useState<string | null>(null)
  const [height, setHeight] = useState(512)
  const [width, setWidth] = useState(512)
  const [guidanceScale, setGuidanceScale] = useState(7.5)
  const [inferenceSteps, setInferenceSteps] = useState(50)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const clothingInputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()

  const API = "https://rvhhmsa3o7chw7s5nuz4j7uxvi0hqukt.lambda-url.eu-north-1.on.aws/"

  // Check authentication
  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        // In a real app, redirect to login
        console.log("User not authenticated")
      }
    }
    checkAuth()
  }, [])

  const fileToBlob = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          const byteCharacters = atob((reader.result as string).split(",")[1])
          const byteNumbers = new Array(byteCharacters.length)
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
          }
          const byteArray = new Uint8Array(byteNumbers)
          const blob = new Blob([byteArray], { type: file.type })
          resolve(blob)
        } else {
          reject(new Error("Failed to convert file to Blob"))
        }
      }
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async () => {
    if (!image || !clothing) {
      toast({
        title: "Missing images",
        description: "Please upload both a person image and a clothing image.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setGeneratedImage(null)

    try {
      const imageBlob = await fileToBlob(image)
      const clothingBlob = await fileToBlob(clothing)

      const formData = new FormData()
      formData.append("person_image", imageBlob, "person.jpg")
      formData.append("cloth_image", clothingBlob, "cloth.jpg")
      formData.append("height", height.toString())
      formData.append("width", width.toString())
      formData.append("base_model_path", "runwayml/stable-diffusion-inpainting")
      formData.append("resume_path", "zhengchong/CatVTON")
      formData.append("mixed_precision", "fp16")
      formData.append("num_inference_steps", inferenceSteps.toString())
      formData.append("guidance_scale", guidanceScale.toString())
      formData.append("seed", "555")
      formData.append("repaint", "false")
      formData.append("concat_eval_results", "true")
      formData.append("cloth_type", "upper")

      const response = await fetch(API, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const imageUrl = URL.createObjectURL(blob)
        setGeneratedImage(imageUrl)
        setActiveTab("result")
        toast({
          title: "Success!",
          description: "Your virtual try-on has been generated.",
        })
      } else {
        const errorText = await response.text()
        toast({
          title: "Generation failed",
          description: errorText || "An error occurred during image generation.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Generation failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageClick = () => imageInputRef.current?.click()
  const handleClothingClick = () => clothingInputRef.current?.click()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleClothingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setClothing(file)
      setClothingPreview(URL.createObjectURL(file))
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a")
      link.href = generatedImage
      link.download = "virtual-try-on.jpg"
      link.click()
    }
  }

  const handleImageRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImage(null)
    setImagePreview(null)
  }

  const handleClothingRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setClothing(null)
    setClothingPreview(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Virtual Try-On Room</h1>
        <p className="text-gray-500 text-center max-w-2xl">
          Upload your photo and a clothing item to see how it would look on you
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span>Upload</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="result" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Result</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <TabsContent value="upload" className="mt-0">
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-4">
                  <CardTitle className="text-xl text-gray-800">Upload Images</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Person Image</label>
                      <div
                        className={`relative aspect-[3/4] rounded-xl border-2 ${
                          imagePreview ? "border-solid border-violet-200" : "border-dashed border-gray-300"
                        } bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer overflow-hidden group`}
                        onClick={handleImageClick}
                      >
                        {imagePreview ? (
                          <>
                            <button
                              className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors"
                              onClick={handleImageRemove}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Person preview"
                              className="w-full h-full object-cover"
                            />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mb-3">
                              <Upload className="h-6 w-6 text-violet-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-700 text-center">Upload your photo</p>
                            <p className="text-xs text-gray-500 text-center mt-1">Drag and drop or click to browse</p>
                          </div>
                        )}
                        <input
                          ref={imageInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Clothing Image</label>
                      <div
                        className={`relative aspect-[3/4] rounded-xl border-2 ${
                          clothingPreview ? "border-solid border-indigo-200" : "border-dashed border-gray-300"
                        } bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer overflow-hidden group`}
                        onClick={handleClothingClick}
                      >
                        {clothingPreview ? (
                          <>
                            <button
                              className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors"
                              onClick={handleClothingRemove}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
                            <img
                              src={clothingPreview || "/placeholder.svg"}
                              alt="Clothing preview"
                              className="w-full h-full object-cover"
                            />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                              <Shirt className="h-6 w-6 text-indigo-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-700 text-center">Upload clothing</p>
                            <p className="text-xs text-gray-500 text-center mt-1">Drag and drop or click to browse</p>
                          </div>
                        )}
                        <input
                          ref={clothingInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleClothingChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-4">
                  <CardTitle className="text-xl text-gray-800">Generation Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Image Height</label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(+e.target.value)}
                          className="focus-visible:ring-violet-500"
                          min={256}
                          max={1024}
                          step={8}
                        />
                        <p className="text-xs text-gray-500">Recommended: 512px</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Image Width</label>
                        <Input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(+e.target.value)}
                          className="focus-visible:ring-violet-500"
                          min={256}
                          max={1024}
                          step={8}
                        />
                        <p className="text-xs text-gray-500">Recommended: 512px</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Inference Steps</label>
                        <span className="text-sm font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                          {inferenceSteps}
                        </span>
                      </div>
                      <Slider
                        value={[inferenceSteps]}
                        onValueChange={([value]) => setInferenceSteps(value)}
                        max={100}
                        min={10}
                        step={1}
                        className="[&>span:first-child]:bg-violet-100 [&>span:first-child_span]:bg-violet-600"
                      />
                      <p className="text-xs text-gray-500">
                        Higher values produce more detailed results but take longer to generate.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Guidance Scale</label>
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {guidanceScale.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        value={[guidanceScale]}
                        onValueChange={([value]) => setGuidanceScale(value)}
                        max={20}
                        min={1}
                        step={0.1}
                        className="[&>span:first-child]:bg-indigo-100 [&>span:first-child_span]:bg-indigo-600"
                      />
                      <p className="text-xs text-gray-500">
                        Controls how closely the result follows the prompt. 7-8 is usually optimal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="result" className="mt-0">
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-4">
                  <CardTitle className="text-xl text-gray-800">Generated Result</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-[3/4] max-h-[70vh] rounded-xl overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 relative">
                      {generatedImage ? (
                        <img
                          src={generatedImage || "/placeholder.svg"}
                          alt="Generated outfit"
                          className="w-full h-full object-contain"
                        />
                      ) : loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Loader2 className="h-10 w-10 text-violet-500 animate-spin mb-4" />
                          <p className="text-gray-600 font-medium">Generating your virtual try-on...</p>
                          <p className="text-sm text-gray-500 mt-2">This may take a minute</p>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                          <Sparkles className="h-10 w-10 text-gray-400 mb-4" />
                          <p className="text-gray-600 font-medium text-center">Your generated image will appear here</p>
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            Upload images and click "Generate" to create a virtual try-on
                          </p>
                        </div>
                      )}
                    </div>

                    {generatedImage && (
                      <Button
                        onClick={handleDownload}
                        className="mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="lg:col-span-4">
            <Card className="border-0 shadow-lg sticky top-4">
              <CardHeader className="bg-gradient-to-r from-violet-500 to-indigo-600 pb-4">
                <CardTitle className="text-xl text-white">Ready to Try On?</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Status</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${image ? "bg-green-500" : "bg-gray-300"}`} />
                        <span className={image ? "text-gray-900" : "text-gray-500"}>Person Image</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${clothing ? "bg-green-500" : "bg-gray-300"}`} />
                        <span className={clothing ? "text-gray-900" : "text-gray-500"}>Clothing Image</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${height >= 256 && width >= 256 ? "bg-green-500" : "bg-gray-300"}`}
                        />
                        <span className={height >= 256 && width >= 256 ? "text-gray-900" : "text-gray-500"}>
                          Dimensions
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${inferenceSteps >= 10 ? "bg-green-500" : "bg-gray-300"}`}
                        />
                        <span className={inferenceSteps >= 10 ? "text-gray-900" : "text-gray-500"}>Settings</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={loading || !image || !clothing}
                      className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md transition-all duration-200 hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Try-On
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-medium text-gray-700">Tips</h3>
                    <ul className="text-xs text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <span>Use front-facing photos of the person for best results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <span>Clothing images should have a clean background</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <span>Higher inference steps (40-50) produce better quality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          4
                        </div>
                        <span>Generation may take 30-60 seconds depending on settings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
