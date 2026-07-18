document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Ação do Botão CTA (Ação exigida no enunciado)
    const btnCta = document.getElementById("btn-cta");
    btnCta.addEventListener("click", () => {
        document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            alert("Ótima escolha! Preencha o formulário para garantir sua vaga na mentoria.");
        }, 600);
    });

    // 2. Consumo da API ViaCep (Busca Automática por CEP)
    const inputCep = document.getElementById("cep");
    const inputCidade = document.getElementById("cidade");
    const inputEstado = document.getElementById("estado");

    inputCep.addEventListener("blur", () => {
        let cep = inputCep.value.replace(/\D/g, "");

        if (cep.length === 8) {
            inputCidade.value = "Buscando...";
            inputEstado.value = "...";

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        alert("CEP não encontrado.");
                        inputCidade.value = "";
                        inputEstado.value = "";
                    } else {
                        inputCidade.value = data.localidade;
                        inputEstado.value = data.uf;
                    }
                })
                .catch(() => {
                    alert("Erro ao buscar o CEP.");
                    inputCidade.value = "";
                    inputEstado.value = "";
                });
        }
    });

    // 3. Envio do Formulário de Contato com Agradecimento
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        alert(`Obrigado pelo contato, ${nome}! Seus dados foram salvos com sucesso na branch develop.`);
        form.reset();
    });
});