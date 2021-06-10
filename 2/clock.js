function clockMove()
{
    //Сдвигаем секундную
    let value = GetSec();  //Получаем секунды из функции GetSec()
    let sec = document.getElementsByClassName("sec")[0]; //Получаем div у которого class = "sec" (Секундая стрелка)
    let m = 6*value   //тут будет угол поворота секундной стрелки, тк всего 60 секунд, значит за одну секунду стрелка делает поворот на 6 градусов, поэтому умножаем.
    sec.style.transform = "rotate(" + m + "deg)";

    //Сдвигаем минутную стрелку
    value = GetMin();//Получаем минуты из функции GetSec()
    timeTo(value);   //Проверяем, удоволетворяет ли условие для вывода надписи "время отчислений"
    m =6*value  //По аналогии с секундами.
    let min = document.getElementsByClassName("min")[0];
    min.style.transform = "rotate(" + m + "deg)";

    //Сдвигаем часы, все по аналогии с секундной и минутной
    value = GetHour();
    m =30*value
    let hour = document.getElementsByClassName("hour")[0];
    hour.style.transform = "rotate(" + m + "deg)";
}

function GetMin()
{
    let now = new Date();
    return now.getMinutes();
}

function GetSec()
{
    let now = new Date();  //Тут мы создаем объект класса Date,в нем хранятся все данные о времени.
    return now.getSeconds();  // Из этого объекта получаем секунды с помощью метода getSeconds и делаем return.
}

function GetHour()
{
    let now = new Date();
    return now.getHours();
}

function timeTo(value)   // тут делаем условие, если у нас сейчас больше 50, но меньше 60 минут, выводим "Время отчисления"
{
    if((value >= 50) && (value <=60))
    {
        let timeto = document.getElementsByClassName("timeto")[0];
        timeto.style.display = "block";
    }
    else
    {
        let timeto = document.getElementsByClassName("timeto")[0];
        timeto.style.display = "none";
    }

}
setInterval(clockMove,20);