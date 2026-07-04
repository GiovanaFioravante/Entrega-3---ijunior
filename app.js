"use strict";
class Tarefa {
    titulo;
    descricao;
    dataCriacao;
    concluida;
    constructor(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataCriacao = new Date();
        this.concluida = false; //toda tarefa começa aberta
    }
    renderizar() {
        const li = document.createElement('li');
        li.className = 'tarefa-card';
        const dataFormatada = this.dataCriacao.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        li.innerHTML = `
            <div>
                <h3>${this.titulo}</h3>
                ${this.descricao ? `<p>${this.descricao}</p>` : ''}
                <small>📅 Criada em: ${dataFormatada}</small>
            </div>
            <label style="margin-top: 10px; display: block;">
                <input type="checkbox" class="status-checkbox"> Concluída
            </label>
        `;
        const checkbox = li.querySelector('.status-checkbox');
        checkbox.addEventListener('change', () => {
            this.concluida = checkbox.checked;
            // Se tiver marcada, adiciona a classe CSS '.concluida', se não, remove
            if (this.concluida) {
                li.classList.add('concluida');
            }
            else {
                li.classList.remove('concluida');
            }
        });
        return li;
    }
}
const btnAdicionar = document.getElementById('addBtn');
const inputTitulo = document.getElementById('tituloInput');
const inputDescricao = document.getElementById('descricaoInput');
const listaTarefas = document.getElementById('listaTarefas');
// Escutando o clique do botão
btnAdicionar.addEventListener('click', () => {
    const titulo = inputTitulo.value.trim();
    const descricao = inputDescricao.value.trim();
    // Validação básica: não deixa criar tarefa sem título
    if (titulo === "") {
        alert("Por favor, digite um título para a tarefa!");
        return;
    }
    // 1. Instancia uma nova Tarefa usando a nossa Classe (POO)
    const novaTarefa = new Tarefa(titulo, descricao);
    // 2. Renderiza o HTML dela e adiciona na lista da tela (DOM)
    listaTarefas.appendChild(novaTarefa.renderizar());
    // 3. Limpa os campos de input para a próxima tarefa
    inputTitulo.value = "";
    inputDescricao.value = "";
});
