/**
 * This file should be placed at the node_modules sub-directory of the directory where you're 
 * executing it.
 * 
 * Written by Fernando Castor in November/2017. 
 */
exports.solve = function(fileName) {
  let formula = propsat.readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  return result // two fields: isSat and satisfyingAssignment
}

// Receives the current assignment and produces the next one
function nextAssignment(currentAssignment) {
  // implement here the code to produce the next assignment based on currentAssignment. 
  return newAssignment
}

function doSolve(clauses, assignment) {
  let isSat = false
  while ((!isSat) && /* must check whether this is the last assignment or not*/) {
    // does this assignment satisfy the formula? If so, make isSat true. 

    // if not, get the next assignment and try again. 
    assignment = nextAssignment(assignment)
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
    a[b] = c
    b++; 
    }
    }
    return a 
      }

      function readVariables(clauses){
      let maior = 0
    variables = []
    for(i=0; i<clauses.length;i++){
    for(j=0; j<clauses[i].length;j++){
      if(clauses[i][j] != '-'){
        let number =clauses[i][j]
        if(number>maior){ 
         maior = number
        }
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
      if(clausesnumber == clauses.length && variablesnumber == variables.length){
        return true
      }else{
        return false
      }
    }