import { streamText, convertToModelMessages, UIMessage } from 'ai'
import { chatModel } from '@/lib/ai'

interface TopicContext {
  name: string
  summary: string
  keyPoints: string[]
  codeExamples?: { title: string; code: string; language: string; explanation: string }[]
}

interface RequestBody {
  messages: UIMessage[]
  topicContext: TopicContext
}

export async function POST(req: Request) {
  const { messages, topicContext }: RequestBody = await req.json()

  const keyPointsList = topicContext.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')
  const codeSection = topicContext.codeExamples?.length
    ? '\n\nCode Examples:\n' + topicContext.codeExamples.map(ex =>
        `[${ex.title}]\n${ex.explanation}`
      ).join('\n\n')
    : ''

  const systemPrompt = `You are a study assistant helping a student understand the topic: "${topicContext.name}".

Here is the complete study material for this topic:

SUMMARY:
${topicContext.summary}

KEY POINTS:
${keyPointsList}${codeSection}

Instructions:
- Answer questions based on the study material above
- When your answer draws from a specific Key Point, cite it naturally: e.g. "As covered in Key Point 3..."
- Keep answers concise and focused — this is a study session, not a lecture
- If asked for a code example, use the language appropriate to the topic
- If a question is outside the scope of this topic, say so and redirect to what is covered`

  try {
    const result = streamText({
      model: chatModel,
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    })
    return result.toUIMessageStreamResponse()
  } catch (err) {
    const status = err instanceof Error && err.message.includes('429') ? 429 : 500
    const message = status === 429
      ? 'Rate limit reached. Wait a moment and try again.'
      : 'AI service error. Please try again.'
    return Response.json({ error: message }, { status })
  }
}
