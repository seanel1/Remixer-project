import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
});

const stylePrompts = {
  creative: "Please remix the following text to make it more engaging and creative, while keeping the main message:",
  professional: "Please rewrite the following text in a professional and formal tone, while maintaining the core message:",
  casual: "Please rewrite the following text in a casual, friendly tone that's easy to read:",
  social: "Please rewrite the following text in an engaging social media style, including relevant emojis where appropriate:"
};

export async function remixContent(text: string, style: keyof typeof stylePrompts = 'creative') {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `${stylePrompts[style]} ${text}`
      }]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error remixing content:', error);
    throw error;
  }
} 