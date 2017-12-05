/**
 * This file should be placed at the node_modules sub-directory of the directory where you're 
 * executing it.
 * 
 * Written by Fernando Castor in November/2017. 
 */

exports.solve = function(fileName) {
  let formula = readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  return result // two fields: isSat and satisfyingAssignment
}

// Receives the current assignment and produces the next one
function nextAssignment(currentAssignment, tam) {
  var bin = decpbin(currentAssignment)
  newAssignment = []
  for(j=0; j<tam; j++){
   newAssignment[j] =  0
  }
  var tambin = bin.length
  while(tambin>0){
    newAssignment[tam-1] = parseInt(bin.charAt(tambin-1))
  tambin--
  tam--
  }
  return newAssignment
}

function doSolve(clauses, assignment) {
 let isSat = false
 let i = 0
 let x = assignment.length
 let numeral
 let neg = false
 let temTrue = false
 let clausaOK = false
 let prob = Math.pow(2, assignment.length)
  while ((!isSat) && (i<prob)) {
    
    clausaOK = true
    for(j=0; j<clauses.length; j++){
      temTrue = false
      for(k=0; k<clauses[j].length;k++){
        
        numeral = clauses[j][k]
        neg = false
        if(numeral<0){
          neg = true
        }  
        numeral = Math.abs(numeral)
        for(l=0; l<assignment.length;l++){
          if(l == numeral-1){
            if(assignment[l] == 0){
                if(neg){
                  temTrue = true
                }
            }else{
              if(!neg){
                temTrue = true
              }
            } 
          }
        }
      }
      if(!temTrue){
        clausaOK = false
      }
    }
    
    if(!clausaOK){
    assignment = nextAssignment(i, x)
    }else{
      isSat = true
    }  
  i++
  }
  let result = {'isSat': isSat, satisfyingAssignment: null}
  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  return result
}
  
function readFormula(fileName) { 
    let f = fileName
    let fs = require ('fs')
    let content = fs.readFileSync(f).toString()
    let text = content.split('\n')
    let clauses = readClauses(text)
    let variables = readVariables(clauses)
    let specOk = checkProblemSpecification(text, clauses, variables)
    let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  return result
}

  function readClauses(text){
    
         let a = []
      let b = 0
      let c = []
   for(i = 0;i<text.length;i++){
      if(!(text[i].charAt(0) == 'c' || text[i].charAt(0) == 'p')){
        c = text[i].replace("0", "")
        c = c.split(" ")
        c.length = c.length -1
      
      if(c.length > 0){
         a[b] = c
         b++; 
       }
        
        }
      }


    
    return a
  }
  
  

  function readVariables(clauses){
    let maior = 0
    variables = []
   let number 
    for(i=0; i<clauses.length;i++){
      for(j=0;j<clauses[i].length; j++){
        number = parseInt(clauses[i][j])
        number = Math.abs(clauses[i][j])
        if(number > maior){
          maior  = number
        }
        
      } 
    }
    for(k=0; k<maior; k++){
     variables[k] = 0
    }
    return variables
  }

  function checkProblemSpecification(text, clauses, variables){
      let bb =[]
      let clausesnumber = 0
      let variablesnumber = 0
      let achou = false
      for(i=0;i<text.length;i++){
        if(text[i].charAt(0) =='p'&& !achou){
          bb = text[i].split(" ")
          clausesnumber = parseInt(bb[3])
          variablesnumber = parseInt(bb[2])
          achou = true
        }
      }
    if(achou){
      if(clausesnumber == clauses.length && variablesnumber == variables.length){
        return true
      }else{
        return false
      }
    }else{
      return true
    }
    }

    function decpbin(a) {
    if (a == 0) {
      return "0";
    } else if (a == 1) {
      return "1";
    } else if (a / 2 == 1) {
      return "1" + (a % 2);
    } else if (a % 2 == 1) {
      return decpbin(Math.floor(a / 2)) + "1";
    } else {
      return decpbin(Math.floor(a / 2)) + "0";
    }
  }

