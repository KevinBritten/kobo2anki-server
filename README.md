# kobo2anki-server

This is the backend server for the `kobo2anki` Anki add-on that allows you to use the DeepL translation API without exposing your API key on the client side.

## Features

- **Secure API Key Handling:** The backend securely manages the DeepL API key, preventing it from being exposed in the client-side code.
- **Translation Endpoint:** A `/translate` endpoint is provided to handle translation requests from the Anki add-on.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/kobo2anki-server.git
   cd kobo2anki-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your DeepL API key:

   ```
   DEEPL_API_KEY=your_deepl_api_key_here
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Usage

To translate text, send a POST request to the `/translate` endpoint with the following JSON payload:

```json
{
  "text": "Your text here",
  "context": "optional context",
  "source_lang": "optional source language code",
  "target_lang": "optional target language code, defaults to EN-GB"
}
```

The server will return a JSON response with the translated text.

## License

This project is licensed under the MIT License.
