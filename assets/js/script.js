const efeitos = document.querySelectorAll(".effect");
let windowHeight = window.innerHeight;

function animateObjects() {
    efeitos.forEach((efeito) => {
      let bounding = efeito.getBoundingClientRect();
      if (bounding.top < windowHeight) {
        efeito.classList.add("slider-h");
      } else if (bounding.bottom < 0 ) {
        efeito.classList.add("slider-h");
      } else {
        efeito.classList.remove("slider-h");
      }
    });
}

document.addEventListener("scroll", function () {
    animateObjects();
    document.removeEventListener("scroll", this);
});


window.addEventListener("resize", function () {
    windowHeight = window.innerHeight;
    window.removeEventListener("resize", this);
});


/*******/

function formatarMoeda() {
  var elemento = document.getElementById('faturamento');
  var valor = elemento.value;

  valor = valor + '';
  valor = parseInt(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  elemento.value = valor;
  if(valor == 'NaN') elemento.value = '';
}


const btn = document.getElementById('botao-calculadora');
btn.addEventListener('click', () =>{
  
  var faturamentoparser = document.getElementById('faturamento').value.replace('.','').replace(',','.')
  const faturamentomensal = parseFloat(faturamentoparser);
  
  var faturamentoanual = faturamentomensal * parseFloat(12);

  if (faturamentoanual >= 4800000){

    var resultado = document.getElementById('resultado-calculadora');
    resultado.innerHTML = `<img class=\'img-fluid mt-2 mb-2\' src=\'assets\/images\/x.png\'>
                        <p>DE ACORDO COM O VALOR INFORMADO SUA EMPRESA NÃO SE ENQUADRA NO SIMPLES NACIONAL.<\/p>`;
  
    resultado.classList.remove("hide-resultado");
    resultado.classList.remove("mj-ft-azul");
    resultado.classList.add("show-resultado");
    resultado.classList.add("mj-ft-vermelho");

  }else{

    const tipoempresa = parseInt(document.getElementById('tipoempresa').value);
    const segmento = parseInt(document.getElementById('segmento').value);

    const aliquota = 0.34;
    const periododeapuracao = 60;
    const economiamensal = parseFloat(aliquota * faturamentomensal);
    const creditoapurado = parseFloat(periododeapuracao * economiamensal);


    function valorparser(valor){
      valor = valor + '';
      valor = parseInt(valor.replace(/[\D]+/g, ''));
      valor = valor + '';
      valor = valor.replace(/([0-9]{2})$/g, ",$1");

      if (valor.length > 6) {
          valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      }

      return valor;
    }

    var creditoapuradoprint = valorparser(creditoapurado.toFixed(2));
    var economiamensalprint = valorparser(economiamensal.toFixed(2));

    var resultado = document.getElementById('resultado-calculadora');
    resultado.innerHTML = `<img class=\'img-fluid mt-2 mb-2\' src=\'assets\/images\/de-dinheiro.png\'>
                          <p>CRÉDITO TOTAL APURADO R$ ${creditoapuradoprint} <\/p> 
                          <p>ECONOMIA MENSAL R$ ${economiamensalprint}<\/p>
                          <span class=\'fs-6 fw-light\'>OS VALORES SÃO ESTIMADOS COM BASE NO SEGMENTO DE ATUAÇÃO E FATURAMENTO, 
                          O VALOR REAL SERÁ APURADO APÓS ANÁLISE DETALHADA.</span>`;
    

    resultado.classList.remove("hide-resultado");
    resultado.classList.remove("mj-ft-vermelho");
    resultado.classList.add("show-resultado");
    resultado.classList.add("mj-ft-azul");

  }
  
});