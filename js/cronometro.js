
class Contador {
  static idCount = 0;

  static getIdCount(){

    let aux = Contador.idCount;
    Contador.idCount++;

    return aux;
  }


  constructor (titulo){
    this.id = Contador.getIdCount();

    this.titulo = titulo;

    //adicionar data e horário de inicio
    var data = new Date();

    this.dataInicio = data.getDate()+'/'+data.getMonth()+'/'+data.getFullYear();

    this.inicioHour = data.getHours();
    this.inicioMinute = data.getMinutes();
    this.inicioSecond = data.getSeconds();
    this.inicioMillisecond = data.getMilliseconds();

    this.reset();

    this.cron = null;
  }

  start(funcao = () => {}){
    this.pause();
    this.cron = setInterval(() => {

      if ((this.millisecond += 10) == 1000) {
        this.millisecond = 0;
        this.second++;
      }
      if (this.second == 60) {
        this.second = 0;
        this.minute++;
      }
      if (this.minute == 60) {
        this.minute = 0;
        this.hour++;
      }

      funcao(this);
    }, 10);
  }

  pause(){
    clearInterval(this.cron);
  }

  reset(){

    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.millisecond = 0;
  }

}

export { Contador };