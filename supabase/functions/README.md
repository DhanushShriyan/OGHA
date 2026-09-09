Email notification setup for OGHA contact form:

1. Create a Resend account and API key.
2. Verify a sender email or domain in Resend.
3. Install the Supabase CLI locally if needed.
4. Set Supabase function secrets:

   supabase secrets set RESEND_API_KEY=your_resend_key
   supabase secrets set CONTACT_FROM_EMAIL="OGHA Soundworks <onboarding@resend.dev>"
   supabase secrets set CONTACT_TO_EMAIL="oghasoundworks@gmail.com"

5. Deploy the function:

   supabase functions deploy send-contact-email --no-verify-jwt

The frontend will keep saving messages to public.contact_messages and will then invoke
the send-contact-email function to deliver an email notification.
