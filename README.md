#Lista de Tarefas
Simples aplicação feita em React e Backbone.
Usa Scss para estilo e webpack para transformar e combinar todo o codigo.

####Permite:
- Adicionar items á lista
- Remover items
- Editar items
- Marcar "como feito" (sendo uma lista de tarefas)


####Utilização
 - Instalar dependências `$ npm install`
 - Instalar webpack `# npm install -g webpack`
 - Instalar webpack-dev-server `# npm install -g webpack-dev-server`
 - Para compilar 
    - `$ npm run build` para desenvolvimento
    - `$ npm run watch` o mesmo que build mas recompila quando existem alterações nos ficheiros
    - `$ npm run dist`  em modo de produção, criando um código mais pequeno e sem opções de depuração
 - Correr `$ npm start` para começar o webpack-dev-server
 - Abrir o browser no endereço http://localhost:8080

####Exemplo
![screen](screen.png)