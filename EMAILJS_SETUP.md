# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form messages at **vihangavimukthi2001@gmail.com**.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions to connect your Gmail account
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

**Template Name:** Contact Form

**Subject:** New Contact Form Message from Portfolio

**Content:**
```
From: {{from_name}} ({{from_email}})
Reply-To: {{reply_to}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Copy your **Public Key** (also called API Key)

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`)
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual credentials

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email inbox (vihangavimukthi2001@gmail.com) for the message

## Important Notes

- The `.env` file should NOT be committed to git (it's already in `.gitignore`)
- The free tier includes 200 emails per month
- Make sure your email service is properly connected and verified
- If you encounter issues, check the browser console for error messages

## Troubleshooting

- **"Failed to send message"**: Check that all environment variables are set correctly
- **"Service not found"**: Verify your Service ID is correct
- **"Template not found"**: Verify your Template ID is correct
- **No emails received**: Check your spam folder and verify the email service connection

