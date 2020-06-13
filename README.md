Olá! Obrigado por me possibilitarem a oportunidade de concorrer à vaga de desenvolvedor júnior.

As bibliotecas utilizadas no projeto foram:

- Express - Para facilitar a criação das rotas;
- Mongoose - Para conexão com o MongoDB;
- Morgan - Para logs das requisições e debug simples.

Antes de rodar o projeto, favor instalar as dependências com npm install ou yarn install, de acordo com seu gerenciador de pacotes de preferência.

O script yarn start (ou npm start) roda o programa com o Node, enquanto o script dev roda o programa com o nodemon.

A autenticação necessária para o banco de dados já está inclusa no código.

A quem possa interessar, foi utilizado o software Postman para envio das requisições.

_USO_

- A porta utilizada pelo programa é a 3000.
- npm start ou yarn start
- Mandar uma requisição "DELETE" para "localhost:3000/", com a intenção de limpar o banco de dados antes do envio da agenda.
- Em seguida, mandar uma requisição "POST" vazia. Isto lerá o arquivo proposals.txt fornecido para realização do teste e, após conversão dos dados para objeto javascript, utilizará o Mongoose para enviar as palestras, já devidamente organizadas em tracks, para o banco de dados MongoDB.
- Por fim, mandar uma requisição "GET". O programa consultará o banco de dados e retornará o resultado devidamente organizado (hopefully :D)

_/USO_

_Comentários_
Não acredito que a implementação tenha sido a melhor possível, mas foi o que consegui fazer com as minhas habilidades atuais e o prazo fornecido. Alguns pontos que eu poderia ter feito melhor e reconheço seriam, por exemplo, validação dos dados antes da escrita no banco de dados e uma verificação mais efetiva do tamanho das tracks antes de definir o horário do evento de networking. Infelizmente, não me ocorreram ideias de como, na prática, fazer essas coisas. O processo de aprendizado sempre continua e espero poder continuar aprendendo enquanto parte do time da Stant.
