import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Download } from 'lucide-react';
import { useState, useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from "@gradio/client";

export function TryRoom() {
  const [image, setImage] = useState<File | null>(null);
  const [clothing, setClothing] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [clothingPreview, setClothingPreview] = useState<string | null>(null);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [inferenceSteps, setInferenceSteps] = useState(50);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const clothingInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Gradio Client
  const [client, setClient] = useState<Client | null>(null);

  // Initialize Gradio client connection
  const initializeClient = async () => {
    try {
      const gradioClient = await Client.connect("http://127.0.0.1:7860");
      setClient(gradioClient);
    } catch (error) {
      setError("Failed to connect to Gradio client");
    }
  };

  // Run this when the component is mounted to initialize the client
  useEffect(() => {
    initializeClient();
  }, []);


  const convertToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed to convert image to Base64'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const fileToBlob = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const byteCharacters = atob((reader.result as string).split(',')[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: file.type });
          resolve(blob);
        } else {
          reject(new Error('Failed to convert file to Blob'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!image || !clothing) {
      setError('Please upload both images.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Convert images to Blob
      const imageBlob = await fileToBlob(image);
      const clothingBlob = await fileToBlob(clothing);
  
      // Connect to Gradio API
      const client = await Client.connect("https://bac36531fcf18ebab0.gradio.live/");
  
      // Call the Gradio API with Blob images
      const result = await client.predict("/viton_interface", {
        person_image: imageBlob, 
        cloth_image: clothingBlob,  
        output_dir: "output",
        height: 512,
        width: 512,
        base_model_path: "runwayml/stable-diffusion-inpainting",
        resume_path: "zhengchong/CatVTON",
        mixed_precision: "fp16",
        num_inference_steps: 100,
        guidance_scale: 2.5,
        seed: 555,
        repaint: false,
        concat_eval_results: true,
      });
  
      setGeneratedImage(result.data[0].url); // Assuming the backend returns a URL
      console.log(result.data[0].url)
      setError("")
    } catch (error) {
      setError('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };


  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleClothingClick = () => {
    if (clothingInputRef.current) {
      clothingInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleClothingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setClothing(file);
      const clothingUrl = URL.createObjectURL(file);
      setClothingPreview(clothingUrl);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.jpg';
      link.click();
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleClothingRemove = () => {
    setClothing(null);
    setClothingPreview(null);
  };

  return (
    <div className="container py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upload Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Upload Images</h2>
            <div className="mt-4 grid gap-4">
              <div className="rounded-lg border-2 border-dashed p-8 text-center relative">
                {imagePreview && (
                  <button
                    className="absolute top-2 right-2 text-red-500"
                    onClick={handleImageRemove}
                  >
                    <X size={24} />
                  </button>
                )}
                {!imagePreview && (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drop your photo or click to upload
                    </p>
                    <input
                      ref={imageInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <Button variant="outline" className="mt-4" onClick={handleImageClick}>
                      Select Photo
                    </Button>
                  </>
                )}
                {imagePreview && (
                  <img src={imagePreview} alt="Image Preview" className="mt-4 w-full h-auto rounded-lg" />
                )}
              </div>
              <div className="rounded-lg border-2 border-dashed p-8 text-center relative">
                {clothingPreview && (
                  <button
                    className="absolute top-2 right-2 text-red-500"
                    onClick={handleClothingRemove}
                  >
                    <X size={24} />
                  </button>
                )}
                {!clothingPreview && (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drop clothing item or click to upload
                    </p>
                    <input
                      ref={clothingInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleClothingChange}
                    />
                    <Button variant="outline" className="mt-4" onClick={handleClothingClick}>
                      Select Clothing
                    </Button>
                  </>
                )}
                {clothingPreview && (
                  <img src={clothingPreview} alt="Clothing Preview" className="mt-4 w-full h-auto rounded-lg" />
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <h2 className="text-lg font-semibold">Advanced Settings</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Height
                </label>
                <Input type="number" className="mt-1" value={height} onChange={(e) => setHeight(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Width
                </label>
                <Input type="number" className="mt-1" value={width} onChange={(e) => setWidth(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Inference Steps
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  className="mt-1 w-full"
                  value={inferenceSteps}
                  onChange={(e) => setInferenceSteps(+e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Guidance Scale
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  className="mt-1 w-full"
                  value={guidanceScale}
                  onChange={(e) => setGuidanceScale(+e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button variant="outline" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Generating...' : 'Generate'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>

        {/* Output Section */}
        <div>
          <h2 className="text-lg font-semibold">Result</h2>
          <div className="mt-6 space-y-4">
            {generatedImage && (
              <div>
                <img src={generatedImage} alt="Generated Image" className="w-full h-auto rounded-lg" />
                <Button variant="outline" className="mt-4" onClick={handleDownload}>
                  <Download size={16} className="mr-2" />
                  Download Image
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
