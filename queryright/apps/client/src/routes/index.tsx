import { createFileRoute } from '@tanstack/react-router'
import Landing from '@/pages/landing/landing'
// import CodeEditor from '@/components/monaco-editor'
// import { createFileRoute } from '@tanstack/react-router'
// import * as webllm from "@mlc-ai/web-llm";
// import { useEffect, useState } from 'react';

export const Route = createFileRoute('/')({
  component: App,
  // ssr: false
})

function App() {
  // const [engineInstance, setEngineInstance] = useState<webllm.MLCEngineInterface | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [response, setResponse] = useState<string>("");

  // const initProgressCallback = (initProgress: webllm.InitProgressReport) => {
  //   console.log(initProgress);
  // }

  // const selectedModel = "Qwen2-0.5B-Instruct-q4f16_1-MLC";

  // const appConfig: webllm.AppConfig = {
  //   model_list: [
  //     {
  //       model: "https://huggingface.co/mlc-ai/Qwen2-0.5B-Instruct-q4f16_1-MLC",
  //       model_id: "Qwen2-0.5B-Instruct-q4f16_1-MLC",
  //       model_lib:
  //         webllm.modelLibURLPrefix +
  //         webllm.modelVersion +
  //         "/Qwen2-0.5B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm",
  //       low_resource_required: true,
  //     },
  //   ],
  //   useIndexedDBCache: true,
  // };

  // const clearCache = async () => {
  //   try {
  //     const cacheStorage = await caches.open("webllm/model");
  //     await cacheStorage.delete("https://huggingface.co/mlc-ai/Qwen2-0.5B-Instruct-q4f16_1-MLCresolve/main/mlc-chat-config.json");
  //     console.log("Cache cleared");
  //   } catch (err) {
  //     console.error("Failed to clear cache:", err);
  //   }
  // };

  // const initEngine = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     // Check WebGPU support
  //     if (!navigator.gpu) {
  //       setError("WebGPU is not supported. Please use Chrome/Edge 113+ with WebGPU enabled.");
  //       setLoading(false);
  //       return;
  //     }

  //     const engine = await webllm.CreateMLCEngine(
  //       selectedModel,
  //       {
  //         initProgressCallback: initProgressCallback,
  //         appConfig: appConfig
  //       },
  //     );
  //     setEngineInstance(engine);
  //     console.log("Engine initialized successfully");

  //     // Call handleAskQuestion after engine is set
  //     await handleAskQuestion(engine);
  //   } catch (error) {
  //     console.error("Failed to initialize engine:", error);
  //     if (error instanceof Error && error.message.includes("Key already exists")) {
  //       setError("Cache conflict detected. Clearing cache...");
  //       await clearCache();
  //       setError("Cache cleared. Please refresh the page.");
  //     } else {
  //       setError(error instanceof Error ? error.message : "Failed to initialize engine");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const handleAskQuestion = async (engine: webllm.MLCEngineInterface) => {
  //   try {
  //     const messages: webllm.ChatCompletionMessageParam[] = [
  //       { role: "system", content: "You are a helpful AI assistant. Give concise and accurate answers." },
  //       { role: "user", content: "What is 2+2?" },
  //     ];

  //     const reply = await engine.chat.completions.create({
  //       messages,
  //       temperature: 0.7,
  //       max_tokens: 50,
  //     });

  //     const content = reply.choices[0].message.content || "";
  //     setResponse(content);
  //     console.log("Response:", content);
  //     console.log("Usage:", reply.usage);
  //   } catch (error) {
  //     console.error("Failed to get response:", error);
  //   }
  // }

  // useEffect(() => {
  //   initEngine();

  // }, [])

  return (
    <>
      {/* {loading && <div>Loading model...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {engineInstance && (
        <div>
          <h2>Model loaded successfully!</h2>
          {response && (
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
              <h3>AI Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      )} */}
      {/* <CodeEditor/> */}
      <Landing />
    </>
  )
}
