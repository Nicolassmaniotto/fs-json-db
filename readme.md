# DB SYSTEM

### Sistema de acesso baseado no funcionamento de NoSQL databases.


#### JSON Escolhido por ser mais facil controlar os dados a serem inserido sem nescessariamente saber quais serao esses dados.


### Dados salvos em JSONl
 * Escolhido usar fs ao invés da bilioteca node-jsonl;
 * Escolhido por ser mais simples a pesquisa de dados do que CSV;
 * JSONl => JSON line, modelo de arquivo baseado em JSON, no qual cada dado JSON é salvo por linha;
    * Mais fácil incrementar, uma vez que não precisa ser pego todo os dados antigos para adicionar um novo,pode ser escrita apenas o novo dado ao final.
    * Util quando precisa inserir mais dados do que remover.
    * Facil leitura uma vez que é possivel ler linha por linha e não esperar que todo o arquivo seja carregado, antes de tomar uma ação.
* Como o foco desse banco de dados é auxiliar na faze inicial de projetos, ele não tera controle sobre os tipo de dados a serem guardados, ou seja ele só sabera que que tem algo a guardar mas não exatamente o que é.
   * Obs: indiferente do tipo de dado a guardar ele sera salvo como json, ou seja:
      * {dados:["alguma coisa"]}
      * {dados:{blobComoString:"001010000001010001010010100"}}
      * Qualquer verificação devera ser feita fora do gerenciador de DB
 



