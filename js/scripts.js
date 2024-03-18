//
async function getCepJson(cep){
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const cepJson = await response.json();
    return cepJson;
}
$(document).ready(function () {
    //masks
    $('#cpf').mask('000.000.000-00');
    $('#telefone').mask('(00) 00000-0000');
    let cepOptions = {
        onComplete: async function(cep) {
            let cepDigits =cep.replace(/\D/g, "");
            const cepJson = await getCepJson(cepDigits);
            if(cepJson['erro']){
                $('#cidade').val("");
                $('#bairro').val("");
                $('#rua').val("");
            }else{
                $('#cidade').val(`${cepJson['localidade']} - ${cepJson['uf']}`);
                $('#bairro').val(cepJson['bairro']);
                $('#rua').val(cepJson['logradouro']);
            }
        },
    }
    $('#cep').mask('00000-000',cepOptions);
    
});