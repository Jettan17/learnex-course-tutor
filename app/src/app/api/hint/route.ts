import { generateText } from 'ai'
import { hintModel } from '@/lib/ai'
import { Question } from '@/types'

interface RequestBody {
  question: Question
  topicSummary: string
  hintLevel: 1 | 2
}

export async function POST(req: Request) {
  const { question, topicSummary, hintLevel }: RequestBody = await req.json()

  const levelInstruction =
    hintLevel === 1
      ? 'Give a brief orienting hint (1–2 sentences). Direct the student toward the relevant concept or topic area. Do NOT reveal or imply the correct answer.'
      : 'Give a slightly more direct hint (2–3 sentences). Guide the student toward the correct reasoning path, but still do NOT state or imply the answer.'

  const prompt = `You are a study assistant helping a student who is stuck on a quiz question.

${levelInstruction}

Topic context:
${topicSummary.slice(0, 800)}

Question:
${question.content}${question.codeSnippet ? '\n\nCode:\n' + question.codeSnippet : ''}

Rules:
- Do not reveal, guess, or imply the correct answer
- Keep it short and Socratic
- Focus on the concept being tested, not the specific options
- Write in plain text, no markdown

Hint:`

  try {
    const { text } = await generateText({
      model: hintModel,
      prompt,
    })
    return Response.json({ hint: text.trim(), level: hintLevel })
  } catch (err) {
    const status = err instanceof Error && err.message.includes('429') ? 429 : 500
    const message = status === 429
      ? 'Rate limit reached — wait a moment and try again.'
      : 'Could not load hint. Please try again.'
    return Response.json({ error: message }, { status })
  }
}
