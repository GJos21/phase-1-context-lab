function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(emp => createEmployeeRecord(emp));
}

function createTimeInEvent(dateStamp) {
    // dateStamp is in the format: YYYY-MM-DD HHMM
    this.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(dateStamp.slice(11, 15), 10),
            date: dateStamp.slice(0, 10)
        }
    )
    return this;
}

function createTimeOutEvent(dateStamp) {
    // dateStamp is in the format: YYYY-MM-DD HHMM
    this.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(dateStamp.slice(11, 15), 10),
            date: dateStamp.slice(0, 10)
        }
    )
    return this;
}

function hoursWorkedOnDate(dateWorked) {
    //  console.log("here in hoursWorkedOnDate")
    const hoursWorked =
        (this.timeOutEvents.find(event => event.date === dateWorked).hour
            - this.timeInEvents.find(event => event.date === dateWorked).hour
        ) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(dateWorked) {
    //  console.log("here in wagesWorkedOnDate")
    const hoursWorked = hoursWorkedOnDate.bind(this);
    return hoursWorked(dateWorked) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employees) {
    return (
        employees.reduce((total, employee) => {
            const allWages = allWagesFor.bind(employee);
            total += allWages();
            return total;
        }, 0)
    )
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(emp => emp.firstName === firstName);
}

// let emps = createEmployeeRecords([
//     ["Greg", "Schmitt", "Engineer", 200],
//     ["Mario", "Jones", "Programmer", 100],
//     ["Marcos", "Gray", "Clerk", 25]]
// );

// const createTimeIn = createTimeInEvent.bind(emps[0])

// createTimeIn("2021-12-13 1400");
// createTimeIn("2021-12-14 1400");
// createTimeIn("2021-12-15 1400");
// createTimeIn("2021-12-16 1400");

// const createTimeOut = createTimeOutEvent.bind(emps[0])
// createTimeOut("2021-12-13 1600");
// createTimeOut("2021-12-14 1600");
// createTimeOut("2021-12-15 1600");
// createTimeOut("2021-12-16 1600");

// const hoursWorked = hoursWorkedOnDate.bind(emps[0]);
// console.log("hours worked: ", hoursWorked("2021-12-15"))

// const wagesEarned = wagesEarnedOnDate.bind(emps[0]);
// console.log("wages earned: ", wagesEarned("2021-12-15"));


