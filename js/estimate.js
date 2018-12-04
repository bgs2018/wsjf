/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var ubvSelector = document.getElementById('ubv');
var jsSelector = document.getElementById('complexity');
var wsjfCalc = document.getElementById('wsjf');
var warning = document.getElementById('warning');



document.getElementById('save').addEventListener('click', function(){
  return t.set('card', 'shared', 'ubv', ubvSelector.value)
  .then(function(){
    return t.set('card', 'shared',  'complexity', jsSelector.value)
  })
  .then(function(){
    var wsjfval = (ubvSelector.value/jsSelector.value)
    /*return t.set('card', 'shared',  'wsjf', (parseFloat(Math.round(wsjfval) * 100) / 10000).toFixed(2))*/
    return t.set('card', 'shared',  'wsjf', (Math.round(wsjfval) * 100))
  
  })
  .then(function(){
   
   
     t.closePopup();
  });
});

var wsjf = 0;

t.render(function(){
  return Promise.all([
    t.get('card', 'shared', 'ubv'),
    t.get('card', 'shared', 'complexity'),
    t.get('card', 'shared', 'wsjf'),
    
    ])
  .spread(function(savedUbv, savedJs, savedWsjf){
    
     ubvSelector.value = savedUbv;
     jsSelector.value = savedJs;
     wsjfCalc.innerHTML = savedWsjf; 
    
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

