#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_DISCOS 4
#define NUM_CORES 4
#define DISCOS_POR_COR 3
#define TOTAL_DISCOS (NUM_CORES * DISCOS_POR_COR)

typedef struct Disco {
    int cor;
    struct Disco *proximo;
} Disco;

typedef struct Pilha {
    Disco *topo;
    int qtd;
} Pilha;

Pilha* criaPilha() {
    Pilha *p = (Pilha *)malloc(sizeof(Pilha));
    p->topo = NULL;
    p->qtd = 0;
    return p;
}

Disco* criaDisco(int cor) {
    Disco *d = (Disco *)malloc(sizeof(Disco));
    d->cor = cor;
    d->proximo = NULL;
    return d;
}

void push(Pilha *p, Disco *d) {
    if (p->qtd < MAX_DISCOS) {
        d->proximo = p->topo;
        p->topo = d;
        p->qtd++;
    } else {
        printf("Pilha cheia!\n");
        free(d);
    }
}

Disco* pop(Pilha *p) {
    if (p->topo != NULL) {
        Disco *d = p->topo;
        p->topo = p->topo->proximo;
        p->qtd--;
        return d;
    } else {
        printf("Pilha vazia!\n");
        return NULL;
    }
}

void mostraPilha(Pilha *p, int num_pilha) {
    printf("Pilha %d: ", num_pilha);
    Disco *atual = p->topo;
    while (atual != NULL) {
        printf("%d ", atual->cor);
        atual = atual->proximo;
    }
    printf("\n");
}

void inicializaJogo(Pilha *p1, Pilha *p2, Pilha *p3, Pilha *p4) {
    int cores[TOTAL_DISCOS];
    int i, j, rnd;
    
    srand(time(NULL));

    for (i = 0; i < NUM_CORES; i++) {
        for (j = 0; j < DISCOS_POR_COR; j++) {
            cores[i * DISCOS_POR_COR + j] = i + 1;
        }
    }

    for (i = 0; i < TOTAL_DISCOS; i++) {
        rnd = rand() % TOTAL_DISCOS;
        int temp = cores[i];
        cores[i] = cores[rnd];
        cores[rnd] = temp;
    }

    for (i = 0; i < TOTAL_DISCOS; i++) {
        Pilha *pilha_selecionada;
        do {
            rnd = rand() % 4;
            switch (rnd) {
                case 0: pilha_selecionada = p1; break;
                case 1: pilha_selecionada = p2; break;
                case 2: pilha_selecionada = p3; break;
                case 3: pilha_selecionada = p4; break;
            }
        } while (pilha_selecionada->qtd >= MAX_DISCOS);
        
        push(pilha_selecionada, criaDisco(cores[i]));
    }

    mostraPilha(p1, 1);
    mostraPilha(p2, 2);
    mostraPilha(p3, 3);
    mostraPilha(p4, 4);
}

void jogar(int dificuldade) {
    Pilha *p1 = criaPilha();
    Pilha *p2 = criaPilha();
    Pilha *p3 = criaPilha();
    Pilha *p4 = criaPilha();
    Pilha *temp1 = NULL, *temp2 = NULL;

    if (dificuldade == 1) {
        temp1 = criaPilha();
        temp2 = criaPilha();
    } else if (dificuldade == 2) {
        temp1 = criaPilha();
    }

    inicializaJogo(p1, p2, p3, p4);

    time_t start_time, end_time;
    double elapsed_time;

    time(&start_time); 

    int acao, origem, destino;
    Pilha *pilhas[] = {p1, p2, p3, p4};

    while (1) {
        printf("\nEscolha uma ação:\n");
        printf("1. Mover disco entre pilhas\n");
        if (temp1) printf("2. Mover disco entre pilha e temporário 1\n");
        if (temp2) printf("3. Mover disco entre pilha e temporário 2\n");
        printf("0. Sair\n");
        scanf("%d", &acao);

        if (acao == 0) break;

        if (acao == 1) {
            printf("Escolha a pilha de origem (1-4): ");
            scanf("%d", &origem);
            printf("Escolha a pilha de destino (1-4): ");
            scanf("%d", &destino);

            if (origem >= 1 && origem <= 4 && destino >= 1 && destino <= 4) {
                Disco *d = pop(pilhas[origem - 1]);
                if (d != NULL) {
                    if (pilhas[destino - 1]->qtd < MAX_DISCOS) {
                        push(pilhas[destino - 1], d);
                    } else {
                        printf("Pilha de destino cheia!\n");
                        push(pilhas[origem - 1], d); // Coloca de volta na pilha de origem
                    }
                }
            } else {
                printf("Pilhas inválidas!\n");
            }
        } else if (acao == 2 && temp1) {
            printf("Escolha:\n1. Mover de pilha para temporário 1\n2. Mover de temporário 1 para pilha\n");
            int escolha;
            scanf("%d", &escolha);
            if (escolha == 1) {
                printf("Escolha a pilha de origem (1-4): ");
                scanf("%d", &origem);
                if (origem >= 1 && origem <= 4) {
                    Disco *d = pop(pilhas[origem - 1]);
                    if (d != NULL) {
                        if (temp1->qtd < 1) {
                            push(temp1, d);
                        } else {
                            printf("Temporário 1 cheio!\n");
                            push(pilhas[origem - 1], d); // Coloca de volta na pilha de origem
                        }
                    }
                }
            } else if (escolha == 2) {
                printf("Escolha a pilha de destino (1-4): ");
                scanf("%d", &destino);
                if (destino >= 1 && destino <= 4) {
                    Disco *d = pop(temp1);
                    if (d != NULL) {
                        if (pilhas[destino - 1]->qtd < MAX_DISCOS) {
                            push(pilhas[destino - 1], d);
                        } else {
                            printf("Pilha de destino cheia!\n");
                            push(temp1, d); // Coloca de volta no temporário 1
                        }
                    }
                }
            }
        } else if (acao == 3 && temp2) {
            printf("Escolha:\n1. Mover de pilha para temporário 2\n2. Mover de temporário 2 para pilha\n");
            int escolha;
            scanf("%d", &escolha);
            if (escolha == 1) {
                printf("Escolha a pilha de origem (1-4): ");
                scanf("%d", &origem);
                if (origem >= 1 && origem <= 4) {
                    Disco *d = pop(pilhas[origem - 1]);
                    if (d != NULL) {
                        if (temp2->qtd < 1) {
                            push(temp2, d);
                        } else {
                            printf("Temporário 2 cheio!\n");
                            push(pilhas[origem - 1], d); // Coloca de volta na pilha de origem
                        }
                    }
                }
            } else if (escolha == 2) {
                printf("Escolha a pilha de destino (1-4): ");
                scanf("%d", &destino);
                if (destino >= 1 && destino <= 4) {
                    Disco *d = pop(temp2);
                    if (d != NULL) {
                        if (pilhas[destino - 1]->qtd < MAX_DISCOS) {
                            push(pilhas[destino - 1], d);
                        } else {
                            printf("Pilha de destino cheia!\n");
                            push(temp2, d); // Coloca de volta no temporário 2
                        }
                    }
                }
            }
        }

        mostraPilha(p1, 1);
        mostraPilha(p2, 2);
        mostraPilha(p3, 3);
        mostraPilha(p4, 4);
        if (temp1) mostraPilha(temp1, 5);
        if (temp2) mostraPilha(temp2, 6);
    }

    time(&end_time); 
    elapsed_time = difftime(end_time, start_time); 

    printf("Tempo total: %.2f segundos\n", elapsed_time);

    printf("Deseja jogar novamente? (1-Sim, 0-Não): ");
    int jogar_novamente;
    scanf("%d", &jogar_novamente);
    if (jogar_novamente == 1) {
        free(p1);
        free(p2);
        free(p3);
        free(p4);
        if (temp1) free(temp1);
        if (temp2) free(temp2);
        main(); 
    } else {
        free(p1);
        free(p2);
        free(p3);
        free(p4);
        if (temp1) free(temp1);
        if (temp2) free(temp2);
    }
}

int main() {
    int dificuldade;

    printf("Escolha a dificuldade:\n");
    printf("1. Fácil (2 temporários)\n");
    printf("2. Médio (1 temporário)\n");
    printf("3. Difícil (sem temporários)\n");
    scanf("%d", &dificuldade);

    jogar(dificuldade);

    return 0;
}
