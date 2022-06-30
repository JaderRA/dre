var totalArea = [];

function validaArea(id){
    id = parseInt(id);
    //recebe variáveis    
    let qtdePorta = parseInt(document.getElementById(`portas${id}`).value);
    let qtdeJanela = parseInt(document.getElementById(`janelas${id}`).value);
    let largura = parseFloat(document.getElementById(`largura${id}`).value);
    let altura = parseFloat(document.getElementById(`altura${id}`).value);

    if (!qtdePorta){qtdePorta = 0;}
    if (!qtdeJanela){qtdeJanela = 0;}

    //calcula as áreas
    let areaPorta = 0.80*1.9;
    let areaJanela =  2.00*1.20;
    let areaPortaJanela = (qtdePorta*areaPorta)+(qtdeJanela*areaJanela);
    let areaParede = altura*largura;
    let totalParede = areaParede - areaPortaJanela;

    if (!largura || !altura){
        document.getElementById(`status-area${id}`).innerHTML = "Um ou mais valores não inseridos. Por favor, insira um valor";
        document.getElementById(`portas${id}`).style.borderColor = "rgb(250, 12, 12)";
        document.getElementById(`janelas${id}`).style.borderColor = "rgb(250, 12, 12)";
        document.getElementById(`largura${id}`).style.borderColor = "rgb(250, 12, 12)";
        document.getElementById(`altura${id}`).style.borderColor = "rgb(250, 12, 12)";
        document.getElementById("calculatinta").disabled = true;
        document.getElementById("quantidadeTinta").innerHTML = "";
    }else{
        if (areaPortaJanela >= areaParede/2){
            document.getElementById(`status-area${id}`).innerHTML = "A área de portas e janelas não pode ser maior que a metade da área da parede. Por favor, insira valores válidos.";
            document.getElementById(`portas${id}`).style.borderColor = "rgb(250, 12, 12)";
            document.getElementById(`janelas${id}`).style.borderColor = "rgb(250, 12, 12)";
            document.getElementById(`largura${id}`).style.borderColor = "rgb(250, 12, 12)";
            document.getElementById(`altura${id}`).style.borderColor = "rgb(250, 12, 12)";
            document.getElementById("calculatinta").disabled = true;
            document.getElementById("quantidadeTinta").innerHTML = "";
    
        } else if (areaParede < 1 || areaParede > 50 ){
            document.getElementById(`status-area${id}`).innerHTML = "A área da parede deve ser maior ou igual a 1 m² e menor ou igual a 50 m². Por favor, insira valores válidos. ";
            document.getElementById(`portas${id}`).style.borderColor = "rgb(250, 12, 12)";
            document.getElementById(`janelas${id}`).style.borderColor = "rgb(250, 12, 12)";
            document.getElementById(`largura${id}`).style.borderColor = "rgb(250, 12, 12)";
            document.getElementById(`altura${id}`).style.borderColor = "rgb(250, 12, 12)";
            document.getElementById("calculatinta").disabled = true;
            document.getElementById("quantidadeTinta").innerHTML = "";
    
        }else{
            document.getElementById(`status-area${id}`).innerHTML = `A área desta parede é ${totalParede}`;
            lockButton(id);
            totalArea[`${id-1}`] = totalParede;
            document.getElementById(`portas${id}`).style.borderColor = "rgb(69, 253, 13)";
            document.getElementById(`janelas${id}`).style.borderColor = "rgb(69, 253, 13)";
            document.getElementById(`largura${id}`).style.borderColor = "rgb(69, 253, 13)";
            document.getElementById(`altura${id}`).style.borderColor = "rgb(69, 253, 13)";        
            document.getElementById("calculatinta").disabled = false;
        }
    }

    
}

function totalTinta(){
    //soma da área das paredes
    let areaTotal = totalArea.reduce((pv, cv) => pv + cv, 0);

    //calcula a quantidade de tinta necessária
    let qtdeTinta = areaTotal / 5;
    let latasTinta = [0.5, 2.5, 3.6, 18];    

    while(qtdeTinta > 0){
        var proximo = latasTinta.reduce(function(pv, cv) {
            return (Math.abs(cv - qtdeTinta) < Math.abs(pv - qtdeTinta) ? cv : pv);
        });
        document.getElementById("quantidadeTinta").innerHTML += `<span class="latas"><br>Uma lata de <strong>${proximo}</strong> litro(s)<span>`;       
        qtdeTinta = qtdeTinta - proximo;
    }
      
}

function validaPorta(idCampo) {
	let campo = document.getElementById(`${idCampo}`).value;

	if (!campo){
	        document.getElementById(`status-${idCampo}`).innerHTML = "Valor inválido. Por favor informe um valor";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(250, 12, 12)";
        }else if(campo<0){
            document.getElementById(`status-${idCampo}`).innerHTML = "Valor inválido. Por favor informe um valor";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(250, 12, 12)";
	    } else{
	        document.getElementById(`status-${idCampo}`).innerHTML = "";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(69, 253, 13)";
	    }
}

function validaJanela(idCampo) {
	let campo = document.getElementById(`${idCampo}`).value;

	if (!campo){
	        document.getElementById(`status-${idCampo}`).innerHTML = "Valor inválido. Por favor informe um valor";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(250, 12, 12)";
        }else if(campo<0){
            document.getElementById(`status-${idCampo}`).innerHTML = "Valor inválido. Por favor informe um valor";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(250, 12, 12)";
	    } else{
	        document.getElementById(`status-${idCampo}`).innerHTML = "";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(69, 253, 13)";
	    }
}

function validaAltura(idCampo, idnum) {
	let campo = document.getElementById(`${idCampo}`).value;
    let qtdePorta = parseInt(document.getElementById(`portas${idnum}`).value);
    let qtdeJanela = parseInt(document.getElementById(`janelas${idnum}`).value);

    if (qtdePorta > 0){
        document.getElementById(`${idCampo}`).min = 2.20;
        if (campo < 2.20){document.getElementById(`${idCampo}`).value = 2.20;}    
        document.getElementById(`${idCampo}`).style.borderColor = "rgb(69, 253, 13)";
    }else if(qtdeJanela > 0){
        document.getElementById(`${idCampo}`).min = 1.20;
        if (campo < 1.20){document.getElementById(`${idCampo}`).value = 1.20;}  
        document.getElementById(`${idCampo}`).style.borderColor = "rgb(69, 253, 13)";      
        
    }else{
        if (!campo){
                document.getElementById(`status-${idCampo}`).innerHTML = "Valor inválido. Por favor informe um valor";
                document.getElementById(`${idCampo}`).style.borderColor = "rgb(250, 12, 12)";
            }else if(campo<=0){
                document.getElementById(`status-${idCampo}`).innerHTML = "Valor inválido. Por favor informe um valor";
                document.getElementById(`${idCampo}`).style.borderColor = "rgb(250, 12, 12)";
            } else{
                document.getElementById(`status-${idCampo}`).innerHTML = "";
                document.getElementById(`${idCampo}`).style.borderColor = "rgb(69, 253, 13)";
        }
    }

}

function validaLargura(idCampo) {
	let campo = document.getElementById(`${idCampo}`).value;

	if (!campo){
	        document.getElementById(`status-${idCampo}`).innerHTML = "Valor inválido. Por favor informe um valor";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(250, 12, 12)";
        }else if(campo<=0){
            document.getElementById(`status-${idCampo}`).innerHTML = "Valor inválido. Por favor informe um valor";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(250, 12, 12)";
        } else{
	        document.getElementById(`status-${idCampo}`).innerHTML = "";
	        document.getElementById(`${idCampo}`).style.borderColor = "rgb(69, 253, 13)";
	    }
}

function lockButton(id){
    id=parseInt(id);
    var form = document.getElementById(`form${id}`);
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true;  
    }
    document.getElementById(`unlock${id}`).style.display = "inline";
}

function destravar(id){
    id=parseInt(id);
    var form = document.getElementById(`form${id}`);
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = false;  
    }
    document.getElementById(`unlock${id}`).style.display = "none";
    document.getElementById("quantidadeTinta").innerHTML = "";
}









