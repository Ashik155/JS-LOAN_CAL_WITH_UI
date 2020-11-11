document.getElementById("loan-form").addEventListener("submit", (e)=>{
    document.querySelector("#results").style.display = 'none'
    setTimeout(submitdata, 3700)
    document.querySelector("#loading").style.display = "block"
    e.preventDefault()
})


function submitdata(){
    console.log('Event Fired')
    const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    document.querySelector("#results").style.display = 'block'
    document.querySelector("#loading").style.display = "none"
    
  } else {
    document.querySelector("#results").style.display = 'none'
    document.querySelector("#loading").style.display = "none"
    showError('Please check your numbers');
  }

}

function showError(msg){
    const err = document.createElement("div")
    err.className = "alert alert-danger"
    const card = document.querySelector(".card")
    const head =  document.querySelector(".heading")
    err.appendChild(document.createTextNode(msg))
    card.insertBefore(err, head)
    setTimeout(clearme, 3000)
}

function clearme(){
    document.querySelector('.alert').remove();
}