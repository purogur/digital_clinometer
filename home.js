let alpha;
let alpha_c;
let alpha_d;
let alpha_now = 0;
let beta;
let hold_var = 0;

window.addEventListener("deviceorientation", function(e) {
    if(hold_var==0){
        alpha = e.alpha.toFixed(1);
        beta = Math.round(e.beta);
        let gamma = Math.floor(e.gamma);
        alpha_c = alpha_now-alpha;
        //alphaの値を補正
        if(alpha_c>180){
            alpha_c -= 360;
        }
        else if(alpha_c<-180){
            alpha_c += 360;
        }
        //alpha_dの値に修正
        if(Math.round(alpha_c)==0||Math.round(Math.abs(alpha_c))==180){
            alpha_d = "NS";
        }
        else if(Math.round(Math.abs(alpha_c))==90){
            alpha_d = "EW";
        }
        else if(alpha_c>0){
            if(alpha_c>90){
                alpha_d = "N"+Math.round(Math.abs(alpha_c-180))+"°"+"W";
            }
            else{
                alpha_d = "N"+Math.round(alpha_c)+"°"+"E";
            }
        }
        else if(alpha_c<0){
            if(alpha_c<-90){
                alpha_d = "N"+Math.round((alpha_c+180))+"°"+"E";
            }
            else{
                alpha_d = "N"+Math.round(Math.abs(alpha_c))+"°"+"W";
            }
        }
        //表示する
        document.getElementById("alpha").value = alpha_d;
        document.getElementById("beta").value = beta+"°";
        let alpha_needle = -1*(alpha_c+90);
        document.getElementById("needle").style.transform = "rotate("+alpha_needle+"deg)";
        document.getElementById("level").style.top = -212+beta/1.2+"px";
        document.getElementById("level").style.left = gamma/1.2+"px";
        if(beta==0&&gamma==0){
            document.getElementById("level").src = "./level2.png";
        }
        else{
            document.getElementById("level").src = "./level1.png";
        }
    }
}, false);

function start(){
    document.getElementById("top").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("record").style.display = "block";
}

function reset(){
    alpha_now = alpha;
    hold_var = 0;
}

function hold(){
    if(hold_var==0){
        hold_var = 1;
        document.getElementById("hold_btn").value = "Unlock";
        document.getElementById("reset_btn").disabled = true;
        document.getElementById("record_btn").disabled = false;
        document.getElementById("beta").disabled = false;
    }
    else if(hold_var==1){
        hold_var = 0;
        document.getElementById("hold_btn").value = "Lock";
        document.getElementById("reset_btn").disabled = false;
        document.getElementById("record_btn").disabled = true;
        document.getElementById("beta").disabled = true;
    }
}

function record(){
    let alpha_e = alpha_c;
    //記録値を偏角に従って補正
    let hen_which = document.getElementById("result_dropbox").value;
    let hen_value = Number(document.getElementById("henkaku").value);
    if(hen_which=="e"){
        alpha_e -= hen_value;
    }
    else if(hen_which=="w"){
        alpha_e += hen_value;
    }
    alpha_e = Math.floor(alpha_e);
    if(alpha_e>180){
        alpha_e -= 360;
    }
    else if(alpha_e<-180){
        alpha_e += 360;
    }
    //alpha_dの値に修正
    if(Math.round(alpha_e)==0||Math.round(Math.abs(alpha_e))==180){
        alpha_d = "NS";
    }
    else if(Math.round(Math.abs(alpha_e))==90){
        alpha_d = "EW";
    }
    else if(alpha_e>0){
        if(alpha_e>90){
            alpha_d = "N"+Math.round(Math.abs(alpha_e-180))+"°"+"W";
        }
        else{
            alpha_d = "N"+Math.round(alpha_e)+"°"+"E";
        }
    }
    else if(alpha_e<0){
        if(alpha_e<-90){
            alpha_d = "N"+Math.round((alpha_e+180))+"°"+"E";
        }
        else{
            alpha_d = "N"+Math.round(Math.abs(alpha_e))+"°"+"W";
        }
    }
    //日時の値を決定
    let date = new Date();
    let mo = String(Number(date.getMonth())+1);
    let d = String(date.getDate());
    let h = String(date.getHours());
    if(h.length==1){
        h = 0+h;
    }
    let mi = String(date.getMinutes());
    if(mi.length==1){
        mi = 0+mi;
    }
    let s = String(date.getSeconds()); 
    if(s.length==1){
        s = 0+s;
    }
    //表の要素追加
    let table = document.getElementById("target_table");
    let newRow = table.insertRow(1);
    //日付
    newCell = newRow.insertCell();
    newText = document.createTextNode(mo+"/"+d+" "+h+":"+mi+":"+s);
    newCell.appendChild(newText);
    //記録値
    newCell = newRow.insertCell();
    newText = document.createTextNode(String(alpha_d)+" "+document.getElementById("beta").value);
    newCell.appendChild(newText);
}