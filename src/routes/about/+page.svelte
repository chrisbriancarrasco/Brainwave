<script context="module" lang="ts">
    export const actions = {
      submit: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const classes = formData.get('classes');
        const studyHours = formData.get('studyHours');
  
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });
  
        const mailOptions = {
          from: email,
          to: process.env.FEEDBACK_EMAIL,
          subject: `Feedback from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nClasses: ${classes}\nStudy Hours per Week: ${studyHours}`,
        };
  
        try {
          await transporter.sendMail(mailOptions);
          return {
            success: true,
            message: 'Feedback submitted successfully',
          };
        } catch (error) {
          return {
            success: false,
            message: 'Failed to submit feedback',
          };
        }
      },
    };
  </script>
  
  <script>
    import { page } from '$app/stores';
    let name = '';
    let email = '';
    let message = '';
    let classes = '';
    let studyHours = '';
    let formStatus = '';
  
    $: if (page.form?.success) {
      formStatus = page.form.message;
    }
  </script>
  
  <main>
    <h1>Contact Us</h1>
    {#if formStatus}
      <p>{formStatus}</p>
    {/if}
    <form method="post" use:enhance={{ submit: actions.submit }}>
      <label for="name">Name:</label>
      <input id="name" type="text" name="name" bind:value={name} required />
  
      <label for="email">Email:</label>
      <input id="email" type="email" name="email" bind:value={email} required />
  
      <label for="message">Message:</label>
      <textarea id="message" name="message" bind:value={message} required></textarea>
  
      <h2>Class Feedback</h2>
  
      <label for="classes">Classes:</label>
      <input id="classes" type="text" name="classes" bind:value={classes} required />
  
      <label for="studyHours">Study Hours per Week:</label>
      <input id="studyHours" type="number" name="studyHours" bind:value={studyHours} required />
  
      <button type="submit">Submit</button>
    </form>
  </main>
  

  