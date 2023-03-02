// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
  /*
     Combine the storeId and transactionId and encode them as a base 36 string
     Multiplying the storeId by 100000 ensures that the transactionId
     takes up at most 5 digits, which fits within the range of 36^9
     When encoded in base 36, the resulting string will have at most 7
     characters, which we slice to ensure that the short code is at most 9
     characters

    link to documentation base 36: https://javascript.info/number#tostring-base
    
  */
  var encoded = (storeId * 100000 + transactionId).toString(36).slice(-9);
  return encoded;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
  // Decode the short code from base 36 and extract the storeId and transactionId
  var combined = parseInt(shortCode, 36);
  var storeId = Math.floor(combined / 100000);
  var transactionId = combined % 100000;
  // Return the values as an object
  return {
    storeId: storeId,
    shopDate: new Date(),
    transactionId: transactionId,
  };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}