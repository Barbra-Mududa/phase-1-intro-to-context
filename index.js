// Your code here
const createEmployeeRecord = (array) => {
    return {firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
}
}
let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]  
const createEmployeeRecords = (twoRows) => {
    
    return twoRows.map(createEmployeeRecord);
}
const createTimeInEvent = (employee,dateStamp) => {
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateStamp.split(" ")[1],10),
      date: dateStamp.split(" ")[0],
    })
    return employee;
}
const createTimeOutEvent = (employee,dateStamp) => {
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(dateStamp.split(" ")[1],10),
      date: dateStamp.split(" ")[0],
    })
    return employee;
}
const hoursWorkedOnDate = (employee,date) => {
    let employeeTimeIn =  employee.timeInEvents.find(function (e){
        return e.date === date
    });
    let employeeTimeOut = employee.timeOutEvents.find(function (e){
        return e.date === date
    });
    return ((employeeTimeOut.hour- employeeTimeIn.hour) / 100);

}
const wagesEarnedOnDate = (employee,date) => {
   let wageEarned = hoursWorkedOnDate(employee,date);
   let wages = wageEarned * employee.payPerHour;
   return parseFloat(wages.toString());
}
const allWagesFor= (employee) => {
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
  
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
  
    return payable
}
const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
}
  
const calculatePayroll = (arrayOfEmployeeRecords) =>{
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}