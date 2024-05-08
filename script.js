// require('dotenv').config();
// const apiKey = process.env.openaiKEY; // Use openAI API Key
openaiKEY = '';
const apiKEY = openaiKEY;

async function translateText() {

    const sourceText = document.querySelector('#sourceText').value;
    const targetLang = document.querySelector('#targetLang').value;
    const sourceLang = document.querySelector('#sourceLang').value;
    const targetText = document.querySelector('#targetText');    

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    'role': "user",
                    'content': `Act as an language translator and convert the ${sourceLang} to ${targetLang}; 
                    the response should be exact word to word without any additions just provide the word(s) translation;
                    only provide the translated text;
                    word to be converted is ${sourceText}`,
                }
            ],
            max_tokens: 20
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        targetText.textContent = data.choices[0].message.content;
    } catch (error) {
        console.log(error);
    }
}
