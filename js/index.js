import { Contador } from './cronometro.js';

var contadores = [];

$(document).ready(function(){

  $('#nova_tasks').on('click', function(){

    let nome = $('#tarefaNome').val();
    $('#tarefaNome').val('');

    let cont = new Contador(nome);
    let id = cont.id;

    //adiciona contador ao array
    contadores.push(cont);

    //clona div padrão
    //adiciona data-id a essa div
    let contadorDiv = $('.model-new-task').clone().attr('data-id', id);
    contadorDiv.removeClass('model-new-task');
    contadorDiv.removeClass('d-none');
    contadorDiv.addClass('task');

    contadorDiv.find('.task-dia-inicio').attr('data-id', id);
    contadorDiv.find('.task-dia-inicio').text(cont.dataInicio);
    contadorDiv.find('.task-horario-inicio').attr('data-id', id);

    let horarioInicio = preencher(cont.inicioHour)+':'+ preencher(cont.inicioMinute)+':'+ preencher(cont.inicioSecond);
    contadorDiv.find('.task-horario-inicio').text(horarioInicio);

    contadorDiv.find('.hour').attr('data-id', id);
    contadorDiv.find('.minute').attr('data-id', id);
    contadorDiv.find('.second').attr('data-id', id);
    contadorDiv.find('.millisecond').attr('data-id', id);

    contadorDiv.find('.reset-task').attr('data-id', id);
    contadorDiv.find('.stop-task').attr('data-id', id);
    contadorDiv.find('.remove-task').attr('data-id', id);
    contadorDiv.find('.task-name').attr('data-id', id);

    contadorDiv.find('.task-name').text(cont.titulo);

    //adiciona div clonada a lista
    $('#listaComponentes').append(contadorDiv);

    let teste = (obj = undefined) => {

      $(`.hour[data-id=${obj.id}]`).text(returnData(obj.hour));
      $(`.minute[data-id=${obj.id}]`).text(returnData(obj.minute));
      $(`.second[data-id=${obj.id}]`).text(returnData(obj.second));

      let millisecond = preencher(obj.millisecond);
      millisecond = (millisecond.length < 3) ? '0' + millisecond : millisecond;

      $(`.millisecond[data-id=${obj.id}]`).text(returnData(millisecond.substr(0, 1)));
    
    }

    function returnData(input) {
      return input > 10 ? input : `0${input}`
    }

    function preencher(valor){
      
      valor = ((valor + '').length < 2) ? '0' + valor : valor + '';

      return valor;
    }

    $(`.remove-task[data-id=${cont.id}]`).on('click', function(){
      contadores[cont.id].pause();
      contadores[cont.id].reset();
      contadores[cont.id] = null;
      $(`.task[data-id=${cont.id}]`).remove();
    })

    $(`.stop-task[data-id=${cont.id}]`).on('click', function(){
      contadores[cont.id].pause();
    })

    $(`.reset-task[data-id=${cont.id}]`).on('click', function(){
      contadores[cont.id].start(teste);
    })

    cont.start(teste);

  });

});