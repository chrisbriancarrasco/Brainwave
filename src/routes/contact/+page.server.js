import sql from '$lib/server/database';

export const actions = {
  add_contact: async ({ request }) => {
    const data = await request.formData();
    const subject = data.get('subject');
    const email_address = data.get('email_address');
    const body = data.get('body');

    try {
      await sql`
        INSERT INTO contact (subject, email_address, body)
        VALUES (${subject}, ${email_address}, ${body})`;

      return {
        status: 200,
        body: {
          message: 'Ticket submitted successfully.',
        },
      };
    } catch (error) {
      console.error('Error inserting ticket:', error);
      return {
        status: 500,
        body: {
          message: 'An error occurred while submitting the ticket.',
        },
      };
    }
  },
};
