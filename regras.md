 ## 1. Database baseado em pastas:
## 2. Arquivos separados em valores:
1.   Cada arquivo tera tera um nº X de linhas, cada linha correspondera a um id.
2. O acesso podera ser feito por busca de valores, que retornara uma linha e todos os seus dados, ou diretamente pela linha que retornara os seus dados ou valores especificos

3. Exemplos:
    * URL do db = db/dbname/1.jsonl
    * nº de linhas = 10
    * quando atingir esse total
    * a path do db ira retornar 1.jsonl, 2.jsonl.
    * caso uma linha seja apagada ela devera ter o valor null, ou seja {}, ou ''.
        * isso serve para os ids não mudarem cada vez que um item for removido.
    