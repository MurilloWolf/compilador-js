//Função para criar linhas ao carregar a página
$(document).ready(() => {
    //trazendo o foco para a primeira linha
    $('#linha').text('').focus();
    $('#linha').addClass('p-color-back');
    $('#linha').append('<br>');

    desenharLinhas();
});

/*//caputrando ENTER no p (CRIANDO NOVAS COISAS)
$('#editor').on('keypress', 'p', function(key) {

    if(key.which == 13) {
        //caputrando linha de ação
        let linhaAtual = parseInt(this.id.split('_')[1]);

        //criando novo p dentro (SECTION EDITPO)
        $('#editor').append(`<p 
            id="linha" 
            class="text-break p-0 m-0 p-color-back" 
            contenteditable="true"></p>`);

        //dando o foco para a nova linha
        ajustarIdLinha(linhaAtual, 'insert');
    }
});*/


$('#linha').on('input', function() {
    desenharLinhas();
});

//Função para abrir arquivo selecionado
$('input[type=file]').bind('change', function() {
    if(this.files.length != 1) return;

    const file = this.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        if(e.target.result.indexOf('data:text/plain;base64,') != 0) {
            console.error("Falha ao ser o arquivo, não é um texto!");
            return;
        }

        const textFile = window.atob(e.target.result.replace('data:text/plain;base64,', '').trim());
        $('#linha').html(text2DivShow(textFile)).focus();
        desenharLinhas();
    };
    reader.readAsDataURL(file);    
});


//pintar palavras reservadas
// $('#linha').keyup(() => {
//     let palavra = $('#linha').text()
//     if(palavra == 'for') {
//         $('#linha').html('&nbsp <span style="color: black">for</span> &nbsp');

//         // #('#linha').trigger('kreypress', {which:35})
//     }
// });

//ajax de compilador
$('#compilar').click(() => {
    let codigo = $('#linha').html();

    $.ajax({
        url: '/compilar',
        method: 'post',
        data: {codigo: codigo},
        success: respText => {
            console.log('Sucesso = ' + respText);
        },
        error: err => {
            console.log('Erro = ' + JSON.stringify(err));
        }
    });
});


$("#linha").keypress(function(event){
    // console.log("Press:", event);
});

$('#linha').keydown(function(e) {
    var code = e.keyCode || e.which;
    if (code == '9') {
        const original = $(window.getSelection().getRangeAt(0).startContainer).text();
        const pos = window.getSelection().getRangeAt(0).startOffset;
        const novo = original.substr(0, pos)+"    "+original.substr(pos);
        
        $(window.getSelection().getRangeAt(0).startContainer).text(novo)
        $(window.getSelection().getRangeAt(0).startContainer).setCursorPosition(pos+4);
        // $(window.getSelection().getRangeAt(0).startContainer).text();
        console.log(e.type, pos, original, "->", novo);
        // $("#linha").trigger($.Event({type: 'keypress', which: 32, key: ' ', charCode: 32, keyCode: 32}));
        // console.log("Posicao:", $(this).getCursorPosition());
        return false;
    } 
 });

// Funções para melhorar o Funcionamento
function desenharLinhas() {
    const maxLinha = $("#linha > div").length + ($("#linha").html().indexOf("<div>") == 0 ? 0 : 1);
    const linhasDesenhadas = $('#numeracao > input').length;

    //criando numeração pras linhas
    for(let i = linhasDesenhadas; i < maxLinha; i++) {
        $('#numeracao').append(`<input 
            id="contador_linha" 
            type="button" 
            class="btn btn-sm btn-dark p-0 m-0" 
            value="${i+1}" >`);
    }

    // Apaga as Linhas que não existem mais!
    if(linhasDesenhadas > maxLinha) {
        for(let i = maxLinha+1; i <= linhasDesenhadas; i++) {
            $(`#numeracao input#contador_linha[value="${i}"]`).remove();
        }
    }
}

function text2DivShow(textOriginal) {
    const linhas = textOriginal.replace(/(?:\r\n|\r|\n)/g, '\n').split('\n');

    let textReturn = '';
    for(i in linhas) {
        textReturn += '<div>'+linhas[i]+'</div>'
    }

    return textReturn;
}

function divShow2Text() {

}


// Função de descobrir a posição do cursor
(function ($, undefined) {
    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };
})(jQuery);