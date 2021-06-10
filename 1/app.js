alert("Введите данные a,b,c");

let a =prompt("Введите a");
let b =prompt("Введите b");
let c =prompt("Введите c");

let discrm = (b**2)-4*a*c;

if(discrm < 0)
	alert( "x1 = " + (-b/2*a) + "+" + (Math.abs(discrm)**(1/2))/(2*a)+"i" + "\n" + "x2 = " + (-b/2*a) + "-" + (Math.abs(discrm)**(1/2))/(2*a)+"i"  );
if(discrm == 0)
	alert("x1 = " + -b/2*a);
if(discrm > 0)
	alert("x1 = " + (-b + (discrm)**(1/2) )/(2*a) + "\n" + "x2 = " + (-b - (discrm)**(1/2) )/(2*a));
