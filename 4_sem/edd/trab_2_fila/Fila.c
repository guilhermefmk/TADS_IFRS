#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct cliente {
    char nome[20];
    int operacao;
    float valor;
    int id;
    struct cliente *proximo;
} Cliente;

typedef struct fila {
    Cliente *inicio;
    Cliente *fim;
    int qtd;
} Fila;

typedef struct banco {
    float saldo;
} Banco;

Fila *criaFila() {
    Fila *fl = (Fila *)malloc(sizeof(Fila));
    fl->inicio = NULL;
    fl->fim = NULL;
    fl->qtd = 0;
    return fl;
}

Cliente *cadastraNovoCliente(char nome[], int op, float vl, int id) {
    Cliente *novo = (Cliente *)malloc(sizeof(Cliente));
    strcpy(novo->nome, nome);
    novo->operacao = op;
    novo->valor = vl;
    novo->proximo = NULL;
    novo->id = id;
    return novo;
}

void enfileirar(Fila *fl, Cliente *cl) {
    if (fl->inicio == NULL) {
        fl->inicio = cl;
    } else {
        fl->fim->proximo = cl;
    }
    cl->proximo = NULL;
    fl->fim = cl;
    fl->qtd++;
}

Cliente *desenfileirar(Fila *fl) {
    Cliente *aux = fl->inicio;
    if (aux == NULL)
        printf("\nFila Vazia\n");
    else {
        fl->inicio = aux->proximo;
        fl->qtd--;
        aux->proximo = NULL;
        if (fl->inicio == NULL)
            fl->fim = NULL;
    }
    return aux;
}

void mostraCliente(Cliente cl) {
    printf("\n Id:%d \n\t Nome: %s \n\t Operacao %d \n\t Valor=%.2f \n", cl.id, cl.nome, cl.operacao, cl.valor);
}

void mostraFila(Fila *fl) {
    printf("\nInício da Fila\n");
    Cliente *aux = fl->inicio;
    while (aux != NULL) {
        mostraCliente(*aux);
        aux = aux->proximo;
    }
    printf("\nFim da Fila\n");
}

void apagaCliente(Cliente *cl) {
    printf("\n Apagado!");
    free(cl);
}

void apagaFila(Fila *fl) {
    Cliente *aux = desenfileirar(fl);
    while (aux != NULL) {
        aux = desenfileirar(fl);
        apagaCliente(aux);
    }
    printf("\nFila Vazia - Qtd = %d\n", fl->qtd);
}

void processarOperacao(Cliente *cl, Banco *banco) {
    switch (cl->operacao) {
        case 1:
            banco->saldo -= cl->valor;
            if (banco->saldo < 0) {
                printf("\nSaldo negativo no caixa. Solicitando mais dinheiro ao gerente...\n");
                banco->saldo += 1000.0;
            }
            break;
        case 2:
            banco->saldo += cl->valor;
            break;
        case 3:
            printf("\nProcessando empréstimo com o gerente...\n");
            break;
        case 4:
            printf("\nProcessando aplicação com o gerente...\n");
            break;
        default:
            printf("\nOperação desconhecida.\n");
            break;
    }
}

void chamarCliente(Fila *filaPrioritario, Fila *filaGeral, Fila *log, Banco *banco, const char *recurso) {
    Cliente *cl = NULL;

    if (filaPrioritario->inicio != NULL) {
        cl = desenfileirar(filaPrioritario);
        printf("\nAtendendo cliente prioritário do %s: ", recurso);
    } else if (filaGeral->inicio != NULL) {
        cl = desenfileirar(filaGeral);
        printf("\nAtendendo cliente geral do %s: ", recurso);
    }

    if (cl != NULL) {
        mostraCliente(*cl);
        processarOperacao(cl, banco);
        enfileirar(log, cl);
    } else {
        printf("\nNenhum cliente na fila.\n");
    }
}

void removerCliente(Fila *filaCaixaGeral, Fila *filaCaixaPrioritario, Fila *filaGerenteGeral, Fila *filaGerentePrioritario) {
    int fila, id;
    printf("Informe a fila (1-Caixa Geral, 2-Caixa Prioritário, 3-Gerente Geral, 4-Gerente Prioritário): ");
    scanf("%d", &fila);
    Fila *filaEscolhida = NULL;

    switch (fila) {
        case 1: filaEscolhida = filaCaixaGeral; break;
        case 2: filaEscolhida = filaCaixaPrioritario; break;
        case 3: filaEscolhida = filaGerenteGeral; break;
        case 4: filaEscolhida = filaGerentePrioritario; break;
        default: printf("Opção inválida.\n"); return;
    }

    if (filaEscolhida->inicio == NULL) {
        printf("Fila vazia ou inexistente.\n");
        return;
    }

    mostraFila(filaEscolhida);
    printf("Informe o ID do cliente a ser removido: ");
    scanf("%d", &id);

    Cliente *anterior = NULL, *atual = filaEscolhida->inicio;

    while (atual != NULL && atual->id != id) {
        anterior = atual;
        atual = atual->proximo;
    }

    if (atual == NULL) {
        printf("Cliente não encontrado.\n");
    } else {
        if (anterior == NULL) {
            filaEscolhida->inicio = atual->proximo;
        } else {
            anterior->proximo = atual->proximo;
        }
        if (atual == filaEscolhida->fim) {
            filaEscolhida->fim = anterior;
        }
        filaEscolhida->qtd--;
        apagaCliente(atual);
        printf("Cliente removido com sucesso.\n");
    }
}
void menu(Fila *filaCaixaGeral, Fila *filaCaixaPrioritario, Fila *filaGerenteGeral, Fila *filaGerentePrioritario, Fila *logCaixa, Fila *logGerente, Banco *banco, int *id) {
    int op;
    char nome[20];
    int operacao;
    float valor;
    int recurso;
    int prioridade;

    do {
        printf("\n\nInforme uma Opção:");
        printf("\n -- 1 - para Insere:");
        printf("\n -- 2 - para Chamar Cliente:");
        printf("\n -- 3 - Mostra Fila:");
        printf("\n -- 4 - Apaga Fila:");
        printf("\n -- 5 - Remove Cliente:");
        printf("\n -- 0 - para Sair do Programa:\n");
        printf("\nInforme sua Opção:");
        scanf("%d", &op);
        fflush(stdin);

        switch (op) {
            case 1:
                printf("\n Função Insere na Fila. \n");
                printf("Informe o seu nome:");
                scanf("%s", nome);
                printf("Informe o tipo de atendimento (1- Caixa -> Saque e depósito, 2- Gerente -> Empréstimo e aplicação):");
                scanf("%d", &recurso);

                if (recurso == 1) {
                    printf("Informe a operação (1-Saque, 2-Depósito):");
                    scanf("%d", &operacao);
                    if (operacao != 1 && operacao != 2) {
                        printf("Operação inválida para Caixa. Tente novamente.\n");
                        break;
                    }
                    printf("Informe o Valor:");
                    scanf("%f", &valor);
                } else if (recurso == 2) {
                    printf("Informe a operação (3-Empréstimo, 4-Aplicação):");
                    scanf("%d", &operacao);
                    if (operacao != 3 && operacao != 4) {
                        printf("Operação inválida para Gerente. Tente novamente.\n");
                        break;
                    }
                    valor = 0.0;
                } else {
                    printf("Tipo de atendimento inválido. Tente novamente.\n");
                    break;
                }

                printf("Informe a prioridade (1-Prioritário, 0-Geral):");
                scanf("%d", &prioridade);

                Cliente *novoCliente = cadastraNovoCliente(nome, operacao, valor, (*id)++);
                if (recurso == 1) {
                    if (prioridade == 1) {
                        enfileirar(filaCaixaPrioritario, novoCliente);
                    } else {
                        enfileirar(filaCaixaGeral, novoCliente);
                    }
                } else if (recurso == 2) {
                    if (prioridade == 1) {
                        enfileirar(filaGerentePrioritario, novoCliente);
                    } else {
                        enfileirar(filaGerenteGeral, novoCliente);
                    }
                }
                printf("\n Inserção Realizada com Sucesso");
                break;
            case 2:
                printf("\n Função Chamar Cliente. \n");
                chamarCliente(filaCaixaPrioritario, filaCaixaGeral, logCaixa, banco, "caixa");
                chamarCliente(filaGerentePrioritario, filaGerenteGeral, logGerente, banco, "gerente");
                break;
            case 3:
                printf("Mostra Fila:\n");
                printf("\nFila Caixa Prioritário:");
                mostraFila(filaCaixaPrioritario);
                printf("\nFila Caixa Geral:");
                mostraFila(filaCaixaGeral);
                printf("\nFila Gerente Prioritário:");
                mostraFila(filaGerentePrioritario);
                printf("\nFila Gerente Geral:");
                mostraFila(filaGerenteGeral);
                break;
            case 4:
                printf("\n Apagar a Fila !! \n");
                printf("Informe a fila que deseja apagar (1-Caixa Geral, 2-Caixa Prioritário, 3-Gerente Geral, 4-Gerente Prioritário): ");
                scanf("%d", &recurso);
                switch (recurso) {
                    case 1: apagaFila(filaCaixaGeral); break;
                    case 2: apagaFila(filaCaixaPrioritario); break;
                    case 3: apagaFila(filaGerenteGeral); break;
                    case 4: apagaFila(filaGerentePrioritario); break;
                    default: printf("Opção inválida.\n"); break;
                }
                break;
            case 5:
                printf("\n Remover Cliente da Fila !! \n");
                removerCliente(filaCaixaGeral, filaCaixaPrioritario, filaGerenteGeral, filaGerentePrioritario);
                break;
            default:
                if (op != 0) {
                    printf("\nOpção Inválida!!\n");
                }
                break;
        }
    } while (op > 0);
}


int main() {
    int id = 0;
    Fila *filaCaixaGeral = criaFila();
    Fila *filaCaixaPrioritario = criaFila();
    Fila *filaGerenteGeral = criaFila();
    Fila *filaGerentePrioritario = criaFila();
    Fila *logCaixa = criaFila();
    Fila *logGerente = criaFila();
    Banco banco;
    banco.saldo = 1000.0;

    menu(filaCaixaGeral, filaCaixaPrioritario, filaGerenteGeral, filaGerentePrioritario, logCaixa, logGerente, &banco, &id);

    printf("\nRegistros de atendimento do Caixa:\n");
    mostraFila(logCaixa);

    printf("\nRegistros de atendimento do Gerente:\n");
    mostraFila(logGerente);

    return 0;
}
