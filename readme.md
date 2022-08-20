# DB SYSTEM

### Sistema de acesso baseado no funcionamento de NoSQL file databases.

## THIS IS BETA

##### Feature Branch
##### Liberado funçoes de cryptografia

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
 
### Como usar:
* Pode ser usado duas formas de chamada:
   1. import  {findItemInAll} from "fs-json-db"
   2. const fs_json_db = require('fs-json-db')
* Para instalar no seu projeto use:
   1. yarn add fs-json-db
   2. npm install --save fs-json-db
* createDB(dirName,basesParam)
   * dirName == PASTA principal onde serão salvos;
   * basesParam, altera ou adiciona, parametros especiais;
      * ```js
         let basesParam = {
            qtId:10, //numero de items por arquivo posso mudar o valor a qualquer momento vantagens do modelo
            dir:'data/DB/', //diretorio a ser usado como base para todos os DBs, posso alterar esse valor, nesse caso posso ter uma pasta para qualquer conjunto de DBs
            }
         ```
      * Embora eu tenha defino o qtId para 10, usar um valor maior pode ser util em alguns casos, definido 10 para facilitar execuçoes assincronas, uma vez que possa manipular varios arquivos de uma vez, se tornando mais rapida em alguns casos.
   * ```js
      createDB(dirName) //chamada simples
      ```
* ```js 
   addItem(DBname,data) //adiciona items de modo sincrono
   ``` 
* ```js 
   addItem(DBname,data,params,typeAdd) // mudado para adicionar mais opções pela mesma função

   const params = { // exemplo de variavel params
        qtId:10, // quantidade de items salvo por vez
        dir:'./data/DB', // diretorio de armazenamento e busca
        findQt : null,// quatidade de items a ser buscado por vez, null == todos
        crypto:{ // nescessario apenas se usar crypto
            type:'sumsymple',//tipo de cryptografia
            key:'isso_é_uma_senha'//senha
        }
    }
   const typeAdd = '1' // 1 sincrono; 2 Crypto
   ``` 
* ```js
   findIdInAll(DBname,"/regex/") //busca id pelo valor do regex
   ```
* ```js
   findItemInAll(DBname,"/regex/",params,typeFind) 
   //retorna o item exemplo, item = [ { id: 1, item: { user: 11, erros: [Array] } } ]
   //obs: id é o numero da linha

   const params = { // exemplo de variavel params
        qtId:10, // quantidade de items salvo por vez
        dir:'./data/DB', // diretorio de armazenamento e busca
        findQt : null,// quatidade de items a ser buscado por vez, null == todos
        crypto:{ // nescessario apenas se usar crypto
            type:'sumsymple',//tipo de cryptografia
            key:'isso_é_uma_senha'//senha
        }
    }
   const typeFind= '1' // 1 regex, 2 cahve valor, 3 chave valor com cryptografia
   ```
