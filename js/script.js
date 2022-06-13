//adicionando os elementos do HTML com DOM
const textoOperacaoAnterior = document.querySelector("#operacao-anterior")
const textoOperacaoAtual = document.querySelector("#operacao-atual")
const botoes = document.querySelectorAll("#caixa-botoes button")


//criando a classe responsável por rodar a calculadora
class Calculator{
    constructor(textoOperacaoAnterior, textoOperacaoAtual){
        this.textoOperacaoAnterior = textoOperacaoAnterior;
        this.textoOperacaoAtual = textoOperacaoAtual;
        this.operacaoAtual = "";
    }

    adicionarDigito(digito){

        //checar se já existe um '.'ponto na tela para impedir que seja colocado outros. só deve haver um ponto na tela. repesentando assim um número flutuante ou quebrado.
        if(digito === '.' && this.textoOperacaoAtual.innerText.includes('.')){
            return;
        }


        //insere o número clicado no visor da calculadora
        this.operacaoAtual = digito;
        this.atualizaTela()
    }
    
    //metodo para realizar os calculos
    processoOperacao(operacao){


        //metodo para validar se o valor atual está vazio ou não
        if(this.textoOperacaoAtual.innerText === "" && operacao !=="C"){ //se o valor atual é vazio não tenho acesso ao operadores
            if(this.textoOperacaoAnterior.innerText !== ""){//caso não exista valor anterior isso também tira o acesso dos operadores
                // permite a mudança de operação
                this.mudarOperador(operacao);
            }
            return;
        }

        //pegar valor atual e valor anterior
        let operacaoValor;
        const anterior = +this.textoOperacaoAnterior.innerText.split(" ")[0]; //conversão numerica // split para pegar o numero e realizar a operação com o indice de número 0
        const atual = +this.textoOperacaoAtual.innerText; // conversão numerica

        switch(operacao){
            case "+":
                operacaoValor = anterior + atual;
                this.atualizaTela(operacaoValor, operacao, atual, anterior);
                break;
            case "-":
                operacaoValor = anterior - atual;
                this.atualizaTela(operacaoValor, operacao, atual, anterior);
                break;
            case "x":
                operacaoValor = anterior * atual;
                this.atualizaTela(operacaoValor, operacao, atual, anterior);
                break;
            case "/":
                operacaoValor = anterior / atual;
                this.atualizaTela(operacaoValor, operacao, atual, anterior);
                break;
            case "DEL":
                this.processoDelete();
                break;
            case "CE":
                this.processoLimpaOperacaoAtual();
                break;
            case "C":
                this.processoLimpaTodo();
                break;
            case "=":
                this.processoOperadorIgual();
                break;
            default:
                return;
        }
    }

    //metodo que atualiza o visor esse metodo também permite que seja adicionado mais de um número no visor ao mesmo tempo
    atualizaTela(operacaoValor = null, operacao = null, anterior = null, atual = null){
        if(operacaoValor === null){ // dessa forma caso seja a primeira operação ele só vai mostrar o número na tela
            this.textoOperacaoAtual.innerText += this.operacaoAtual;

        } else {
            if(anterior === 0){
                operacaoValor = atual;
            }
            //adicionar o valor para cima
            this.textoOperacaoAnterior.innerText = String(operacaoValor + " " + operacao);
            this.textoOperacaoAtual.innerText = "";
        }    
    }

    //metodo para mudar o operador da conta sem que a calculadora realize o calculo no momento desta mudança
    mudarOperador(operacao){
        const operadoresMatematicos = ["x", "/", "+", "-"];

        if(!operadoresMatematicos.includes(operacao)){ //impede de realizar operações com valores que não sejam os operadores matematicos
            return
        }

        this.textoOperacaoAnterior.innerText = this.textoOperacaoAnterior.innerText.slice(0, -1) + operacao;
    }

    //metodo para deletar um digito
    processoDelete(){
        this.textoOperacaoAtual.innerText = this.textoOperacaoAtual.innerText.slice(0, -1);
    }

    //metodo para limpar o processo atual de conta
    processoLimpaOperacaoAtual(){
        this.textoOperacaoAtual.innerText = "";
    }

    //metodo para limpar toda a operação e reinicar a calculadora
    processoLimpaTodo(){
        this.textoOperacaoAnterior.innerText = "";
        this.textoOperacaoAtual.innerText = "";
    }

    //metodo para mostrar o resultado quando precionado o '='
    processoOperadorIgual(){
        const operacao = textoOperacaoAnterior.innerText.split(" ")[1];

        this.processoOperacao(operacao);
    }

    
}


//chamando uma nova operação na calculadora
const calculo = new Calculator(textoOperacaoAnterior, textoOperacaoAtual);


//acessando os valores dos botões para saber se é um número ou uma operação matemática
botoes.forEach((btn)=>{
    btn.addEventListener("click", (e) =>{
        const valor = e.target.innerText;

        if(+valor >=0 || valor === "."){
            calculo.adicionarDigito(valor);
        }else{
            calculo.processoOperacao(valor)
        }
    });
});