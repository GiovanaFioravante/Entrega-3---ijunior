class Tarefa {
    titulo: string;
    descricao: string;
    dataLimite: string | null;
    concluida: boolean;

    constructor(titulo: string, descricao: string, dataLimite: string) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataLimite = dataLimite ? dataLimite : null;
        this.concluida = false;
    }

    renderizar(): HTMLLIElement {
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

        const checkbox = li.querySelector('.status-checkbox') as HTMLInputElement;
        checkbox.addEventListener('change', () => {
            this.concluida = checkbox.checked;
            if (this.concluida) {
                li.classList.add('concluida');
            } else {
                li.classList.remove('concluida');
            }
        });

        const btnDeletar = li.querySelector('.delete-btn') as HTMLButtonElement;
        btnDeletar.addEventListener('click', () => {
            li.remove();
        });

        return li;
    }
}

const btnAdicionar = document.getElementById('addBtn') as HTMLButtonElement;
const inputTitulo = document.getElementById('tituloInput') as HTMLInputElement;
const inputDescricao = document.getElementById('descricaoInput') as HTMLInputElement;
const inputDataLimite = document.getElementById('dataLimiteInput') as HTMLInputElement;
const listaTarefas = document.getElementById('listaTarefas') as HTMLUListElement;

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