#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Definindo constantes para o jogo
#define MAX_DISCOS 4 // Máximo de discos por pilha
#define NUM_CORES 4 // Número de cores diferentes de discos
#define DISCOS_POR_COR 3 // Número de discos por cor
#define TOTAL_DISCOS (NUM_CORES * DISCOS_POR_COR) // Total de discos

// Estrutura que representa um disco
typedef struct Disco {
    int cor; // Cor do disco
    struct Disco *proximo; // Ponteiro para o próximo disco na pilha
} Disco;

// Estrutura que representa uma pilha de discos
typedef struct Pilha {
    Disco *topo; // Ponteiro para o topo da pilha
    int qtd; // Quantidade de discos na pilha
} Pilha;

// Função para criar uma nova pilha
Pilha* criaPilha() {
    Pilha *p = (Pilha *)malloc(sizeof(Pilha)); // Aloca memória para a pilha
    p->topo = NULL; // Inicializa o topo como NULL
    p->qtd = 0; // Inicializa a quantidade de discos como 0
    return p;
}

// Função para criar um novo disco
Disco* criaDisco(int cor) {
    Disco *d = (Disco *)malloc(sizeof(Disco)); // Aloca memória para o disco
    d->cor = cor; // Define a cor do disco
    d->proximo = NULL; // Inicializa o ponteiro proximo como NULL
    return d;
}

// Função para empilhar um disco em uma pilha
void push(Pilha *p, Disco *d) {
    if (p->qtd < MAX_DISCOS) { // Verifica se a pilha não está cheia
        d->proximo = p->topo; // Aponta o proximo do disco para o topo atual
        p->topo = d; // Atualiza o topo da pilha para o novo disco
        p->qtd++; // Incrementa a quantidade de discos na pilha
    } else {
        printf("Pilha cheia!\n"); // Mensagem de erro se a pilha estiver cheia
        free(d); // Libera a memória do disco não usado
    }
}

// Função para desempilhar um disco de uma pilha
Disco* pop(Pilha *p) {
    if (p->topo != NULL) { // Verifica se a pilha não está vazia
        Disco *d = p->topo; // Guarda o topo atual
        p->topo = p->topo->proximo; // Atualiza o topo para o próximo disco
        p->qtd--; // Decrementa a quantidade de discos na pilha
        return d; // Retorna o disco removido
    } else {
        printf("Pilha vazia!\n"); // Mensagem de erro se a pilha estiver vazia
        return NULL; // Retorna NULL se não houver discos para remover
    }
}

// Função para exibir os discos de uma pilha
void mostraPilha(Pilha *p, int num_pilha) {
    printf("Pilha %d: ", num_pilha);
    Disco *atual = p->topo; // Começa do topo da pilha
    while (atual != NULL) { // Percorre todos os discos
        printf("%d ", atual->cor); // Imprime a cor do disco
        atual = atual->proximo; // Vai para o próximo disco
    }
    printf("\n");
}

// Função para inicializar o jogo com discos aleatórios nas pilhas
void inicializaJogo(Pilha *p1, Pilha *p2, Pilha *p3, Pilha *p4) {
    int cores[TOTAL_DISCOS]; // Array para armazenar as cores dos discos
    int i, j, rnd; // Variáveis auxiliares
    
    srand(time(NULL)); // Inicializa o gerador de números aleatórios

    // Preenche o array com as cores
    for (i = 0; i < NUM_CORES; i++) {
        for (j = 0; j < DISCOS_POR_COR; j++) {
            cores[i * DISCOS_POR_COR + j] = i + 1;
        }
    }

    // Embaralha as cores dos discos
    for (i = 0; i < TOTAL_DISCOS; i++) {
        rnd = rand() % TOTAL_DISCOS; // Escolhe um índice aleatório
        int temp = cores[i];
        cores[i] = cores[rnd];
        cores[rnd] = temp;
    }

    // Distribui os discos aleatoriamente entre as pilhas
    for (i = 0; i < TOTAL_DISCOS; i++) {
        Pilha *pilha_selecionada;
        do {
            rnd = rand() % 4; // Escolhe uma pilha aleatória
            switch (rnd) {
                case 0: pilha_selecionada = p1; break;
                case 1: pilha_selecionada = p2; break;
                case 2: pilha_selecionada = p3; break;
                case 3: pilha_selecionada = p4; break;
            }
        } while (pilha_selecionada->qtd >= MAX_DISCOS);
        
        push(pilha_selecionada, criaDisco(cores[i])); // Empilha o disco na pilha selecionada
    }

    // Mostra as pilhas inicializadas
    mostraPilha(p1, 1);
    mostraPilha(p2, 2);
    mostraPilha(p3, 3);
    mostraPilha(p4, 4);
}

// Função principal do jogo
void jogar(int dificuldade) {
    // Cria as quatro pilhas principais do jogo
    Pilha *p1 = criaPilha();
    Pilha *p2 = criaPilha();
    Pilha *p3 = criaPilha();
    Pilha *p4 = criaPilha();
    Pilha *temp1 = NULL, *temp2 = NULL; // Ponteiros para pilhas temporárias

    // Cria pilhas temporárias de acordo com a dificuldade
    if (dificuldade == 1) {
        temp1 = criaPilha();
        temp2 = criaPilha();
    } else if (dificuldade == 2) {
        temp1 = criaPilha();
    }

    // Inicializa o jogo com discos nas pilhas
    inicializaJogo(p1, p2, p3, p4);

    // Variáveis para medir o tempo de jogo
    time_t start_time, end_time;
    double elapsed_time;

    time(&start_time); // Captura o tempo inicial

    int acao, origem, destino; // Variáveis para armazenar a ação do jogador e pilhas escolhidas
    Pilha *pilhas[] = {p1, p2, p3, p4}; // Array de pilhas

    while (1) {
        // Menu de ações para o jogador
        printf("\nEscolha uma ação:\n");
        printf("1. Mover disco entre pilhas\n");
        if (temp1) printf("2. Mover disco entre pilha e temporário 1\n");
        if (temp2) printf("3. Mover disco entre pilha e temporário 2\n");
        printf("0. Sair\n");
        scanf("%d", &acao); // Lê a ação escolhida

        if (acao == 0) break; // Sai do jogo se a ação for 0

        if (acao == 1) {
            // Mover disco entre pilhas
            printf("Escolha a pilha de origem (1-4): ");
            scanf("%d", &origem);
            printf("Escolha a pilha de destino (1-4): ");
            scanf("%d", &destino);

            // Verifica se as pilhas escolhidas são válidas
            if (origem >= 1 && origem <= 4 && destino >= 1 && destino <= 4) {
                Disco *d = pop(pilhas[origem - 1]); // Remove disco da pilha de origem
                if (d != NULL) {
                    // Verifica se a pilha de destino tem espaço
                    if (pilhas[destino - 1]->qtd < MAX_DISCOS) {
                        push(pilhas[destino - 1], d); // Empilha o disco na pilha de destino
                    } else {
                        printf("Pilha de destino cheia!\n");
                        push(pilhas[origem - 1], d); // Recoloca o disco na pilha de origem
                    }
                }
            } else {
                printf("Pilhas inválidas!\n");
            }
        } else if (acao == 2 && temp1) {
            // Mover disco entre pilha e temporário 1
            printf("Escolha:\n1. Mover de pilha para temporário 1\n2. Mover de temporário 1 para pilha\n");
            int escolha;
            scanf("%d", &escolha);
            if (escolha == 1) {
                printf("Escolha a pilha de origem (1-4): ");
                scanf("%d", &origem);
                if (origem >= 1 && origem <= 4) {
                    Disco *d = pop(pilhas[origem - 1]);
                    if (d != NULL) {
                        if (temp1->qtd < 1) { // Temporário 1 só pode ter um disco
                            push(temp1, d);
                        } else {
                            printf("Temporário 1 cheio!\n");
                            push(pilhas[origem - 1], d);
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
                            push(temp1, d);
                        }
                    }
                }
            }
        } else if (acao == 3 && temp2) {
            // Mover disco entre pilha e temporário 2
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
                            push(pilhas[origem - 1], d);
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
                            push(temp2, d);
                        }
                    }
                }
            }
        }

        // Mostra o estado atual das pilhas
        mostraPilha(p1, 1);
        mostraPilha(p2, 2);
        mostraPilha(p3, 3);
        mostraPilha(p4, 4);
        if (temp1) mostraPilha(temp1, 5);
        if (temp2) mostraPilha(temp2, 6);
    }

    time(&end_time); // Captura o tempo final
    elapsed_time = difftime(end_time, start_time); // Calcula o tempo decorrido

    printf("Tempo total: %.2f segundos\n", elapsed_time); // Mostra o tempo total de jogo

    // Pergunta se o jogador quer jogar novamente
    printf("Deseja jogar novamente? (1-Sim, 0-Não): ");
    int jogar_novamente;
    scanf("%d", &jogar_novamente);
    if (jogar_novamente == 1) {
        // Libera memória das pilhas antes de reiniciar o jogo
        free(p1);
        free(p2);
        free(p3);
        free(p4);
        if (temp1) free(temp1);
        if (temp2) free(temp2);
        main(); // Reinicia o jogo chamando a função main
    } else {
        // Libera memória das pilhas antes de terminar o jogo
        free(p1);
        free(p2);
        free(p3);
        free(p4);
        if (temp1) free(temp1);
        if (temp2) free(temp2);
    }
}

// Função principal do programa
int main() {
    int dificuldade; // Variável para armazenar a dificuldade escolhida

    // Exibe o menu de seleção de dificuldade
    printf("Escolha a dificuldade:\n");
    printf("1. Fácil (2 temporários)\n");
    printf("2. Médio (1 temporário)\n");
    printf("3. Difícil (sem temporários)\n");
    scanf("%d", &dificuldade); // Lê a dificuldade escolhida

    jogar(dificuldade); // Inicia o jogo com a dificuldade selecionada

    return 0; // Retorna 0 indicando que o programa terminou com sucesso
}