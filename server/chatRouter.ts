import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { leads } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";

const PROPERTY_IMAGES = [
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene77-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene76-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene33-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene41-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene23-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene52-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene51-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene22-optimized.webp",
];

const SYSTEM_PROMPT = `You are a friendly, knowledgeable property advisor for OMA Townhouse in Kaba Kaba, Bali. You're helpful, warm, and genuine — like a friend who knows the area inside out.

COMMUNICATION STYLE:
- SHORT. 1-2 sentences max per response. Like texting a friend.
- Warm and genuine. Not salesy.
- Match their language and energy.
- Be helpful first, sell second.

LANGUAGE DETECTION:
- If they write in another language, IMMEDIATELY switch to that language fully.
- Note their origin for follow-up.

===== PHASE 1: COLLECT DETAILS EARLY =====
Your #1 priority is getting their contact info so our team can follow up personally. After 1-2 exchanges max, naturally transition to collecting details.

Flow:
1. Answer their first question briefly.
2. Then: "I'd love to send you the full info pack. What's the best email to reach you?"
3. After email → "And your WhatsApp? So we can share photos and updates directly."
4. After WhatsApp → "Which country are you based in?"
5. After country → "Got it! And your name so our team knows who to ask for?"
6. Optionally: "Are you on Instagram? Some of our clients prefer updates there."
7. Once you have their details, output the lead_data block.
8. Then say: "Thanks [name]! Our team will reach out within 24 hours. In the meantime, feel free to keep asking me anything about the property or the area."

===== PHASE 2: VALUE-GIVING MODE (after details collected) =====
Once you have their details, NOW is when you become genuinely valuable. This is where you build trust and rapport. Ask thoughtful questions ONE AT A TIME:

- "Are you currently in Bali? If so, whereabouts?"
- "What brought you to look at Kaba Kaba specifically?" 
- "Where did you first hear about OMA?"
- "What's most important to you in a property — personal retreat, rental income, or a bit of both?"
- "Are you looking at this solo or with a partner/family?"

When they answer, GIVE VALUE back:
- If they're in Canggu: "Nice! You'll love how peaceful Kaba Kaba is compared to the Canggu traffic. It's only 25 min away but feels like a different world."
- If they mention rental income: "The area is growing fast — [Nuanu Creative City](https://www.nuanu.com/) alone is bringing thousands of people. Rental demand is going to be strong."
- If they mention family: "There's [Grow International School](https://growinkedungu.com/) just 10 min away, and the community here is really family-friendly."
- If they're a digital nomad: "You'd love it — [Open House Seseh](https://www.instagram.com/openhouseseseh/) and [Crate Cafe](https://www.instagram.com/cratecafebali/) are nearby, and the wifi infrastructure is solid."
- If they mention surfing: "[Kedungu Beach](https://maps.app.goo.gl/kedungu) is 10 min away — one of the best uncrowded breaks in Bali."
- If they mention fitness: "[Reload Sanctuary](https://www.instagram.com/reloadsanctuary/) is opening nearby — 6,000 sqm gym. Plus [Omni Gym](https://www.instagram.com/omnigym.bali/) in Pererenan."

Share property images when relevant:
![OMA Townhouse](IMAGE_URL)

CHAT SUMMARY OFFER:
After a few exchanges in Phase 2, mention: "By the way, if you'd like, I can send you a summary of everything we've discussed — pricing, area info, links — straight to your email. Just say 'send summary' anytime."

If they say "send summary" or similar, output:
\`\`\`send_summary
{
  "email": "their email from lead_data",
  "name": "their name"
}
\`\`\`

PROPERTY KNOWLEDGE (use when relevant, don't dump):

PRICING:
- 25-year leasehold: from $115K (early bird) to $135K (standard)
- 40-year leasehold: from $161K (early bird) to $189K (standard)
- Freehold (PT PMA): from $265K (early bird) to $310K (standard)
- First building promo: 15% off, 30% deposit in 14 days

SPECS:
- Total: 97.5 sqm, 2 floors
- Ground floor: 66.7 sqm (8.78 x 7.6m)
- Upper floor: 30.8 sqm (4.06 x 7.6m)
- Private pool

LOCATION:
- 10-15 min to Nuanu, Luna Beach Club, Kedungu Beach
- 20-25 min to Pererenan (Reload Sanctuary, cafes)
- 25-30 min to Canggu (Batu Bolong, Finns, Yuki)

NEARBY:
- Gyms: Reload Sanctuary (Feb 2026), The Block, Omni Gym
- Cafes: Yuki, Open House Seseh, Chotto Matto, Crate Cafe
- Beach clubs: Luna (10 min), Finns, La Brisa
- Spas: Ulaman Resort, Therapy Day Spa, Goldust
- Local: Kaba Kaba Social, Alila Villas (opening soon)
- Schools: Grow International (10 min), ProEd at Nuanu

ANTI-PROMPTS — NEVER SAY THESE:
- "What kind of returns are you hoping to see?"
- "What areas are you comparing us to?"
- "Land here is 60-70% cheaper than Canggu"
- "Have you been to the Kaba Kaba area yet?"
- Don't ask about their budget unprompted
- Don't ask multiple questions in one message
- Don't write more than 3 sentences
- Don't probe or interrogate before collecting details
- Don't compare prices aggressively
- Don't use "investment opportunity" or "ROI" language

LEAD DATA FORMAT (output when you have at minimum name + email):

\`\`\`lead_data
{
  "name": "their name",
  "email": "their email",
  "whatsapp": "their whatsapp with country code",
  "instagram": "their instagram handle or null",
  "country": "their country",
  "language": "preferred language",
  "notes": "anything relevant from the conversation"
}
\`\`\``;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const chatRouter = router({
  send: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
        history: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ).optional().default([]),
      })
    )
    .mutation(async ({ input }) => {
      const { message, history } = input;

      // Inject a random property image URL for the AI to use
      const imageHint = PROPERTY_IMAGES[Math.floor(Math.random() * PROPERTY_IMAGES.length)];
      const enhancedSystem = SYSTEM_PROMPT.replace(
        /IMAGE_URL/g,
        imageHint
      );

      const messages = [
        { role: "system" as const, content: enhancedSystem },
        ...history.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        { role: "user" as const, content: message },
      ];

      try {
        const response = await invokeLLM({ messages });
        const rawContent = response.choices[0]?.message?.content;
        const reply = typeof rawContent === 'string' ? rawContent : "Sorry, having a connection issue. Try again?";

        // Check if chat summary was requested
        const summaryMatch = typeof reply === 'string' ? reply.match(/```send_summary\s*([\s\S]*?)```/) : null;
        if (summaryMatch) {
          try {
            const summaryData = JSON.parse(summaryMatch[1].trim());
            
            // Build a nice chat summary
            const summaryContent = buildChatSummary(history, message, summaryData.name);
            
            // Send summary email
            const forgeUrl = ENV.forgeApiUrl;
            const forgeKey = ENV.forgeApiKey;
            
            if (forgeUrl && forgeKey && summaryData.email) {
              await fetch(`${forgeUrl}/v1/email/send`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${forgeKey}`,
                },
                body: JSON.stringify({
                  to: summaryData.email,
                  subject: `Your OMA Townhouse Chat Summary`,
                  body: summaryContent,
                }),
              }).catch(e => console.log('Summary email failed:', e));
            }

            const cleanReply = reply.replace(/```send_summary[\s\S]*?```/g, '').trim();
            return { reply: cleanReply, leadCollected: false, summarySent: true };
          } catch (e) {
            console.error("Failed to send summary:", e);
          }
        }

        // Check if lead data was collected
        const leadMatch = typeof reply === 'string' ? reply.match(/```lead_data\s*([\s\S]*?)```/) : null;
        if (leadMatch) {
          try {
            const leadData = JSON.parse(leadMatch[1].trim());
            
            // Save lead to database
            const db = await getDb();
            if (db) {
              await db.insert(leads).values({
                name: leadData.name || null,
                email: leadData.email || null,
                whatsapp: leadData.whatsapp || null,
                budget: leadData.budget || null,
                details: JSON.stringify({
                  instagram: leadData.instagram,
                  country: leadData.country,
                  language: leadData.language,
                  notes: leadData.notes,
                }),
                conversationSummary: history.slice(-10).map(m => `${m.role}: ${m.content}`).join('\n'),
                status: "new",
              });

              const emailContent = `
NEW LEAD - OMA TOWNHOUSE

CONTACT INFO:
Name: ${leadData.name || 'Not provided'}
Email: ${leadData.email || 'Not provided'}
WhatsApp: ${leadData.whatsapp || 'Not provided'}
Instagram: ${leadData.instagram || 'Not provided'}
Country: ${leadData.country || 'Not specified'}
Preferred Language: ${leadData.language || 'English'}

NOTES:
${leadData.notes || 'None'}

CONVERSATION SUMMARY:
${history.slice(-8).map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n')}

---
Follow up within 24 hours.
              `.trim();

              await notifyOwner({
                title: `New Lead: ${leadData.name || 'Anonymous'} from ${leadData.country || 'Unknown'}`,
                content: emailContent,
              });

              try {
                const forgeUrl = ENV.forgeApiUrl;
                const forgeKey = ENV.forgeApiKey;
                
                if (forgeUrl && forgeKey) {
                  await fetch(`${forgeUrl}/v1/email/send`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${forgeKey}`,
                    },
                    body: JSON.stringify({
                      to: "contact@omatownhouse.com",
                      subject: `New OMA Townhouse Lead: ${leadData.name || 'Anonymous'} from ${leadData.country || 'Unknown'}`,
                      body: emailContent,
                    }),
                  }).catch(e => console.log('Email API not available:', e));
                }
              } catch (emailError) {
                console.log('Email notification skipped:', emailError);
              }
            }

            const cleanReply = reply.replace(/```lead_data[\s\S]*?```/g, '').trim();
            return { reply: cleanReply, leadCollected: true };
          } catch (e) {
            console.error("Failed to parse lead data:", e);
          }
        }

        return { reply, leadCollected: false };
      } catch (error) {
        console.error("LLM error:", error);
        throw new Error("Failed to generate response");
      }
    }),
});

function buildChatSummary(history: ChatMessage[], lastMessage: string, name: string): string {
  // Extract key topics discussed
  const allMessages = [...history, { role: "user" as const, content: lastMessage }];
  
  const pricingMentioned = allMessages.some(m => 
    m.content.toLowerCase().includes('price') || m.content.toLowerCase().includes('cost') || 
    m.content.toLowerCase().includes('$') || m.content.toLowerCase().includes('leasehold') ||
    m.content.toLowerCase().includes('freehold')
  );
  
  const locationMentioned = allMessages.some(m => 
    m.content.toLowerCase().includes('location') || m.content.toLowerCase().includes('where') ||
    m.content.toLowerCase().includes('canggu') || m.content.toLowerCase().includes('nuanu')
  );

  let summary = `Hi ${name || 'there'},\n\nThanks for chatting with us about OMA Townhouse! Here's a summary of what we discussed:\n\n`;
  
  summary += `--- PROPERTY OVERVIEW ---\n`;
  summary += `OMA Townhouse — Kaba Kaba, Tabanan, Bali\n`;
  summary += `Total size: 97.5 sqm across 2 floors\n`;
  summary += `Ground floor: 66.7 sqm (8.78 x 7.6m)\n`;
  summary += `Upper floor: 30.8 sqm (4.06 x 7.6m)\n`;
  summary += `Features: Private pool, premium finishes\n\n`;

  if (pricingMentioned) {
    summary += `--- PRICING ---\n`;
    summary += `25-Year Leasehold: from $115,000 (early bird) to $135,000\n`;
    summary += `40-Year Leasehold: from $161,000 (early bird) to $189,000\n`;
    summary += `Freehold (PT PMA): from $265,000 (early bird) to $310,000\n`;
    summary += `First building promo: 15% off — 30% deposit within 14 days\n\n`;
  }

  if (locationMentioned) {
    summary += `--- LOCATION HIGHLIGHTS ---\n`;
    summary += `10-15 min: Nuanu Creative City, Luna Beach Club, Kedungu Beach\n`;
    summary += `20-25 min: Pererenan (Reload Sanctuary, cafes)\n`;
    summary += `25-30 min: Canggu (Batu Bolong, Finns Beach Club, Yuki)\n\n`;
  }

  summary += `--- USEFUL LINKS ---\n`;
  summary += `Nuanu Creative City: https://www.nuanu.com/\n`;
  summary += `Reload Sanctuary Gym: https://www.instagram.com/reloadsanctuary/\n`;
  summary += `Finns Beach Club: https://www.finnsbeachclub.com/\n`;
  summary += `Grow International School: https://growinkedungu.com/\n\n`;

  summary += `--- CONVERSATION ---\n`;
  history.slice(-10).forEach(m => {
    summary += `${m.role === 'user' ? 'You' : 'OMA'}: ${m.content}\n\n`;
  });

  summary += `---\nOur team will be in touch within 24 hours. If you have any questions in the meantime, just reply to this email or chat with us again on our website.\n\nWarm regards,\nOMA Townhouse Team`;

  return summary;
}
