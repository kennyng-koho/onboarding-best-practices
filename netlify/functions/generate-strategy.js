export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { productNiche, stepTitle, stepDescription } = await req.json();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are a world-class Growth & Product Onboarding expert.

Product: "${productNiche}"
Onboarding Step: "${stepTitle}"
Step Description: ${stepDescription}

Provide exactly 3 highly specific, actionable growth tactics for this product at this onboarding stage, plus 1 compelling copy suggestion (ad headline, email subject, or UI text).

Respond in this exact JSON format:
{
  "tactics": ["tactic 1", "tactic 2", "tactic 3"],
  "copy_suggestion": "your copy here"
}`
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ error: 'API request failed', details: error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await response.json();
    const text = result.content[0].text;

    // Parse the JSON from Claude's response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: 'Invalid response format' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const strategy = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(strategy), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/generate-strategy"
};
