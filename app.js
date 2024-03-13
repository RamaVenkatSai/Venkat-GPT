const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

function changeInput(value) {
    inputElement.value = value.replace('💬 ', ''); // Remove the emoji when setting back the input
}

async function getMessage() {
    console.log('clicked');
    const payload = {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: inputElement.value}],
        max_tokens: 100
    };

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });   
        const data = await response.json();
        console.log(data);
        outputElement.textContent = data.choices[0].message.content;
        if(data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p');
            pElement.textContent = '💬 ' + inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent));
            historyElement.append(pElement);
        }
    } catch (error) {
        console.error(error);
    }
}

submitButton.addEventListener('click', getMessage);

function clearInput() {
    inputElement.value = '';
}

buttonElement.addEventListener('click', clearInput);
