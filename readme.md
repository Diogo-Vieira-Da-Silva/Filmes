📌 Project Development

The first challenge of this project was understanding and properly configuring the use of APIs. To achieve this, I registered on the platform, generated the authentication key, and explored the documentation until identifying the appropriate endpoints for each required functionality. During this process, I used supporting materials, including technical videos, to strengthen my understanding of the integration.

After configuring the APIs, I began developing the interface using HTML and Bootstrap, choosing a dark-themed design. Building the visual layout was a dynamic and creative phase, allowing me to establish a visual identity aligned with the project’s proposal.

Next, I implemented API consumption using JavaScript, ensuring proper authentication through the access key. To optimize development, I used GitHub Copilot as a support tool and also referenced a previous academic project that involved API integration, which helped me apply previously learned best practices.

In the end, I delivered a fully functional system, with all proposed features correctly implemented and aligned with the project requirements.

Below is a description of the project objectives and the APIs used for its implementation:

🎯 Objectives

Consume and integrate APIs – ✅

Movie search field – ✅

Movie cards with full synopsis – ✅

Error message when a movie is not found – ✅

Dark theme design – ✅

Bootstrap implementation – ✅

Movie filtering – ✅

Local Storage usage – ✅

Favorites and review system – ✅


🖥️APIs: 

curl --request POST --url https://api.themoviedb.org/3/account/22812937/favorite --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' --header 'accept: application/json' --header 'content-type: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/account/22812937/favorite/movies?language=en-US&page=1&sort_by=created_at.asc'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/account/22812937/rated/movies?language=en-US&page=1&sort_by=created_at.asc'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/movie/changes?page=1'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url https://api.themoviedb.org/3/collection/collection_id/images
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/genre/movie/list?language=en'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies?language=en-US&page=1&sort_by=created_at.asc'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/movie/movie_id?language=en-US'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url https://api.themoviedb.org/3/movie/movie_id/images
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url https://api.themoviedb.org/3/movie/movie_id/keywords
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

 --------------------------------------------------------------- Tradução ---------------------------------------------------------------

 📌 Desenvolvimento do Projeto

O primeiro desafio do projeto foi compreender e configurar corretamente o uso das APIs. Para isso, realizei o cadastro na plataforma, gerei a chave de autenticação e explorei a documentação até identificar os endpoints adequados para cada funcionalidade necessária. Durante esse processo, utilizei materiais de apoio, incluindo vídeos técnicos, para consolidar o entendimento da integração.

Após configurar as APIs, iniciei o desenvolvimento da interface utilizando HTML e Bootstrap, optando por um design com tema escuro. A construção da parte visual foi uma etapa dinâmica e criativa, permitindo definir uma identidade visual coerente com a proposta do projeto.

Em seguida, implementei o consumo das APIs no JavaScript, garantindo a autenticação correta por meio do uso da chave de acesso. Para otimizar o desenvolvimento, utilizei o GitHub Copilot como ferramenta de apoio e também consultei um projeto acadêmico anterior que envolvia a integração de APIs, o que contribuiu para aplicar boas práticas já aprendidas.

Ao final, consegui entregar um sistema funcional, com as funcionalidades propostas implementadas corretamente e alinhadas aos requisitos definidos para o projeto.

Segue abaixo a descrição dos objetivos do projeto e das APIs utilizadas para sua implementação:

🎯Objetivos:

     Pegar as api e consumir elas - ✅
     Campo de busca de filmes - ✅
     Card dos filmes com sinopse completa - ✅
     Mensagem de erro ao não encontrar o filme - ✅
     Cores escuras - ✅
     Bootstrap - ✅
     Filtrar filmes - ✅
     Local Storage - ✅
     Favoritos e crítica - ✅



🖥️APIs: 

curl --request POST --url https://api.themoviedb.org/3/account/22812937/favorite --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' --header 'accept: application/json' --header 'content-type: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/account/22812937/favorite/movies?language=en-US&page=1&sort_by=created_at.asc'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/account/22812937/rated/movies?language=en-US&page=1&sort_by=created_at.asc'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/movie/changes?page=1'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url https://api.themoviedb.org/3/collection/collection_id/images
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/genre/movie/list?language=en'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies?language=en-US&page=1&sort_by=created_at.asc'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url 'https://api.themoviedb.org/3/movie/movie_id?language=en-US'
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url https://api.themoviedb.org/3/movie/movie_id/images
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'

curl --request GET
--url https://api.themoviedb.org/3/movie/movie_id/keywords
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'