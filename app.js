"use strict";
class Tarefa {
    titulo;
    descricao;
    dataLimite;
    concluida;
    constructor(titulo, descricao, dataLimite) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataLimite = dataLimite ? dataLimite : null;
        this.concluida = false;
    }
    renderizar() {
        const li = document.createElement('li');
        li.className = 'tarefa-card';
        let exibicaoDataLimite = '';
        if (this.dataLimite) {
            const [ano, mes, dia] = this.dataLimite.split('-');
            exibicaoDataLimite = `<small class="alerta-data">${dia}/${mes}/${ano}</small>`;
        }
        li.innerHTML = `
            <div class="tarefa-conteudo">
                <div>
                    <h3>${this.titulo}</h3>
                    ${this.descricao ? `<p>${this.descricao}</p>` : ''}
                    ${exibicaoDataLimite}
                </div>
                <button class="delete-btn" title="Excluir tarefa">✕</button>
            </div>
            <label style="margin-top: 15px; display: block;">
                <input type="checkbox" class="status-checkbox"> Concluída
            </label>
        `;
        const checkbox = li.querySelector('.status-checkbox');
        checkbox.addEventListener('change', () => {
            this.concluida = checkbox.checked;
            if (this.concluida) {
                li.classList.add('concluida');
            }
            else {
                li.classList.remove('concluida');
            }
        });
        const btnDeletar = li.querySelector('.delete-btn');
        btnDeletar.addEventListener('click', () => {
            li.remove();
        });
        return li;
    }
}
const btnAdicionar = document.getElementById('addBtn');
const inputTitulo = document.getElementById('tituloInput');
const inputDescricao = document.getElementById('descricaoInput');
const inputDataLimite = document.getElementById('dataLimiteInput');
const listaTarefas = document.getElementById('listaTarefas');
btnAdicionar.addEventListener('click', () => {
    const titulo = inputTitulo.value.trim();
    const descricao = inputDescricao.value.trim();
    const dataLimite = inputDataLimite.value;
    if (titulo === "") {
        alert("Por favor, digite um título para a tarefa!");
        return;
    }
    const novaTarefa = new Tarefa(titulo, descricao, dataLimite);
    listaTarefas.appendChild(novaTarefa.renderizar());
    inputTitulo.value = "";
    inputDescricao.value = "";
    inputDataLimite.value = "";
});
