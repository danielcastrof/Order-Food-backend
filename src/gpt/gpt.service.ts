import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { UpdateGptDto } from './dto/update-gpt.dto';
import fetch from 'node-fetch';

@Injectable()
export class GptService {

  async sendMessage(prompt: {}) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    console.log('Chave: ', OPENAI_API_KEY)
    // Verificar se tem a chave
    // if (OPENAI_API_KEY === "") {
    //   document.getElementById('pergunta').innerHTML = "<span style='color: #f00;'>Necessário colocar a chave na API no arquivo custom.js</span>";
    // }

    // // Acessa o IF quando tem o SELETOR na página HTML
    // if (formPerguntaChat) {

    //   // Aguardar o usuário clicar no botão Enviar
    //   formPerguntaChat.addEventListener("submit", async (e) => {

    //     // Bloquear o recarregamento da página
    //     e.preventDefault();

    //     // Substituir o texto do botão para "Pesquisando..."
    //     document.getElementById('btn-pergunta-chat').value = "Pesquisando...";

    //     // Receber o valor do campo pergunta
    //     let pergunta = document.getElementById('campo-pergunta').value;
    //     //console.log(pergunta);

    //     // Enviar o texto da pergunta para a página HTML
    //     document.getElementById('pergunta').innerHTML = pergunta;

    //     // Limpar a resposta
    //     document.getElementById('resposta').innerHTML = "<span></span>";

        // Requisição para chatgpt
        let message = ''
        const info_body = JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [
            {"role": "user", "content":  prompt["prompt"]}
          ],
          "temperature": 0
        })
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + OPENAI_API_KEY,
            },
            body: info_body,
          }).then((resposta) => resposta.json())
          .then((dados) => {
            //console.log('Dados', dados.choices[0].message.content)
            message = dados.choices[0].message.content
          })
          .catch((e) => {
            console.log(e)
          });

          console.log(message)
          return message
  }

  // [
  //   {
  //     index: 0,
  //     message: { role: 'assistant', content: 'Olá! Como posso ajudar você hoje?' },
  //     finish_reason: 'stop'
  //   }
  // ]

  create(createGptDto: CreateGptDto) {
    return 'This action adds a new gpt';
  }

  findAll() {
    return `This action returns all gpt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gpt`;
  }

  update(id: number, updateGptDto: UpdateGptDto) {
    return `This action updates a #${id} gpt`;
  }

  remove(id: number) {
    return `This action removes a #${id} gpt`;
  }
}
