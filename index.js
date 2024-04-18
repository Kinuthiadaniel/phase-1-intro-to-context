// Your code here
createEmployeeRecord(["Gray", "Worm", "Security"], 1)
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
let createTimeInEvent= function(employeeRecord,dateStamp){
let [date, hour]= dateStamp.split(" ")
employeeRecord.timeInEvents.push({
  type:"TimeIn",
  hour: parseInt(hour,10),
  date,

})

return employeeRecord;
}

let createTimeOutEvent= function(employeeRecord,dateStamp){
  let [date, hour]= dateStamp.split(" ")
  employeeRecord.timeOutEvents.push({
    type:"TimeOut",
    hour: parseInt(hour,10),
    date,
  })
  return employeeRecord;
}

let hoursWorkedOnDate = function(employeeRecord,specificDate){
let inEvent = employeeRecord.timeInEvents.find(function(event){
  return event.date === specificDate
  })
  let outEvent = employeeRecord.timeOutEvents.find(function(event){
    return event.date === specificDate
  })
  return (outEvent.hour-inEvent.hour)/100
}

let wagesEarnedOnDate = function(employee, dateSpecific){
let owed = (employee.payPerHour) *( hoursWorkedOnDate(employee, dateSpecific) )
  return parseFloat(owed.toString())
 }

 let allWagesFor = function(employee){
  let payableDates = employee.timeInEvents.map(function(e){
 return e.date
  })
  let payable = payableDates.reduce(function(day, n){
    return day + wagesEarnedOnDate(employee, n)
  },0)
  return payable;
 }

 let calculatePayroll = function(employeeRecords){
  return employeeRecords.reduce((m, e) => m + allWagesFor(e), 0)
}

