interface ContactPayload {
  submissionType?: 'contact' | 'booking'
  name?: string
  email?: string
  phone?: string
  message?: string
  sessionType?: string
  preferredDate?: string
  duration?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const toEmail = Deno.env.get('CONTACT_TO_EMAIL') || 'shriyandhanush@gmail.com'
    const fromEmail = Deno.env.get('CONTACT_FROM_EMAIL')

    if (!resendApiKey || !fromEmail) {
      return Response.json(
        {
          error: 'Missing RESEND_API_KEY or CONTACT_FROM_EMAIL secret.',
        },
        {
          status: 500,
          headers: corsHeaders,
        },
      )
    }

    const payload = (await request.json()) as ContactPayload
    const submissionType = payload.submissionType || 'contact'
    const name = payload.name?.trim()
    const email = payload.email?.trim()
    const phone = payload.phone?.trim() || 'Not provided'
    const message = payload.message?.trim()
    const sessionType = payload.sessionType?.trim() || 'Not provided'
    const preferredDate = payload.preferredDate?.trim() || 'Not provided'
    const duration = payload.duration?.trim() || 'Not provided'

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400, headers: corsHeaders },
      )
    }

    const subject =
      submissionType === 'booking'
        ? `New OGHA booking request from ${name}`
        : `New OGHA enquiry from ${name}`

    const heading =
      submissionType === 'booking'
        ? 'New OGHA Soundworks Booking Request'
        : 'New OGHA Soundworks Contact Message'

    const bookingDetails =
      submissionType === 'booking'
        ? `
            <p><strong>Session Type:</strong> ${sessionType}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate}</p>
            <p><strong>Duration:</strong> ${duration}</p>
          `
        : ''

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
            <h2 style="margin-bottom: 16px;">${heading}</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${bookingDetails}
            <p><strong>Message:</strong></p>
            <div style="padding: 16px; border-radius: 12px; background: #f3f4f6; white-space: pre-wrap;">${message}</div>
          </div>
        `,
      }),
    })

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text()
      return Response.json(
        { error: resendError || 'Failed to send email via Resend.' },
        { status: 502, headers: corsHeaders },
      )
    }

    const data = await resendResponse.json()

    return Response.json(
      {
        success: true,
        data,
      },
      { headers: corsHeaders },
    )
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Unexpected error.',
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    )
  }
})
