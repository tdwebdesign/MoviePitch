import { process } from './env.js';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  })
const openai = new OpenAIApi(configuration)

const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

const MODEL = 'text-davinci-003';
const PROMPT = 'Sound enthusiastic in five words or less.';

document.getElementById("send-btn").addEventListener("click", () => {
  // if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
  // }
  updateMovieBossText();
})



async function fetchGeneratedText() {
  try {
    const response = await openai.createCompletion({
        'model': MODEL,
        'prompt': PROMPT
      })

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data.choices[0].text;
  } catch (error) {
    console.error('An error occurred while fetching the generated text:', error);
    return null;
  }
}

async function updateMovieBossText(url, apiKey) {
  const generatedText = await fetchGeneratedText(url, apiKey);
  if (generatedText) {
    movieBossText.innerText = generatedText;
  }
}

