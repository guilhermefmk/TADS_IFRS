#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//Arquivo de prototipos das funções e definicao das estruturas
typedef struct aluno{
    char nome[100];
    int idade;
    int matricula;
    struct aluno *proximo;
}Aluno;
typedef struct lse{
    Aluno *primeiro;
    int n_elementos;
    char turma [20];
}LSE;

//Funções para gerenciar a lista
LSE* criaListaLSE(char turma[]){
    """Aloca memória para uma nova lista"""; 
    LSE *nova = (LSE*)malloc(sizeof(LSE));  
    nova->primeiro = NULL;
    nova->n_elementos = 0;
    strcpy(nova->turma,turma);
    return nova;
}

Aluno* cadastraAluno(char nome[],int idade, int matricula){
    """Aloca memória para um novo Elemento (aluno)""";
    Aluno *novoAluno = (Aluno*)malloc(sizeof(Aluno));
    strcpy(novoAluno->nome,nome);
    novoAluno->idade = idade;
    novoAluno->matricula = matricula;
    novoAluno->proximo = NULL;
    return novoAluno;
}

Aluno* lerAluno(){
    Aluno *novoAluno = (Aluno*)malloc(sizeof(Aluno));
    printf("\n Informe o nome do novo aluno:");
    scanf("%s",novoAluno->nome);
    printf("\n Informe a idade do novo aluno:");
    scanf("%d",&novoAluno->idade);
    printf("\n Informe a matricula do novo aluno:");
    scanf("%d",&novoAluno->matricula);
    novoAluno->proximo = NULL;
    return novoAluno;    
}

void mostraAluno(Aluno *novo){
    """Mostra os dados de um Elemento Aluno""";
    if(novo != NULL){
        printf("\n\t Nome:%s",novo->nome);
        printf("\t Idade:%d",novo->idade);
        printf("\t Matricula:%d",novo->matricula);
    }else{
        printf("\n Erro ao imprimir Aluno Valor = NULL\n");
    }
}

void mostraLista(LSE *ls){
    """Mostra Lista""";
    Aluno *aux = ls->primeiro;
    printf("\n\n Mostra a Lista de %s:",ls->turma);
    while(aux != NULL){
        mostraAluno(aux);
        aux = aux->proximo;
    }
    printf("\n Fim da Lista!!\n");
}

void insereNoInicio(LSE *ls, Aluno *novo){
    if(ls->primeiro == NULL)
        novo->proximo = NULL;
    else
        novo->proximo = ls->primeiro;
    ls->primeiro = novo;
    ls->n_elementos++;
    printf("\n Elemento %s inserido com sucesso!!!",novo->nome);
}

void insereNoFim(LSE *ls, Aluno *novo){
    """Insere um novo elemento no Fim da Lista!!!""";
    Aluno *aux = ls->primeiro;
    if(aux == NULL)
        insereNoInicio(ls,novo);
    else{
        while (aux->proximo != NULL){
            aux = aux->proximo;
        }
        novo->proximo = NULL;
        aux->proximo = novo;
        ls->n_elementos++;
    }
}

//insere o novo aluno na turma na posicao "pos";
void insereNaPosicao(LSE *ls, Aluno *novo, int pos) {
    if (pos < 0 || pos > ls->n_elementos) {
        printf("\n\t Posição inválida para inserção: %d!!", pos);
        return;
    }

    if (pos == 0) {
        insereNoInicio(ls, novo);
        return;
    }

    Aluno *aux = ls->primeiro;
    for (int i = 0; i < pos - 1; i++) {
        aux = aux->proximo;
    }

    novo->proximo = aux->proximo;
    aux->proximo = novo;
    ls->n_elementos++;
    printf("\n\t Elemento %s inserido na posição %d com sucesso!!!", novo->nome, pos);
}


Aluno* removeNoInicio(LSE *ls){
    """Remove e retorna o primeiro elemento da lista""";
    Aluno *aux = ls->primeiro;
    if(aux == NULL)
        printf("\n\t Erro - Lista Vazia!!");
    else{
        ls->primeiro = aux->proximo;
        aux->proximo = NULL;
        ls->n_elementos--;
    }
    return aux;
}

//Remove um novo aluno no final da lista;
Aluno* removeNoFim(LSE *ls) {
    if (ls->primeiro == NULL) {
        printf("\n\t Não há elemento para ser excluído!!");
        return NULL;
    }

    Aluno *aux = ls->primeiro;
    Aluno *anterior = NULL;

    while (aux->proximo != NULL) {
        anterior = aux;
        aux = aux->proximo;
    }

    if (anterior == NULL) {  
        ls->primeiro = NULL;
    } else {
        anterior->proximo = NULL;
    }

    ls->n_elementos--;
    return aux;
}

//Remove o aluno na turma na posicao "pos";
Aluno* removeNaPosicao(LSE *ls, int pos) {
    if (pos < 0 || pos >= ls->n_elementos) {
        printf("\n\t Não há elemento para ser excluído na posição %d!!", pos);
        return NULL;
    }

    Aluno *aux = ls->primeiro;
    Aluno *anterior = NULL;

    if (pos == 0) {
        ls->primeiro = aux->proximo;
    } else {
        for (int i = 0; i < pos; i++) {
            anterior = aux;
            aux = aux->proximo;
        }
        anterior->proximo = aux->proximo;
    }

    aux->proximo = NULL;
    ls->n_elementos--;
    return aux;
}

//retorna a quantidade de elementos da Lista
int retornaQuantidade(LSE *ls) {
    return ls->n_elementos;
}

//Mostra as informações do aluno que está na Posicao "pos"
void mostraPosicao(LSE *ls, int pos) {
    if (pos < 0 || pos >= ls->n_elementos) {
        printf("\n\t Não há aluno na posição %d!!", pos);
        return;
    }

    Aluno *aux = ls->primeiro;
    for (int i = 0; i < pos; i++) {
        aux = aux->proximo;
    }

    mostraAluno(aux);
}

//Apaga todos os alunos da Lista (free em cada aluno)
void apagaLista(LSE *ls) {
    Aluno *aux = ls->primeiro;
    Aluno *temp;

    while (aux != NULL) {
        temp = aux->proximo;
        free(aux);
        aux = temp;
    }

    ls->primeiro = NULL;
    ls->n_elementos = 0;

    printf("\n\t Todos os alunos foram apagados da lista!");
}


void menuTesteLista(LSE *lse){
    int op = 0, posicao = 0;
    Aluno *aux = NULL;
    printf("\n Menu de operações sobre um LSE:\n");
    printf("\n\t 1 - Insere no Início:");
    printf("\n\t 2 - Insere no Fim:");
    printf("\n\t 3 - Insere na Posição:");
    printf("\n\t 4 - Remove no Início:");
    printf("\n\t 5 - Remove no Fim:");
    printf("\n\t 6 - Remove na Posição:");
    printf("\n\t 7 - Mostra Lista:");
    printf("\n\t 8 - Mostra Aluno na Posicao:");
    printf("\n\t 9 - Apaga Lista:");
    printf("\n\t 0 - Para Sair da Função Menu:");
    printf("\n\t Informe a opção:");
    scanf("%d",&op);
    switch (op) {
        case 1:
            printf("\n\t Função Insere no Início!!");
            insereNoInicio(lse,lerAluno());
        break;
        case 2:
            printf("\n\t Função Insere no Fim!!");
            insereNoFim(lse,lerAluno());
        break;
        case 3:
            printf("\n\t Função Insere na Posição!!");
            printf("\n\t\t Informe a posição:");
            scanf("%d",&posicao);
            insereNaPosicao(lse,lerAluno(),posicao);
        break;
        case 4:
            printf("\n\t Função remove  no Início:");
            aux = removeNoInicio(lse);
            if(aux != NULL){
                mostraAluno(aux);
                free(aux);
            }
        break;
        case 5:
            printf("\n\t Função remove  no FIM:");
            aux = removeNoFim(lse);
            free(aux);
        break;
        case 6:
            printf("\n\t Função Remove na Posição!!");
            printf("\n\t\t Informe a posição:");
            scanf("%d",&posicao);
            removeNaPosicao(lse,posicao);
        break;
        case 7:
            printf("\n\n Mostra Lista %s!!!",lse->turma);
            mostraLista(lse);
        break;
        case 8:
            printf("\n\t Função Mostra um Aluno na Posicao - Pos!!");
            printf("\n\t\t Informe a posição:");
            scanf("%d",&posicao);
            mostraPosicao(lse,posicao);
        break;
        case 9:
            printf("\n\t Função Apaga toda Lista!");
            apagaLista(lse);
        break;
        case 0:
            printf("\n\n *** Fim do Programa!!! ***\n");
            break;
        break;        
        default:
            printf("\n\n *** Opção Inválida!!! ***\n");
    }
    if(op > 0 && op < 10)
        menuTesteLista(lse);
}


//trocar de turma de Portugues para Matematica o aluno com pos selecionado pelo usuário
void trocaTurmaPorMat(LSE *lmatematica, LSE *lportugues) {
    int posicao;
    Aluno *alunoRemovido;

    printf("\n\t Trocar um aluno da turma de Portugues para turma de Matematica");
    printf("\n\t Informe a posição do aluno:");
    scanf("%d", &posicao);

    if (posicao < 0 || posicao >= lportugues->n_elementos) {
        printf("\n\t Posição inválida! Não há aluno para ser trocado na posição %d.", posicao);
        return;
    }

    if (posicao == 0) {
        alunoRemovido = removeNoInicio(lportugues);
    } else if (posicao == lportugues->n_elementos - 1) {
        alunoRemovido = removeNoFim(lportugues);
    } else {
        alunoRemovido = removeNaPosicao(lportugues, posicao);
    }

    if (alunoRemovido != NULL) {
        insereNoFim(lmatematica, alunoRemovido);
        printf("\n\t Aluno %s trocado de Português para Matemática com sucesso!", alunoRemovido->nome);
    }
}

//trocar de turma de Matematica para Portugues o aluno com pos selecionado pelo usuário
void trocaTurmaMatPor(LSE *lmatematica, LSE *lportugues) {
    int posicao;
    Aluno *alunoRemovido;

    printf("\n\t Trocar um aluno da turma de Matematica para turma de Portugues");
    printf("\n\t Informe a posição do aluno:");
    scanf("%d", &posicao);

    if (posicao < 0 || posicao >= lmatematica->n_elementos) {
        printf("\n\t Posição inválida! Não há aluno para ser trocado na posição %d.", posicao);
        return;
    }

    if (posicao == 0) {
        alunoRemovido = removeNoInicio(lmatematica);
    } else if (posicao == lmatematica->n_elementos - 1) {
        alunoRemovido = removeNoFim(lmatematica);
    } else {
        alunoRemovido = removeNaPosicao(lmatematica, posicao);
    }

    if (alunoRemovido != NULL) {
        insereNoFim(lportugues, alunoRemovido);
        printf("\n\t Aluno %s trocado de Matemática para Português com sucesso!", alunoRemovido->nome);
    }
}

//Mostrar as turmas de Portugues para Matematica 
void mostrarTurmaPorMat(LSE *lmatematica, LSE *lportugues){
    printf("\n\t Mostrar as listas das turmas de Portugues e Matematica");
    mostraLista(lmatematica);
    mostraLista(lportugues);
}


void menuTrocaTurmas(LSE *lmatematica, LSE *lportugues){
    int op = 0, posicao = 0;
    Aluno *aux = NULL;
    printf("\n Menu de operações Troca Turmas:\n");
    printf("\n Escolha um Opção:");
    printf("\n\t 1 - Trocar um aluno de Portugues para Matematica:");
    printf("\n\t 2 - Trocar um aluno de Matemática para Portugues:");
    printf("\n\t 3 - Mostrar as Turmas de Portugues e Matematica:");
    printf("\n\t 0 - Para Sair do Programa:");
    printf("\n\t Informe a opção:");
    scanf("%d",&op);
    switch (op) {
            case 1:
                //trocar de turma de Portugues para Matematica o aluno com nome selecionado pelo usuário
                trocaTurmaPorMat(lmatematica,lportugues);
            break;
            case 2:
                //trocar de turma de Matematica para Portugues o aluno com nome selecionado pelo usuário
                trocaTurmaMatPor(lmatematica,lportugues);
            break;
            case 3:
                //Mostrar as turmas de Portugues para Matematica 
                mostrarTurmaPorMat(lmatematica,lportugues);
            break;
            case 0:
            printf("\n\n *** Fim do Programa!!! ***\n");
        break;        
        default:
            printf("\n\n *** Opção Inválida!!! ***\n");
    }
    if(op > 0 && op < 4)
        menuTrocaTurmas(lmatematica,lportugues);
}

//Programa lista de alunos de matemática

int main(){

    system("clear");
    //cria a lista de alunos de matemática 
    LSE *listaMatematica = criaListaLSE("Matematica");

    //cria o elemento de LSE chamado pedro
    Aluno *pedro = cadastraAluno("Pedro",44,1123301);

    //insere no inicio um novo aluno na lista de matemática
    insereNoInicio(listaMatematica,pedro);

    Aluno *novo = cadastraAluno("Joao",24,1123321);
    insereNoInicio(listaMatematica,novo);
 
    mostraLista(listaMatematica);
    printf("\n");

    //Primeira parte da atividade funções de lista

    menuTesteLista(listaMatematica);

    //segunda parte da atividade - Troca de turmas

    LSE *listaPortugues = criaListaLSE("Portugues");
    menuTrocaTurmas(listaMatematica, listaPortugues);
}
