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

function tempoemtexto() {
  var meses = document.getElementById('pediododeapuracao');
  var elementotempoemtexto = document.getElementById('tempoemtexto');
  var periododeapuracao = parseInt(meses.value);
  if (periododeapuracao < 2){
    elementotempoemtexto.value = '1 mês';
  }

  if (periododeapuracao > 1 && periododeapuracao < 13) {
    elementotempoemtexto.value = `${periododeapuracao} meses`;
  }

  if(periododeapuracao == 12 ){
    elementotempoemtexto.value = `1 ano`;
  }

  if(periododeapuracao > 12 && periododeapuracao < 24){
    elementotempoemtexto.value = `Mais de 1 ano`;
  }

  if(periododeapuracao == 24 ){
    elementotempoemtexto.value = `2 anos`;
  }
  
  if(periododeapuracao > 24 && periododeapuracao < 36){
    elementotempoemtexto.value = `Mais de 2 anos`;
  }
  if(periododeapuracao == 36 ){
    elementotempoemtexto.value = `3 anos`;
  }
  
  if(periododeapuracao > 36 && periododeapuracao < 48){
    elementotempoemtexto.value = `Mais de 3 anos`;
  }
  if(periododeapuracao == 48 ){
    elementotempoemtexto.value = `4 anos`;
  }
  
  if(periododeapuracao > 48 && periododeapuracao < 60){
    elementotempoemtexto.value = `Mais de 4 anos`;
  }

  if(periododeapuracao == 60 ){
    elementotempoemtexto.value = `5 anos ou mais`;
  }



}

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
    resultado.classList.remove("text-success");
    resultado.classList.add("show-resultado");
    resultado.classList.add("mj-ft-branca");

  }else{
    const periododeapuracao = parseInt(document.getElementById('pediododeapuracao').value);

    if(periododeapuracao <= 60){
      const tipoempresa = parseInt(document.getElementById('tipoempresa').value);
      const segmento = parseInt(document.getElementById('segmento').value);
      
      var aliquota = 0.0;

      if (tipoempresa == 1){ // ME

        switch(segmento) {
          case 1 :            //  ME - ADEGA
            aliquota = 0.434;
            break;
          case 2 :            //  ME - AUTOPEÇAS
            aliquota = 0.496;
            break;
          case 3 :            //  ME - BARES/RESTAURANTES
            aliquota = 0.155;
            break;
          case 4 :            //  ME - CASA DE SHOW 
            aliquota = 0.155;
            break;
          case 5 :            //  ME - CENTRO AUTOMOTIVO
            aliquota = 0.31;
            break;
          case 6 :            //  ME - FARMÁCIAS
            aliquota = 0.558;
            break;
          case 7 :            //  ME - LOJA DE CONVENIÊNCIA
            aliquota = 0.434;
            break;
          case 8 :            //  ME - MERCADO/MERCEARIA
            aliquota = 0.062;
            break;
          case 9 :            //  ME - PERFUMARIA
            aliquota = 0.527;
            break;
          case 10 :            //  ME - PET SHOP
            aliquota = 0.186;
            break;
        }
      }

      if (tipoempresa == 2){ // EPP

        switch(segmento) {
          case 1 :            //  EPP - ADEGA
            aliquota = 0.9555;
            break;
          case 2 :            //  EPP - AUTOPEÇAS
            aliquota = 1.092;
            break;
          case 3 :            //  EPP - BARES/RESTAURANTES
            aliquota = 0.34125;
            break;
          case 4 :            //  EPP - CASA DE SHOW 
            aliquota = 0.34125;
            break;
          case 5 :            //  EPP - CENTRO AUTOMOTIVO
            aliquota = 0.6825;
            break;
          case 6 :            //  EPP - FARMÁCIAS
            aliquota = parseFloat(1.2285);
            break;
          case 7 :            //  EPP - LOJA DE CONVENIÊNCIA
            aliquota = 0.9555;
            break;
          case 8 :            //  EPP - MERCADO/MERCEARIA
            aliquota = 0.1365;
            break;
          case 9 :            //  EPP - PERFUMARIA
            aliquota = 1.16025;
            break;
          case 10 :            //  EPP - PET SHOP
            aliquota = 0.4095;
            break;
        }
      }

      const economiamensal = aliquota * faturamentomensal;
      const creditoapurado = periododeapuracao * economiamensal;

      function valorparser(valor){

        valor = parseInt(valor);
        console.log(valor);
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
                            <span class=\'fs-6 fw-light mj-ft-azul\'>OS VALORES SÃO ESTIMADOS COM BASE NO SEGMENTO DE ATUAÇÃO E FATURAMENTO, 
                            O VALOR REAL SERÁ APURADO APÓS ANÁLISE DETALHADA.</span>`;
      

      resultado.classList.remove("hide-resultado");
      resultado.classList.remove("mj-ft-branca");
      resultado.classList.add("show-resultado");
      resultado.classList.add("text-success");

    }else{

    var resultado = document.getElementById('resultado-calculadora');
    resultado.innerHTML = `<img class=\'img-fluid mt-2 mb-2\' src=\'assets\/images\/x.png\'>
                        <p>A LEI PERMITE A RECUPERAÇÃO DE ATÉ 5 ANOS, OU SEJA, UM PERÍODO MÁXIMO DE 60 MESES.<\/p>
                        <p>POR GENTILEZA, INFORME UM PERÍODO ENTRE 1 E 60 MESES.<\/p>`;
  
    resultado.classList.remove("hide-resultado");
    resultado.classList.remove("text-success");
    resultado.classList.add("show-resultado");
    resultado.classList.add("mj-ft-branca");

    }
  }
});