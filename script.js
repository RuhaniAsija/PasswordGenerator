const slider=document.querySelector("[data-slider]");
const lengthno = document.querySelector(".lenNo");

const passDisplay = document.querySelector("[data-passDisplay]")
const copyBtn =document.querySelector("[data-copy]")
const copymsg =document.querySelector("[data-copied]")

const num=document.getElementById("no")
const uc=document.getElementById("uc")
const lc=document.getElementById("lc")
const sym=document.getElementById("sym")
const allCheckbox =document.querySelectorAll("input[type=checkbox]")

const strengthIndicator =document.querySelector("[data-indicator]")

const genPass=document.querySelector(".genPass")

//slider n length
let passLength=10; //default
let checkCount=0;
handleSlider();
Indicator("#ccc");

function handleSlider() {
    slider.value=passLength;
    lengthno.innerText=passLength;
}
slider.addEventListener('input',(e)=>{
    passLength=e.target.value;
    handleSlider();
})

function Indicator(color){
   strengthIndicator.style.backgroundColor=color;
   //shadow
}

function getRandomInteger(min,max) {
 return Math.floor(Math.random()*(max-min)) +min;   
}

function genenerateRandomNo(){
return getRandomInteger(0,9);
}

function genLC(){
   return String.fromCharCode(getRandomInteger(97,123))
}
function genUC(){
    return String.fromCharCode(getRandomInteger(65,91))
 }
 function genSym(){
    const symbols="!@#$%^&*(){}:,.[]*-+~`";
    const rand=getRandomInteger(0,symbols.length);
    return symbols.charAt(rand);
 }

 function calcStrength(){
    let hasU =false;
    let hasLow =false;
    let hasNum =false;
    let hassym =false;

    if(uc.checked) hasU=true;
    if(lc.checked) hasLow=true;
    if(num.checked) hasNum=true;
    if(sym.checked) hassym=true;

    if(hasU && hasLow && (hasNum||hassym) && passLength>=8)
    Indicator("#0f0");

    else if((hasLow||hasU) &&(hasNum||hassym) && passLength>=6)
    Indicator("#ff0");

    else Indicator("#f00");
 }

 async function copy(){
    try{
        await navigator.clipboard.writeText(passDisplay.value);
        copymsg.innerText="copied";
    }
    catch(e){
        copymsg.innerText="failed";
    }
copymsg.classList.add("active");
setTimeout(() => {
    copymsg.classList.remove("active");
}, 2000);
 }

 copyBtn.addEventListener("click",()=>{
    if(passDisplay.value){
        copy();
    }
 })

 function handleCheckBoxChange(){
    checkCount=0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });

    if(passLength<checkCount)
    passLength=checkCount;
handleSlider();
 }
allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange)
})

// password generation
let password=" ";

function shufflepass(p){
    //fisher yates method
    for(let i=p.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=p[i];
        p[i]=p[j];
        p[j]=temp;
    }
    let str="";
    p.forEach((el)=>{
        str+=el;
    })
    return str;
    }


 genPass.addEventListener('click',()=>{

if(checkCount==0) return ;

if(passLength<checkCount){
    passLength=checkCount;
    handleSlider();
}


let funcArr=[];
password="";
if(uc.checked){
    funcArr.push(genUC);
}
if(lc.checked){
    funcArr.push(genLC);
}
if(num.checked){
    funcArr.push(genenerateRandomNo);
}
if(sym.checked){
    funcArr.push(genSym);
}
for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i]();
    console.log(funcArr); // Check the contents of funcArr
}


for(let i=0;i<passLength-funcArr.length;i++){
    let randindex = getRandomInteger(0,funcArr.length);
    password+=funcArr[randindex]();
}

//shuffle the password
password=shufflepass(Array.from(password));

//show
passDisplay.value=password;
calcStrength();
});

