<script>
  export let form;
</script>

<main>
    <h1>Submit a Ticket</h1>
    {#if form?.message}
      <p>{form.message}</p>
    {/if}
    <form method="POST" action="?/add_contact">
      <div>
        <label for="subject">Subject</label>
        <input
          name=subject
          type="text"
          placeholder="Enter the subject"
          required
        />
      </div>
      <div>
        <label for="email_address">Your Email</label>
        <input
          name=email_address
          type="email"
          id="email"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div>
        <label for="body">Description</label>
        <textarea
          name=body
          id="description"
          placeholder="Describe your issue or feedback"
          required
        ></textarea>
      </div>
      <button type="submit">Submit Ticket</button>
  </form>
  </main>
  
  <style>
    :global(body, html) {
      margin: 0;
      height: 100%;
    }
  
    main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 0;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 1em;
      width: 100%;
      max-width: 600px;
      padding: 1em;
    }
  
    label {
      font-weight: bold;
    }
  
    input, textarea {
      width: 100%;
      padding: 0.5em;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    textarea {
      resize: vertical;
    }
  
    button {
      padding: 0.5em 1em;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      align-self: center;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>
  