import { useState } from "react";

export const useAI = () => {
  const AI_API_KEY = process.env.REACT_APP_STABILITY_AI;
  const aiURL =
    "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image";
  const [imgUrl, setImgUrl] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const sendTextToPrompt = async (promptText) => {
    try {
      setAiLoading(true);
      const payload = {
        cfg_scale: 7,
        clip_guidance_preset: "FAST_BLUE",
        height: 512,
        width: 512,
        sampler: "K_DPM_2_ANCESTRAL",
        samples: 1,
        steps: 30,
        text_prompts: [
          {
            text: promptText,
            weight: 1,
          },
        ],
      };

      const res = await fetch(aiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AI_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      const { artifacts } = json;
      const Imgurl = "data:image/png;base64," + artifacts[0]?.base64;
      setImgUrl(Imgurl);
      setAiLoading(false);
    } catch (e) {
      console.log(e);
      alert("Unable to generate image");
      setAiLoading(false);
    }
  };

  const removeImage = () => {
    setImgUrl("");
  };

  return [sendTextToPrompt, imgUrl, aiLoading, removeImage];
};
